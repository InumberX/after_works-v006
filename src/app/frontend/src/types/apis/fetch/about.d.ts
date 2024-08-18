export type ApiResponseAboutData = {
  topics_id: number
  ymd: string
  contents_type: number
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
  contents_type_slug: string | null
  contents_type_parent_nm: string | null
  category_parent_id: string | null
  contents_type_ext_col_01: string | null
  contents_type_ext_col_02: string | null
  contents_type_ext_col_03: string | null
  contents_type_ext_col_04: string | null
  contents_type_ext_col_05: string | null
  lead: string
  certifications: {
    certification_name: string
    certification_name_en: string
    certification_url: string
  }[]
  skills: string[]
  lead_en: string
}

export type ApiResponseAbout = {
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
  list: ApiResponseAboutData[]
}[]
