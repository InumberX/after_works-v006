export type Category = {
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

export type Certification = {
  certification_name: string
  certification_name_en: string
  certification_url: string
}

export type List = {
  topics_id: number
  ymd: Date
  contents_type: number
  subject: string
  topics_flg: number
  open_flg: number
  regular_flg: number
  inst_ymdhi: Date
  update_ymdhi: Date
  topics_group_id: number
  contents_type_expand: string
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
  lead: string
  certifications: Certification[]
  skills: string[]
  lead_en: string
}

export type About = {
  category_id: string
  category: Category
  list: List[]
  errors: string[]
  messages: string[]
}
