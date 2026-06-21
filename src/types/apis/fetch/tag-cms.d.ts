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

export type List = {
  tag_category_id: number
  tag_category_nm: string
  open_flg: number
  inst_ymdhi: string
  update_ymdhi: string
  parent_tag_category_id: null
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
  target_topics_group_ids: string
  tags: { [key: string]: Tag }
}

export type TagCMS = {
  errors: string[]
  messages: string[]
  list: List[]
}
