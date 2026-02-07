import { useState } from "react";

export const useInvitationCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading
  }
}
