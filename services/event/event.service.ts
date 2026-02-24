import { api, baseQuery, mapToUrlSearchParams } from "@/lib/api-client";
import { EventDetailDto, EventSearchItemDto, EventStatus, SearchResult } from "@/types";
import { CreateEventRequest, GetEventListRequest, UpdateEventRequest } from "./event.type";

export const eventService = {
  searchEvents: (props: GetEventListRequest) => {
    const req = mapToUrlSearchParams(props);
    return baseQuery(api.get<SearchResult<EventSearchItemDto>>('/backoffice/events', { params: req }));
  },
  getEventDetail: (id: string) => {
    return baseQuery(api.get<EventDetailDto>(`/backoffice/events/${id}`));
  },
  createEvent: (req: CreateEventRequest) => {
    return baseQuery(api.post('/backoffice/events', req));
  },
  updateEvent: (id: string, data: UpdateEventRequest) => {
    return baseQuery(api.put(`/backoffice/events/${id}`, data));
  },
  updateEventStatus: (id: string, status: EventStatus) => {
    return baseQuery(api.patch(`/backoffice/events/${id}/status/${status}`));
  },
  deleteEvent: (id: string) => {
    return baseQuery(api.delete(`/backoffice/events/${id}`));
  },
};
