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
  params: Record<string, string>[] = []
}

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
  type: 'text' | 'number' | 'date' | 'dropbox' = 'text'
  /** 
   * Controls field visibility. Put formula here for calcualtion
   * Example - data['base'].fields['period']==='Other'
   */
  visible: string | undefined
  /** Use to calculate field value with function */
  calculated: string | undefined
  /** This is mandatory, if field type is 'dropbox' */
  select: SelectField | undefined
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
  /** Issuer {@link Issuer}, product owner */
  company: string = ''
  /** Short product description */
  description: string = ''
  /** Function or array reference used for number generation */
  numbersource!: string
  /** Product fields organised in form blocks */
  forms: ProductFormDef[] = []
}
