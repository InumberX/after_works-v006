export type MainVisual = {
  id: string
  url: string
  desc: string
  url_org: string
}

export type Tag = {
  tag_id: number
  tag_nm: string
  open_contents_cnt: number
  all_contents_cnt: number
  inst_ymdhi: Date
  update_ymdhi: Date
  tag_category_id: number
  tag_comment: null
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
  vector1024: null
  vector1024_embedding_model: string
  vector_model: string
}

export type Details = {
  topics_id: number
  ymd: Date
  contents_type: number
  contents: string
  subject: string
  topics_flg: number
  open_flg: number
  regular_flg: number
  inst_ymdhi: Date
  update_ymdhi: Date
  topics_group_id: number
  post_time: string
  slug: string
  order_no: number
  group_nm: string
  group_description: string
  contents_type_cnt: number
  contents_type_nm: string
  contents_type_slug: null
  contents_type_parent_nm: null
  category_parent_id: null
  contents_type_ext_col_01: null
  contents_type_ext_col_02: null
  contents_type_ext_col_03: null
  contents_type_ext_col_04: null
  contents_type_ext_col_05: null
  tags: Tag[]
  contents_type_list: number[]
  main_visual: MainVisual
  started_at: Date
  ended_at: Date
  url: string
  description: string
  subject_en: string
  description_en: string
  contents_en: string
}

export type WorksDetail = {
  errors: string[]
  messages: string[]
  details: Details
}
