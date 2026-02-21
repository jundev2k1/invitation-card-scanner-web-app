import { EventStatusEnum } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventService } from "./event.service";
import { CreateEventRequest, GetEventListRequest, UpdateEventRequest } from "./event.type";

const EVENT_KEYS = {
  all: ["events"] as const,
  list: (params: GetEventListRequest) => [...EVENT_KEYS.all, "list", params] as const,
  detail: (id: string) => [...EVENT_KEYS.all, "detail", id] as const,
};

const useSearchEvents = (params: GetEventListRequest) => {
  return useQuery({
    queryKey: EVENT_KEYS.list(params),
    queryFn: () => eventService.searchEvents(params),
    staleTime: 1000 * 60
  });
}

const useGetEventDetail = (id: string, seconds?: number) => {
  return useQuery({
    queryKey: EVENT_KEYS.detail(id),
    queryFn: () => eventService.getEventDetail(id),
    staleTime: 1000 * (seconds || 15),
    enabled: !!id,
  });
};

const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEventRequest) => eventService.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_KEYS.all });
    },
  });
};

const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventRequest }) =>
      eventService.updateEvent(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: EVENT_KEYS.all });
      queryClient.invalidateQueries({ queryKey: EVENT_KEYS.detail(variables.id) });
    },
  });
};

const useUpdateEventStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: EventStatusEnum }) =>
      eventService.updateEventStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: EVENT_KEYS.all });
      queryClient.invalidateQueries({ queryKey: EVENT_KEYS.detail(variables.id) });
    },
  });
};

const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => eventService.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_KEYS.all });
    },
  });
};

export {
  useCreateEvent, useDeleteEvent, useGetEventDetail, useSearchEvents, useUpdateEvent,
  useUpdateEventStatus
};
