import { api, baseQuery, mapToUrlSearchParams } from "@/lib/api-client";
import { EventCategorySearchItemDto } from "@/root/types/dto/event-category/event-category-search-item.dto";
import { CreateEventCategoryRequest, GetEventCategoryListRequest, getEventCategorySuggesttionsRequest, UpdateEventCategoryRequest } from "./event-category.type";

export const eventCategoryService = {
  searchEventCategories: (props: GetEventCategoryListRequest) => {
    const req = mapToUrlSearchParams(props);
    return baseQuery(api.get<EventCategorySearchItemDto[]>('/backoffice/event-categories', { params: req }));
  },
  getEventCategorySuggestions: ({ keyword, pageSize }: getEventCategorySuggesttionsRequest) => {
    const req = mapToUrlSearchParams({ keyword, pageSize });
    return baseQuery(api.get<EventCategorySearchItemDto[]>('/event-categories/suggestions', { params: req }));
  },
  createEventCategory: (req: CreateEventCategoryRequest) => {
    return baseQuery(api.post('/backoffice/event-categories', req));
  },
  updateEventCategory: (id: string, data: UpdateEventCategoryRequest) => {
    return baseQuery(api.put(`/backoffice/event-categories/${id}`, data));
  },
  deleteEventCategory: (id: string) => {
    return baseQuery(api.delete(`/backoffice/event-categories/${id}`));
  },
};
