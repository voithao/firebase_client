/**
 * User profile data here
 */
export interface UserProfile {
  firstname: string
  surename: string
  uuid: string
  /**
   * Has user administritive rights for whole system
   */
  isAdmin: boolean
}
