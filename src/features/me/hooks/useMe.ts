import { useQuery } from "@tanstack/react-query";
import { meService } from "../services/meService";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: meService.me,
  });
};
