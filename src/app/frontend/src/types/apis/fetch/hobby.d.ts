export type ApiResponseHobbyData = {
  topics_id: number
  ymd: string
  contents_type: number
  contents: string
  subject: string
  topics_flg: number
  open_flg: number
  regular_flg: number
  inst_ymdhi: string
  update_ymdhi: string
  topics_group_id: number
  post_time: string
  slug: string
  order_no: number
  group_nm: string
  group_description: string
  contents_type_cnt: number
  contents_type_nm: string
  contents_type_slug: string | null
  contents_type_parent_nm: string | null
  category_parent_id: number | null
  contents_type_ext_col_01: string | null
  contents_type_ext_col_02: string | null
  contents_type_ext_col_03: string | null
  contents_type_ext_col_04: string | null
  contents_type_ext_col_05: string | null
  tags: {
    tag_id: number
    tag_nm: string
    open_contents_cnt: number
    all_contents_cnt: number
    inst_ymdhi: string
    update_ymdhi: string
    tag_category_id: number
    tag_comment: string | null
    ext_col_01: string
    ext_col_02: string
    ext_col_03: string
    ext_col_04: string
    ext_col_05: string
    ext_col_06: string
    ext_col_07: string
    ext_col_08: string
    ext_col_09: string
    ext_col_10: string
    weight: number
  }[]
  contents_type_list: number[]
  main_visual: {
    id: string
    url: string
    desc: string
    url_org: string
  }
  started_at: string
  ended_at: string
  url: string
  description: string
  subject_en: string
  description_en: string
  contents_en: string
}

export type ApiResponseHobbyPageInfo = {
  totalCnt: number
  perPage: number
  totalPageCnt: number
  pageNo: number
  firstIndex: number
  lastIndex: number
  path: string
  param: string
  startPageNo: number
  endPageNo: number
}

export type ApiResponseHobby = {
  errors: string[]
  messages: string[]
  list: ApiResponseHobbyData[]
  pageInfo: ApiResponseHobbyPageInfo
}
