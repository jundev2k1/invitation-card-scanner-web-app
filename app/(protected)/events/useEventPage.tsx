import { useState } from "react";

export const useEventPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading
  }
}
