const apiResponseTagCmsTag = {
  tag_id: 16,
  tag_nm: 'MovableType',
  open_contents_cnt: 1,
  all_contents_cnt: 1,
  inst_ymdhi: '2023-08-18T19:20:42+09:00',
  update_ymdhi: '2023-08-18T21:08:17+09:00',
  tag_category_id: 13,
  tag_comment: null,
  ext_col_01: 'Movable Type',
  ext_col_02: '',
  ext_col_03: '',
  ext_col_04: '',
  ext_col_05: '',
  ext_col_06: '',
  ext_col_07: '',
  ext_col_08: '',
  ext_col_09: '',
  ext_col_10: '',
  weight: 20,
}

export type ApiResponseTagCmsTag = typeof apiResponseTagCmsTag

const apiResponseTagCmsList = {
  tag_category_id: 13,
  tag_category_nm: 'CMS',
  open_flg: 1,
  inst_ymdhi: '2023-08-18 19:37:10.654831+09',
  update_ymdhi: '2023-08-18 19:42:42.091029+09',
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
  category_weight: 30,
  target_module_type: '',
  target_topics_group_id: 0,
}

export type ApiResponseTagCmsData = typeof apiResponseTagCmsList & {
  tags: {
    [key: string]: ApiResponseTagCmsTag
  }
}

export type ApiResponseTagCms = {
  errors: []
  messages: []
  list: ApiResponseTagCmsData[]
}
