import { api, baseQuery, mapToUrlSearchParams } from "@/lib/api-client";
import { EventCardDetailDto, EventCardSearchItemDto, SearchResult } from "@/types";
import { CreateEventCardRequest, GetEventCardListRequest, UpdateEventCardRequest } from "./event-card.type";

export const eventCardService = {
  searchEventCards: (eventId: string, bodyReq: GetEventCardListRequest) => {
    const req = mapToUrlSearchParams(bodyReq);
    return baseQuery(api.get<SearchResult<EventCardSearchItemDto>>(`/backoffice/events/${eventId}/cards`, { params: req }));
  },
  getEventCardDetail: (eventId: string, id: string) => {
    return baseQuery(api.get<EventCardDetailDto>(`/backoffice/events/${eventId}/cards/${id}`));
  },
  scanCard: (token: string) => {
    return baseQuery(api.get<EventCardDetailDto>(`/scans/${token}`));
  },
  createEventCard: (eventId: string, req: CreateEventCardRequest) => {
    return baseQuery(api.post(`/backoffice/events/${eventId}/cards`, req));
  },
  updateEventCard: (eventId: string, id: string, data: UpdateEventCardRequest) => {
    return baseQuery(api.put(`/backoffice/events/${eventId}/cards/${id}`, data));
  },
  deleteEventCard: (eventId: string, id: string) => {
    return baseQuery(api.delete(`/backoffice/events/${eventId}/cards/${id}`));
  },
  checkInCard: (eventId: string, id: string) => {
    return baseQuery(api.post(`/events/${eventId}/cards/${id}/check-in`));
  },
};
