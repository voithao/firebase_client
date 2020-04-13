/** Class holds classifier */
export interface Classifier {
  /** Name of classifier used for references */
  name: string,
  /** 
   * List of classifier values.
   * Only string arrays, as we store classifiers not using code
   */
  values: string[]
}
