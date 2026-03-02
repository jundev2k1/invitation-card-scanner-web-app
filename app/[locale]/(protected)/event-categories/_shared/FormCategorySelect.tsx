import { FormCombobox } from "@/components";
import { FolderIcon } from "@/icons";
import { eventCategoryService } from "@/services";
import { useCallback } from "react";

type FormCategorySelectProps = {
  name: string;
  label: string;
  containerClassName?: string;
};

export const FormCategorySelect = ({ name, label, containerClassName }: FormCategorySelectProps) => {
  const onCategoryChange = useCallback(async (keyword: string) => {
    const res = await eventCategoryService.getEventCategorySuggestions({ keyword });
    return res.data ?? [];
  }, []);

  return (
    <FormCombobox
      name={name}
      label={label}
      containerClassName={containerClassName}
      fetchOptions={onCategoryChange}
      getDisplayValue={cate => (
        <div className="w-full flex flex-start gap-2 items-center overflow-hidden">
          <span className="flex items-center gap-2 text-foreground shrink">
            <FolderIcon size={12} />
            {cate.name}
          </span>
          <span className="text-muted-foreground grow">
            /{cate.slug}
          </span>
        </div>
      )}
      getOptionLabel={cate => (
        <div className="flex flex-col gap-1 px-2">
          <span className="flex items-center gap-2"><FolderIcon size={12} /> {cate.name}</span>
          <span className="text-xs text-muted-foreground">/{cate.slug}</span>
        </div>
      )}
      getOptionKey={cate => cate.id}
    />
  );
};
