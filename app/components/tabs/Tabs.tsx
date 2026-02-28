import { cn } from "@/root/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/tabs";

export interface TabItem {
  value: string;
  label: string | React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  variant?: "default" | "line";
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  contentClassName?: string;
}

export default function AppTabs({
  items,
  defaultValue,
  variant = "default",
  className,
  listClassName,
  itemClassName,
  contentClassName,
}: TabsProps) {
  return (
    <Tabs defaultValue={defaultValue || items[0]?.value} className={className}>
      <TabsList variant={variant} className={cn("grid w-full grid-cols-3", listClassName)}>
        {items.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className={itemClassName}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((tab) => (
        <TabsContent className={contentClassName} key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
