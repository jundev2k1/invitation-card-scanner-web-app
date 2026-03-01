import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventCategoryService } from "./event-category.service";
import { CreateEventCategoryRequest, GetEventCategoryListRequest, UpdateEventCategoryRequest } from "./event-category.type";

const EVENT_CATE_KEYS = {
  all: ["event-categorys"] as const,
  list: (params: GetEventCategoryListRequest) => [...EVENT_CATE_KEYS.all, "list", params] as const,
};

const useSearchEventCategories = (params: GetEventCategoryListRequest) => {
  return useQuery({
    queryKey: EVENT_CATE_KEYS.list(params),
    queryFn: () => eventCategoryService.searchEventCategories(params),
    staleTime: 1000 * 300,
    retry: false
  });
}

const useCreateEventCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEventCategoryRequest) => eventCategoryService.createEventCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_CATE_KEYS.all });
    },
  });
};

const useUpdateEventCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventCategoryRequest }) =>
      eventCategoryService.updateEventCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: EVENT_CATE_KEYS.all });
    },
  });
};

const useDeleteEventCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => eventCategoryService.deleteEventCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event-categories", "list"] });
    },
  });
};

export {
  useCreateEventCategory, useDeleteEventCategory, useSearchEventCategories, useUpdateEventCategory
};

