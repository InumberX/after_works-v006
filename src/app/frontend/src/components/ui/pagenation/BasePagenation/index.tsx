'use client'

import { useMemo, Fragment } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'
import { CircleButton } from '~/components/ui/buttons/CircleButton'
import { SvgIcon } from '~/components/ui/icons/SvgIcon'

type Props = {
  className?: string
  currentPage: number
  totalPage: number
  handleChangePage: (newPage: number) => void
}

const BasePagenationItem = ({
  currentPage,
  totalPage,
  pageNumber,
  handleChangePage,
  className,
}: {
  currentPage: number
  totalPage: number
  pageNumber: number
  className?: string
  handleChangePage: (newPage: number) => void
}) => {
  return (
    <li
      className={clsx(
        styles.BasePagenation__item,
        pageNumber === currentPage && styles['BasePagenation__item--current'],
        pageNumber === 1 && styles['BasePagenation__item--first'],
        pageNumber === totalPage && styles['BasePagenation__item--last'],
        className,
      )}
    >
      {pageNumber === currentPage ? (
        <span className={styles.BasePagenationCurrent}>
          <span className={styles.BasePagenationCurrent__container}>
            <span className={styles.BasePagenationCurrent__text}>
              {pageNumber}
            </span>
          </span>
        </span>
      ) : (
        <CircleButton
          className={styles.BasePagenation__button}
          variant='outlined'
          size='small'
          title={`${pageNumber}ページ目を表示する`}
          onClick={() => handleChangePage(pageNumber)}
        >
          <span className={styles.BasePagenation__icon}>{pageNumber}</span>
        </CircleButton>
      )}
    </li>
  )
}

export const BasePagenation = ({
  className,
  currentPage,
  totalPage,
  handleChangePage,
}: Props) => {
  const totalPageArray = useMemo(() => {
    return [...(Array(totalPage) as number[])].map((_, i) => i + 1)
  }, [totalPage])

  return (
    <div className={clsx(styles.BasePagenation, className)}>
      <div className={styles.BasePagenation__container}>
        <ul className={styles.BasePagenation__items}>
          <li
            className={clsx(
              styles.BasePagenation__item,
              styles['BasePagenation__item--prev'],
            )}
          >
            <CircleButton
              className={styles.BasePagenation__prev}
              size='small'
              isDisabled={currentPage === 1}
              title='前のページに戻る'
              onClick={() => handleChangePage(currentPage - 1)}
            >
              <SvgIcon
                variant='arrowLeft'
                className={styles.BasePagenation__icon}
              />
            </CircleButton>
          </li>

          <>
            {totalPage <= 5
              ? totalPageArray.map((pageNumber) => {
                  return (
                    <BasePagenationItem
                      key={pageNumber}
                      currentPage={currentPage}
                      totalPage={totalPage}
                      pageNumber={pageNumber}
                      handleChangePage={handleChangePage}
                      className='Obj--md Obj--lg Obj--xl'
                    />
                  )
                })
              : totalPageArray.map((pageNumber) => {
                  const isShowPrevSeparator: boolean =
                    pageNumber === totalPage && currentPage <= totalPage - 3
                  const isShowNextSeparator: boolean =
                    pageNumber === 1 && currentPage >= 4
                  const isShowItem: boolean =
                    pageNumber === 1 ||
                    pageNumber === totalPage ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)

                  return (
                    <Fragment key={pageNumber}>
                      {isShowPrevSeparator && (
                        <li
                          className={clsx(
                            styles.BasePagenation__item,
                            styles['BasePagenation__item--separator'],
                            'Obj--md Obj--lg Obj--xl',
                          )}
                        >
                          <span className={styles.BasePagenation__separator} />
                        </li>
                      )}

                      {isShowItem && (
                        <BasePagenationItem
                          currentPage={currentPage}
                          totalPage={totalPage}
                          pageNumber={pageNumber}
                          handleChangePage={handleChangePage}
                          className='Obj--md Obj--lg Obj--xl'
                        />
                      )}

                      {isShowNextSeparator && (
                        <li
                          className={clsx(
                            styles.BasePagenation__item,
                            styles['BasePagenation__item--separator'],
                            'Obj--md Obj--lg Obj--xl',
                          )}
                        >
                          <span className={styles.BasePagenation__separator} />
                        </li>
                      )}
                    </Fragment>
                  )
                })}
          </>

          <>
            {totalPage <= 3
              ? totalPageArray.map((pageNumber) => {
                  return (
                    <BasePagenationItem
                      key={pageNumber}
                      currentPage={currentPage}
                      totalPage={totalPage}
                      pageNumber={pageNumber}
                      handleChangePage={handleChangePage}
                      className='Obj--xs Obj--sm'
                    />
                  )
                })
              : totalPageArray.map((pageNumber) => {
                  const isShowPrevSeparator: boolean =
                    pageNumber === totalPage && currentPage <= totalPage - 2
                  const isShowNextSeparator: boolean =
                    pageNumber === 1 && currentPage >= 3
                  const isShowItem: boolean =
                    pageNumber === 1 ||
                    pageNumber === totalPage ||
                    (pageNumber >= currentPage && pageNumber <= currentPage)

                  return (
                    <Fragment key={pageNumber}>
                      {isShowPrevSeparator && (
                        <li
                          className={clsx(
                            styles.BasePagenation__item,
                            styles['BasePagenation__item--separator'],
                            'Obj--xs Obj--sm',
                          )}
                        >
                          <span className={styles.BasePagenation__separator} />
                        </li>
                      )}

                      {isShowItem && (
                        <BasePagenationItem
                          currentPage={currentPage}
                          totalPage={totalPage}
                          pageNumber={pageNumber}
                          handleChangePage={handleChangePage}
                          className='Obj--xs Obj--sm'
                        />
                      )}

                      {isShowNextSeparator && (
                        <li
                          className={clsx(
                            styles.BasePagenation__item,
                            styles['BasePagenation__item--separator'],
                            'Obj--xs Obj--sm',
                          )}
                        >
                          <span className={styles.BasePagenation__separator} />
                        </li>
                      )}
                    </Fragment>
                  )
                })}
          </>

          <li
            className={clsx(
              styles.BasePagenation__item,
              styles['BasePagenation__item--next'],
            )}
          >
            <CircleButton
              className={styles.BasePagenation__next}
              size='small'
              isDisabled={currentPage >= totalPage || totalPage <= 1}
              title='次のページに進む'
              onClick={() => handleChangePage(currentPage + 1)}
            >
              <SvgIcon
                variant='arrowRight'
                className={styles.BasePagenation__icon}
              />
            </CircleButton>
          </li>
        </ul>
      </div>
    </div>
  )
}
