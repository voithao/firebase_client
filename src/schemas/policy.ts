import {Product, FormFieldDefType} from './product'
import {Insurer} from './insurer'

/**
 * Array of variable values for data block as {"name": "value"}
 */
export class PolicyDataBlock {
  fields: Record<string, FormFieldDefType> = {}
}

/**
 * Class contains policy instance data
 */
export class Policy {
  code = ''
  /** policy number, usually generated with function */
  number = ''
  /** policy description from product */
  description = ''
  /** Issuer docid who owns product {@link Issuer} */
  insurer: string | Insurer = ''
  /** Policy product docid {@link Product} */
  product: string | Product = ''
  /** policy attributes organised in data blocks */
  data: PolicyDataBlock[] = []
}