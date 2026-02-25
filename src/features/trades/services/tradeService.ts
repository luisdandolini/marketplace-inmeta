import { api } from "../../../shared/lib/api";
import type { TradesResponse } from "../types";

export const tradeService = {
  getTrades: async (page: number = 1): Promise<TradesResponse> => {
    const response = await api.get<TradesResponse>("/trades", {
      params: { rpp: 10, page },
    });
    return response.data;
  },

  createTrade: async (
    cards: { cardId: string; type: "OFFERING" | "RECEIVING" }[],
  ): Promise<{ tradeId: string }> => {
    const response = await api.post("/trades", { cards });
    return response.data;
  },

  deleteTrade: async (id: string): Promise<void> => {
    await api.delete(`/trades/${id}`);
  },
};
