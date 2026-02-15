import { DropdownMenuItem } from "../dropdown";

export const NotificationItem = ({ icon, title, desc, time, isUnread = false }: any) => (
  <DropdownMenuItem className={`flex gap-3 p-4 cursor-pointer focus:bg-accent ${isUnread ? "bg-accent/40" : ""}`}>
    <div className="mt-1 bg-background border rounded-full p-2 h-fit">
      {icon}
    </div>
    <div className="flex flex-col gap-1 overflow-hidden">
      <p className="text-sm font-semibold leading-none">{title}</p>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">
        {desc}
      </p>
      <span className="text-[10px] text-muted-foreground/70 uppercase font-medium">
        {time}
      </span>
    </div>
  </DropdownMenuItem>
);
