import { useForm } from "react-hook-form";

interface CreateEventCategoryRequest {
  name: string;
  description: string;
  slug: string;
  parentId: string;
  status: number;
  sortOrder: number;
}

export const useInsertCategory = () => {
  const form = useForm<CreateEventCategoryRequest>({});
  const onSubmit = (data: CreateEventCategoryRequest) => console.log(data);
  return {
    form,
    onSubmit,
  };
};
