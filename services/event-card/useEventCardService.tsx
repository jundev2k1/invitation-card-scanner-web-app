import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventCardService } from "./event-card.service";
import {
  CreateEventCardRequest,
  GetEventCardListRequest,
  UpdateEventCardRequest,
} from "./event-card.type";

const EVENT_CARD_KEYS = {
  all: ["event_cards"] as const,
  list: (eventId: string, params: GetEventCardListRequest) => [...EVENT_CARD_KEYS.all, eventId, "list", params] as const,
  detail: (id: string) => [...EVENT_CARD_KEYS.all, "detail", id] as const
};

const useSearchEventCards = (eventId: string, params: GetEventCardListRequest) => {
  return useQuery({
    queryKey: EVENT_CARD_KEYS.list(eventId, params),
    queryFn: () => eventCardService.searchEventCards(eventId, params),
    staleTime: 1000 * 60,
    retry: false
  });
}

const useGetEventCardDetail = (eventId: string, id: string, seconds?: number) => {
  return useQuery({
    queryKey: EVENT_CARD_KEYS.detail(id),
    queryFn: () => eventCardService.getEventCardDetail(eventId, id),
    staleTime: 1000 * (seconds || 15),
    enabled: !!eventId && !!id,
    retry: false
  });
};

const useScanEventCard = (token: string) => {
  return useQuery({
    queryKey: ["scans", token],
    queryFn: () => eventCardService.scanCard(token),
    staleTime: 1000 * 10,
    retry: false
  });
}

const useCreateEventCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string, data: CreateEventCardRequest }) =>
      eventCardService.createEventCard(eventId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_CARD_KEYS.all });
    },
  });
};

const useUpdateEventCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, id, data }: { eventId: string, id: string, data: UpdateEventCardRequest }) =>
      eventCardService.updateEventCard(eventId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: EVENT_CARD_KEYS.all });
      queryClient.invalidateQueries({ queryKey: EVENT_CARD_KEYS.detail(variables.id) });
    },
  });
};

const useCheckInEventCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, id, notes }: { eventId: string, id: string, notes: string }) =>
      eventCardService.checkInCard(eventId, id, { notes }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: EVENT_CARD_KEYS.all });
      queryClient.invalidateQueries({ queryKey: EVENT_CARD_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: ["scans"] });
    },
  });
}

const useDeleteEventCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, id }: { eventId: string, id: string }) => eventCardService.deleteEventCard(eventId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", "list"] });
    },
  });
};

export {
  useCheckInEventCard,
  useCreateEventCard,
  useDeleteEventCard,
  useGetEventCardDetail,
  useScanEventCard,
  useSearchEventCards,
  useUpdateEventCard
};

