export interface PolicyType {
  id: string
  type: string
  image: string
  name: string
  description: string
}

/** Classifier can be text value pair array */
export interface ClassifierItem {
  /** Classifier text value, visible in list */
  text: string
  /** Classifier code, stored in database */
  value: string
}

/** Class holds classifier */
export interface Classifier {
  /** Name of classifier used for references */
  name: string,
  /** 
   * List of classifier values.
   * Only string arrays, as we store classifiers not using code
   */
  values: string[] | ClassifierItem[] | PolicyType []
}
