/**
 * Select Field params describes all parameters
 * that could be set to select field
 */
export interface SelectFieldClassifierParams {
  name?: string
}

/**
 * This field definition part is used in {@link FormFieldDef} 
 * for specifying dropbox behaviour. 
 * Used only when type is - dropbox
 */
export class SelectField {
  /** 
   * Type describes data source of field selection.
   * Possible values are - 'clssifier'
   */
  type: string = 'classifier'
  /** 
   * params depends on field type, 
   * for classifier you should specify parameter name - code of classifier to use
   */
  params: SelectFieldClassifierParams = {}
}

export type FormFieldDefType = 'text' | 'number' | 'date' | 'dropbox' | 'period'

/**
 * Class defines form fields behaviour in product definition
 * {@link Product} forms {@link ProductFormDef}.
 */
export class FormFieldDef {
  /** The id of the field. Field identificator in HTML. 
   * Also used as variable identification for calcuations
   */
  id: string = ''
  /** Field label for user information */
  label: string = ''
  /** Field type */
  type: FormFieldDefType = 'text'
  /** 
   * Controls field visibility. Put formula here for calcualtion
   * Example - '{{policy.base.fields.period}}'==='Other'
   */
  visible: string | undefined
  /** 
   * Use to calculate field value with function
   * Example: (new Date('{{policy.base.fields.to}}')-new Date('{{policy.base.fields.from}}'))/(1000*60*60*24)+1
   */
  calculated: string | undefined
  /**
   * Sets default value for field
   * You can use javascript functions here
   * Examples:
   *  new Date()
   *  {{car.plateno}}
   */
  default: string | undefined
  /** 
   * This is mandatory, if field type is 'dropbox' or 'period'
   * For dropbox, it contains dropbox list items
   * For period it contains period list items
   */
  select: SelectField | undefined
  /**
   * Period classifier code, which states to use toDate instead.
   */
  periodcode: string | undefined
}

/**
 * Class defines policy data blocks.
 * Data blocks contains product {@link Product} fields {@link FormFieldDef}.
 */
export class ProductFormDef {
  /** Form width for 12 column layout (1 - 12) */
  cols: number = 0
  /** Name of form used for referencing */
  name: string = ''
  /** Fields within form */
  fields: FormFieldDef[] = []
}

/**
 * Insurrance product definition goes here
 * Insurers define they insurrance products by specifing 
 * form data blocks with different fields and it's interactions.
 */
export class Product {
  /** Product code, used for easer product identification */
  code: string = ''
  /** 
   * Product type
   * Value is id of the one record of object from
   * classifier - ProductType (example: personal_car) 
   */
  type: string = ''
  /** Issuer {@link Issuer}, product owner */
  company: string = ''
  /** Short product description */
  description: string = ''
  /** Function or array reference used for number generation */
  numbersource!: string
  /** Product fields organised in form blocks */
  forms: ProductFormDef[] = []
}
