"use client";
import { Avatar, AvatarFallback, AvatarImage, Combobox, Label } from "@/components";
import { XIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { userService } from "@/services";
import { UserStatus } from "@/types";
import { useEffect, useState } from "react";

interface UserSummary {
  id: string;
  email: string;
  username: string;
  nickname: string;
  avatarUrl: string | null;
}

interface UserSuggestionInputProps {
  containerClassName?: string;
  className?: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  helperText?: string;
}

export const UserSuggestionInput = ({
  containerClassName,
  className,
  label,
  value,
  onValueChange,
  helperText,
}: UserSuggestionInputProps) => {
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);

  useEffect(() => {
    if (value) {
      userService.getUserDetail(value).then((res) => {
        if (res.data) {
          setSelectedUser({
            id: res.data.id,
            email: res.data.email,
            username: res.data.username,
            nickname: res.data.nickName,
            avatarUrl: res.data.avatarUrl,
          });
        } else {
          setSelectedUser(null);
          onValueChange("");
        }
      }).catch(() => {
        setSelectedUser(null);
        onValueChange("");
      });
    } else {
      setSelectedUser(null);
    }
  }, [value, onValueChange]);

  const handleChange = (user: UserSummary | null) => {
    setSelectedUser(user);
    onValueChange(user?.id ?? "");
  };

  const fetchUsers = async (keyword: string) => {
    if (!keyword.trim()) return [];

    const { data } = await userService.getUserList({
      keyword,
      statuses: [UserStatus.ACTIVE],
      page: 1,
      pageSize: 6,
    });

    return (data?.items ?? []).map((item) => ({
      value: {
        id: item.id,
        email: item.email,
        username: item.username,
        nickname: item.nickname,
        avatarUrl: item.avatarUrl,
      } as UserSummary,
      label: (
        <div className="flex items-center gap-3 py-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.avatarUrl} alt={item.nickname || item.username} />
            <AvatarFallback>
              {(item.nickname || item.username)?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {item.nickname || item.username}
            </span>
            <span className="text-xs text-muted-foreground">{item.email}</span>
          </div>
        </div>
      ),
    }));
  };

  return (
    <div className={cn("grid w-full items-center gap-1.5", containerClassName)}>
      {label && <Label className="text-slate-900 dark:text-muted-foreground">{label}</Label>}

      {selectedUser ? (
        <div
          className={cn(
            "flex items-center gap-3 rounded-md border px-3 py-2 bg-muted/40",
            className
          )}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={selectedUser.avatarUrl ?? undefined} alt={selectedUser.nickname || selectedUser.username} />
            <AvatarFallback>
              {(selectedUser.nickname || selectedUser.username)?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{selectedUser.nickname || selectedUser.username}</span>
            <span className="text-sm text-muted-foreground">{selectedUser.email}</span>
          </div>

          <button
            type="button"
            onClick={() => handleChange(null)}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear selection"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <Combobox<UserSummary>
          value={null}
          onChange={handleChange}
          placeholder="Search user by name or email..."
          fetchOptions={fetchUsers}
          debounceMs={300}
          className={className}
          getOptionLabel={(user) => user.nickname || user.username}
          getDisplayValue={(user) => (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl ?? undefined} />
                <AvatarFallback>
                  {(user.nickname || user.username)?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{user.nickname || user.username}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
          )}
          getOptionKey={(user) => user.id}
        />
      )}

      {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  );
};
