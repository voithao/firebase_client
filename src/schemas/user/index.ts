/**
 * User profile data here
 */
export interface UserProfile {
  firstname: string
  surename: string
  /**
   * Has user administritive rights for whole system
   */
  isAdmin?: boolean | undefined
  /**
   * User has enabled product definition
   */
  isInsurer?: boolean | undefined
}
