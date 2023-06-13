export interface TableInfo {
  tables: Table[]
}

export interface Table {
  table_catalog: string
  table_schema: string
  table_name: string
  column_name: string
  ordinal_position: number
  column_default?: string
  is_nullable: string
  data_type: string
  character_maximum_length: any
  character_octet_length?: number
  numeric_precision?: number
  numeric_precision_radix?: number
  numeric_scale?: number
  datetime_precision: any
  interval_type: any
  interval_precision: any
  character_set_catalog: any
  character_set_schema: any
  character_set_name: any
  collation_catalog: any
  collation_schema: any
  collation_name: any
  domain_catalog: any
  domain_schema: any
  domain_name: any
  udt_catalog: string
  udt_schema: string
  udt_name: string
  scope_catalog: any
  scope_schema: any
  scope_name: any
  maximum_cardinality: any
  dtd_identifier: string
  is_self_referencing: string
  is_identity: string
  identity_generation: any
  identity_start: any
  identity_increment: any
  identity_maximum: any
  identity_minimum: any
  identity_cycle: string
  is_generated: string
  generation_expression: any
  is_updatable: string
}
