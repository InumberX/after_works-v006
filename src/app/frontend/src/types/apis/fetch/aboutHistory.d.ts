export type ApiResponseAboutHistoryData = {
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
  contents_type_expand: string
  slug: string
  order_no: number
  group_nm: string
  group_description: string
  contents_type_cnt: number
  contents_type_nm: string
  contents_type_slug: string
  contents_type_parent_nm: string
  category_parent_id: number
  contents_type_ext_col_01: string
  contents_type_ext_col_02: string
  contents_type_ext_col_03: string
  contents_type_ext_col_04: string
  contents_type_ext_col_05: string
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
  started_at: string
  ended_at: string
  subject_en: string
}

export type ApiResponseAboutHistory = {
  category_id: string
  category: {
    category_nm: string
    parent_id: string
    memo: string
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
    category_id: string
  }
  errors: string[]
  messages: string[]
  list: ApiResponseAboutHistoryData[]
}[]
