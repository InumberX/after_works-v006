const apiResponseTagDesignTag = {
  tag_id: 19,
  tag_nm: 'AdobeIllustrator',
  open_contents_cnt: 4,
  all_contents_cnt: 4,
  inst_ymdhi: '2023-08-18T19:31:08+09:00',
  update_ymdhi: '2023-08-18T21:08:30+09:00',
  tag_category_id: 15,
  tag_comment: null,
  ext_col_01: 'Adobe Illustrator',
  ext_col_02: '',
  ext_col_03: '',
  ext_col_04: '',
  ext_col_05: '',
  ext_col_06: '',
  ext_col_07: '',
  ext_col_08: '',
  ext_col_09: '',
  ext_col_10: '',
  weight: 30,
}

export type ApiResponseTagDesignTag = typeof apiResponseTagDesignTag

const apiResponseTagDesignList = {
  tag_category_id: 15,
  tag_category_nm: 'デザイン',
  open_flg: 1,
  inst_ymdhi: '2023-08-18 19:37:33.007015+09',
  update_ymdhi: '2023-08-18 19:42:25.628492+09',
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
  category_weight: 20,
  target_module_type: '',
  target_topics_group_id: 0,
}

export type ApiResponseTagDesignData = typeof apiResponseTagDesignList & {
  tags: {
    [key: string]: ApiResponseTagDesignTag
  }
}

export type ApiResponseTagDesign = {
  errors: []
  messages: []
  list: ApiResponseTagDesignData[]
}
