import { useState } from "react";

export const useLoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading
  };
};
