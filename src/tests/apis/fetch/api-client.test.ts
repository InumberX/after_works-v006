import { afterEach, describe, expect, it, vi } from 'vitest'

import { apiClient } from '~/apis/fetch/api-client'
import { API_URL } from '~/config/env'
import { API_ERROR_CODE, HTTP_STATUS } from '~/consts/api'

describe('apiClient', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('API_URL の下を GET し、JSON の本文を返す', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(Response.json({ list: [] }))

    await expect(apiClient('/works?cnt=1')).resolves.toEqual({
      success: true,
      data: { list: [] },
    })
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/works?cnt=1`, {
      cache: 'no-store',
    })
  })

  it('404 は code が not_found になる（範囲外のページ・存在しない記事）', async () => {
    // 範囲外の pageID に Kuroco が返す応答（ステージングの API で確認）
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(
        { errors: [{ code: 'not_found', message: 'pageID is too big.' }] },
        { status: HTTP_STATUS.NOT_FOUND },
      ),
    )

    await expect(apiClient('/works?pageID=999')).resolves.toMatchObject({
      success: false,
      status: HTTP_STATUS.NOT_FOUND,
      code: API_ERROR_CODE.NOT_FOUND,
    })
  })

  it.each([
    ['500 のエラー', () => Response.json({ errors: [] }, { status: 500 }), 500],
    ['400 のエラー', () => Response.json({ errors: [] }, { status: 400 }), 400],
    ['JSON でない応答', () => new Response('<html>'), null],
  ])('%s は code が failed になる', async (_label, createResponse, status) => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(createResponse())

    await expect(apiClient('/works')).resolves.toMatchObject({
      success: false,
      status,
      code: API_ERROR_CODE.FAILED,
    })
  })

  it('通信に失敗しても例外を投げず、code が failed になる', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('network'))

    await expect(apiClient('/works')).resolves.toEqual({
      success: false,
      status: null,
      code: API_ERROR_CODE.FAILED,
      message: 'network',
    })
  })
})
