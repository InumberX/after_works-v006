const apiResponseAboutHistoryList = {
  topics_id: 10,
  ymd: '2015-12-01',
  contents_type: 19,
  contents: '',
  subject: '人材紹介会社向け業務システム保守',
  topics_flg: 1,
  open_flg: 1,
  regular_flg: 0,
  inst_ymdhi: '2023-08-18T19:12:59+09:00',
  update_ymdhi: '2024-01-06T19:05:31+09:00',
  topics_group_id: 9,
  contents_type_expand: '0',
  slug: '',
  order_no: 0,
  group_nm: '経歴-年表（開発）',
  group_description: '',
  contents_type_cnt: 1,
  contents_type_nm: '2015年',
  contents_type_slug: '',
  contents_type_parent_nm: '経歴-年表（開発）',
  category_parent_id: 18,
  contents_type_ext_col_01: '2015',
  contents_type_ext_col_02: '',
  contents_type_ext_col_03: '',
  contents_type_ext_col_04: '',
  contents_type_ext_col_05: '',
  tags: [
    {
      tag_id: 5,
      tag_nm: '保守・運用',
      open_contents_cnt: 10,
      all_contents_cnt: 10,
      inst_ymdhi: '2023-08-18T18:45:03+09:00',
      update_ymdhi: '2024-01-06T18:38:38+09:00',
      tag_category_id: 7,
      tag_comment: null,
      ext_col_01: '',
      ext_col_02: 'Maintenance and Operations',
      ext_col_03: '',
      ext_col_04: '',
      ext_col_05: '',
      ext_col_06: '',
      ext_col_07: '',
      ext_col_08: '',
      ext_col_09: '',
      ext_col_10: '',
      weight: 10,
    },
    {
      tag_id: 6,
      tag_nm: 'Java',
      open_contents_cnt: 10,
      all_contents_cnt: 10,
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
    },
  ],
  started_at: '2015-12-01',
  ended_at: '',
  subject_en: 'Title',
}

export type ApiResponseAboutHistoryData = typeof apiResponseAboutHistoryList

export type ApiResponseAboutHistory = {
  category_id: '19'
  category: {
    category_nm: '2015年'
    parent_id: '18'
    memo: ''
    topics_group_id: '9'
    category_weight: '2015'
    ext_col_01: '2015'
    ext_col_02: ''
    ext_col_03: ''
    ext_title: ''
    open_flg: '1'
    ext_col_04: ''
    ext_col_05: ''
    slug: ''
    topics_category_ids: ['18', '19']
    category_nms: ['経歴-年表（開発）', '2015年']
    child_level: 2
    category_id: '19'
  }
  errors: []
  messages: []
  list: ApiResponseAboutHistoryData[]
}[]
