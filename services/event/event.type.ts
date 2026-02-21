export type GetEventListRequest = {
  keyword: string,
  page: number,
  pageSize: number
}

export type CreateEventRequest = {
  categoryId: string | null,
  title: string,
  description: string,
  startDate: Date,
  endDate: Date | null,
  locationName: string,
  address: string,
  mapUrl: string,
  thumbnailUrl: string
}

export type UpdateEventRequest = {
  categoryId: string | null,
  title: string,
  description: string,
  startDate: Date,
  endDate: Date | null,
  locationName: string,
  address: string,
  mapUrl: string,
  thumbnailUrl: string
}
