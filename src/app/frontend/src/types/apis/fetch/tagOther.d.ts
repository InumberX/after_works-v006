const apiResponseTagOtherTag = {
  tag_id: 26,
  tag_nm: 'Docker',
  open_contents_cnt: 5,
  all_contents_cnt: 5,
  inst_ymdhi: '2023-08-18T19:33:52+09:00',
  update_ymdhi: '2023-08-18T21:08:46+09:00',
  tag_category_id: 14,
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
  weight: 10,
}

export type ApiResponseTagOtherTag = typeof apiResponseTagOtherTag

const apiResponseTagOtherList = {
  tag_category_id: 14,
  tag_category_nm: 'その他',
  open_flg: 1,
  inst_ymdhi: '2023-08-18 19:37:21.596662+09',
  update_ymdhi: '2023-08-18 19:42:19.717627+09',
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
  category_weight: 10,
  target_module_type: '',
  target_topics_group_id: 0,
}

export type ApiResponseTagOtherData = typeof apiResponseTagOtherList & {
  tags: {
    [key: string]: ApiResponseTagOtherTag
  }
}

export type ApiResponseTagOther = {
  errors: []
  messages: []
  list: ApiResponseTagOtherData[]
}
