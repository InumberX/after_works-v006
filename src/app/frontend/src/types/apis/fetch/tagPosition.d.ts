const apiResponseTagPositionTag = {
  tag_id: 5,
  tag_nm: '保守・運用',
  open_contents_cnt: 5,
  all_contents_cnt: 5,
  inst_ymdhi: '2023-08-18T18:45:03+09:00',
  update_ymdhi: '2023-08-18T21:05:23+09:00',
  tag_category_id: 7,
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

export type ApiResponseTagPositionTag = typeof apiResponseTagPositionTag

const apiResponseTagPositionList = {
  tag_category_id: 7,
  tag_category_nm: '担当箇所',
  open_flg: 1,
  inst_ymdhi: '2023-08-18 18:37:52.529422+09',
  update_ymdhi: '2023-08-18 19:42:30.785033+09',
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
  category_weight: 50,
  target_module_type: '',
  target_topics_group_id: 0,
}

export type ApiResponseTagPositionData = typeof apiResponseTagPositionList & {
  tags: {
    [key: string]: ApiResponseTagPositionTag
  }
}

export type ApiResponseTagPosition = {
  errors: []
  messages: []
  list: ApiResponseTagPositionData[]
}
