const apiResponseCategoryAboutHistoryList = {
  topics_category_id: '18',
  category_nm: '経歴-年表（開発）',
  parent_id: '',
  memo: '',
  inst_ymdhi: '2023-08-18 08:53:48.079553+09',
  update_ymdhi: '2023-08-18 08:53:48.079553+09',
  topics_group_id: '9',
  category_weight: '',
  ext_col_01: '',
  ext_col_02: '',
  ext_col_03: '',
  ext_title: '',
  open_flg: '1',
  ext_col_04: '',
  ext_col_05: '',
  slug: '',
  topics_category_ids: ['18'],
  category_nms: ['経歴-年表（開発）'],
  child_level: 1,
}

const apiResponseCategoryAboutHistoryPageInfo = {
  totalCnt: 9,
  perPage: 9,
  totalPageCnt: 1,
  pageNo: 1,
  path: '/rcms-api/6/categories/about-history',
  param: '',
  startPageNo: 1,
  endPageNo: 1,
  first_page_param: '',
  previous_page_param: '',
  next_page_param: '',
  last_page_param: '?pageID=1',
  other_page_param: '?pageID=',
}

export type ApiResponseCategoryAboutHistoryData =
  typeof apiResponseCategoryAboutHistoryList

export type ApiResponseCategoryAboutHistoryPageInfo =
  typeof apiResponseCategoryAboutHistoryPageInfo

export type ApiResponseCategoryAboutHistory = {
  pageInfo: ApiResponseCategoryAboutHistoryPageInfo
  errors: []
  messages: []
  list: ApiResponseCategoryAboutHistoryData[]
}
