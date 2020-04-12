export class FormFieldDef {
  id: string = ''
  label: string = ''
  type: string = 'text'
}

export class ProductFormDef {
  cols: number = 0
  name: string = ''
  fields: FormFieldDef[] = []
}

export class Product {
  code: string = ''
  company: string = ''
  description: string = ''
  forms: ProductFormDef[] = []
}
