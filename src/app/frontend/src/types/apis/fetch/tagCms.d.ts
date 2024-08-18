export type ApiResponseTagCmsTag = {
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
}

export type ApiResponseTagCmsData = {
  tag_category_id: number
  tag_category_nm: string
  open_flg: number
  inst_ymdhi: string
  update_ymdhi: string
  parent_tag_category_id: number | null
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
  category_weight: number
  target_module_type: string
  target_topics_group_id: number
  tags: {
    [key: string]: ApiResponseTagCmsTag
  }
}

export type ApiResponseTagCms = {
  errors: string[]
  messages: string[]
  list: ApiResponseTagCmsData[]
}
