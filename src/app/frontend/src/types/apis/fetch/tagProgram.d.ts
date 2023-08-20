const apiResponseTagProgramTag = {
  tag_id: 6,
  tag_nm: 'Java',
  open_contents_cnt: 5,
  all_contents_cnt: 5,
  inst_ymdhi: '2023-08-18T18:45:18+09:00',
  update_ymdhi: '2023-08-18T21:07:32+09:00',
  tag_category_id: 9,
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

export type ApiResponseTagProgramTag = typeof apiResponseTagProgramTag

const apiResponseTagProgramList = {
  tag_category_id: 9,
  tag_category_nm: '使用技術',
  open_flg: 1,
  inst_ymdhi: '2023-08-18 18:39:10.682807+09',
  update_ymdhi: '2023-08-18 19:42:36.44173+09',
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
  category_weight: 40,
  target_module_type: '',
  target_topics_group_id: 0,
}

export type ApiResponseTagProgramData = typeof apiResponseTagProgramList & {
  tags: {
    [key: string]: ApiResponseTagProgramTag
  }
}

export type ApiResponseTagProgram = {
  errors: []
  messages: []
  list: ApiResponseTagProgramData[]
}
