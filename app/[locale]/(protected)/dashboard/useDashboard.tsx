import { useState } from "react";

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading
  }
}
