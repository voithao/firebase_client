/**
 * User owned car information
 */
export interface CarInfo {
  plateno: string
  regnumber: string
}

/**
 * User profile data here
 */
export interface UserProfile {
  firstname: string
  surename: string
  /**
   * Cars owned by user
   */
  cars: Array<CarInfo>
  /**
   * Has user administritive rights for whole system
   */
  isAdmin?: boolean | undefined
  /**
   * User has enabled product definition
   */
  isInsurer?: boolean | undefined
}
