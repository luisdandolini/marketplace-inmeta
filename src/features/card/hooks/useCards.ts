import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { cardService } from "../services/cardService";

export const useCards = () => {
  return useInfiniteQuery({
    queryKey: ["cards"],
    queryFn: ({ pageParam = 1 }) => cardService.getCards(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.more ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 10,
  });
};

export const useMyCards = () => {
  return useQuery({
    queryKey: ["my-cards"],
    queryFn: cardService.getMyCards,
  });
};

export const useAddCards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardIds: string[]) => cardService.addCards(cardIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cards"] });
    },
  });
};
