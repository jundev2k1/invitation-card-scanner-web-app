import { useState } from "react";

export const useUserPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading
  }
}
