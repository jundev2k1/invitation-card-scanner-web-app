import { Avatar, AvatarFallback, AvatarImage, Toast } from "@/app/components";
import { CameraIcon } from "@/app/components/icons";
import { Input } from "@/app/components/input";
import { userService } from "@/services";
import React, { useCallback, useState } from "react";

type AvatarUploadProps = {
  id: string,
  placeholder: string,
  avatarUrl?: string,
  setAvatarUrl?: (url: string) => void
};

export const AvatarUpload = React.memo(({ id, placeholder, avatarUrl = '', setAvatarUrl }: AvatarUploadProps) => {
  const [url, setUrl] = useState<string>(avatarUrl);

  const handleUploadAvatar = useCallback(async (files: FileList | null) => {
    if (!files || files.length !== 1) {
      Toast.showError("No file selected.");
      return;
    }

    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      Toast.showError("File size must be less than 5MB.");
      return;
    };
    try {
      const res = await userService.uploadAvatar(id, file);
      if (!res.data || !res.data.avatarUrl) return;

      // Set new avatar
      if (!setAvatarUrl)
        setUrl(res.data.avatarUrl);
      else
        setAvatarUrl(res.data.avatarUrl);

      Toast.showSuccess("Upload avatar successfully.");
    } catch (err: any) {
      console.log(err);
    }

  }, [id, avatarUrl]);

  return (
    <div className="relative inline-block group cursor-pointer">
      <Avatar className="mx-auto h-32 w-32 border-4 border-background shadow-xl transition-transform duration-300 group-hover:scale-105">
        <AvatarImage src={url} alt={placeholder} />
        <AvatarFallback className="text-5xl bg-linear-to-br from-indigo-500 to-purple-600 text-white">
          {placeholder?.[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex flex-col items-center text-white">
          <CameraIcon className="h-8 w-8 mb-1" />
          <span className="text-xs font-medium">Update</span>
        </div>
      </div>

      <Input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => handleUploadAvatar(e.currentTarget.files)}
        accept="image/png, image/jpeg, .png, .jpg, .jpeg"
      />
    </div>
  );
});
