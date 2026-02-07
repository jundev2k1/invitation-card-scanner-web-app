import { useState } from "react";

export const useRegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading
  }
}
