import {Product} from './product'
import {Insurer} from './insurer'

export class PolicyDataBlock {
  fields: Record<string, string | number | Date>[] = []
}

export class Policy {
  code = ''
  number = ''
  description = ''
  insurer: string | Insurer = ''
  product: string | Product = ''
  data: PolicyDataBlock[] = []
}