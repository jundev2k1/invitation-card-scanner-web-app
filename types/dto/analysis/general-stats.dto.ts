export interface GeneralStatsDto {
  totalUsers: number,
  unapprovedUsers: number,
  activeUsers: number,
  newUsersInPeriod: number,
  userGrowthRate: number,
  totalEvents: number,
  periodPublishedEvents: number,
  periodCompletedEvents: number,
  eventGrowthRate: number,
  totalCards: number,
  totalUsedCards: number,
  periodActiveCards: number,
  periodUsedCards: number,
  cardGrowthRate: number
}
