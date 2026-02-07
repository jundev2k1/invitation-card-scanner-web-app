import { useState } from "react";

export const useMaintanencePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading
  };
};
