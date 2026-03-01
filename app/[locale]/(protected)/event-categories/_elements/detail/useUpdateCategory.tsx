import { useForm } from "react-hook-form";

interface UpdateEventCategoryRequest {
  name: string;
  description: string;
  slug: string;
  parentId: string;
  status: number;
  sortOrder: number;
}

export const useUpdatetCategory = () => {
  const form = useForm<UpdateEventCategoryRequest>({});
  const onSubmit = (data: UpdateEventCategoryRequest) => console.log(data);
  return {
    form,
    onSubmit,
  };
};
