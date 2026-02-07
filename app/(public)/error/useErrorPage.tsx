import { useState } from "react";

export const useErrorPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading
  };
}
