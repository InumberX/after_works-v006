const apiResponseTagNewsTag = {
  tag_id: 36,
  tag_nm: 'お知らせ',
  open_contents_cnt: 0,
  all_contents_cnt: 0,
  inst_ymdhi: '2023-10-29T10:57:47+09:00',
  update_ymdhi: '2023-10-29T10:57:47+09:00',
  tag_category_id: 16,
  tag_comment: null,
  ext_col_01: '',
  ext_col_02: '',
  ext_col_03: '',
  ext_col_04: '',
  ext_col_05: '',
  ext_col_06: '',
  ext_col_07: '',
  ext_col_08: '',
  ext_col_09: '',
  ext_col_10: '',
  weight: 150,
}

export type ApiResponseTagNewsTag = typeof apiResponseTagNewsTag

const apiResponseTagNewsList = {
  tag_category_id: 16,
  tag_category_nm: 'お知らせ',
  open_flg: 1,
  inst_ymdhi: '2023-10-29 10:56:36.440119+09',
  update_ymdhi: '2023-10-29 10:56:36.440119+09',
  parent_tag_category_id: null,
  ext_col_01: '',
  ext_col_02: '',
  ext_col_03: '',
  ext_col_04: '',
  ext_col_05: '',
  ext_col_06: '',
  ext_col_07: '',
  ext_col_08: '',
  ext_col_09: '',
  ext_col_10: '',
  category_weight: 60,
  target_module_type: '',
  target_topics_group_id: 0,
}

export type ApiResponseTagNewsData = typeof apiResponseTagNewsList & {
  tags: {
    [key: string]: ApiResponseTagNewsTag
  }
}

export type ApiResponseTagNews = {
  errors: []
  messages: []
  list: ApiResponseTagNewsData[]
}
