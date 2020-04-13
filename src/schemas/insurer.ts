/**
 * Object for policy issuer data
 */
export interface Insurer {
  /** Insurer name */
  name: string
  /** Product {@link Product} list references provided by insurrer */
  products: [
    {
      /** Reference string (docid) */
      id: string,
      /** Description */
      name: string
    }
  ]
}