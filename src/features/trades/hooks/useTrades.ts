import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { tradeService } from "../services/tradeService";

export const useTrades = () => {
  return useInfiniteQuery({
    queryKey: ["trades"],
    queryFn: ({ pageParam = 1 }) => tradeService.getTrades(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.more ? lastPage.page + 1 : undefined,
  });
};

export const useCreateTrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: { cardId: string; type: "OFFERING" | "RECEIVING" }[],
    ) => tradeService.createTrade(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] });
    },
  });
};

export const useDeleteTrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tradeService.deleteTrade(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] });
    },
  });
};
