export type GetEventCardListRequest = {
  keyword: string,
  page: number,
  pageSize: number
}

export type CreateEventCardRequest = {
  guestName: string,
  notes: string,
}

export type UpdateEventCardRequest = {
  guestName: string,
  notes: string,
}
