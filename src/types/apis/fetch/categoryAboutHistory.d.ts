export type List = {
  topics_category_id: string
  category_nm: string
  parent_id: string
  memo: string
  inst_ymdhi: string
  update_ymdhi: string
  topics_group_id: string
  category_weight: string
  ext_col_01: string
  ext_col_02: string
  ext_col_03: string
  ext_title: string
  open_flg: string
  ext_col_04: string
  ext_col_05: string
  slug: string
  topics_category_ids: string[]
  category_nms: string[]
  child_level: number
}

export type PageInfo = {
  totalCnt: number
  perPage: number
  totalPageCnt: number
  pageNo: number
  path: string
  param: string
  startPageNo: number
  endPageNo: number
  first_page_param: string
  previous_page_param: string
  next_page_param: string
  last_page_param: string
  other_page_param: string
}

export type CategoryAboutHistory = {
  errors: string[]
  messages: string[]
  list: List[]
  pageInfo: PageInfo
}
