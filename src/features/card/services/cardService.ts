import { api } from "../../../shared/lib/api";
import type { Card, CardsResponse } from "../types";

export const cardService = {
  getCards: async (page: number = 1): Promise<CardsResponse> => {
    const response = await api.get<CardsResponse>("/cards", {
      params: { rpp: 10, page },
    });
    return response.data;
  },

  getMyCards: async (): Promise<Card[]> => {
    const response = await api.get<Card[]>("/me/cards");
    return response.data;
  },

  addCards: async (cardIds: string[]): Promise<void> => {
    await api.post("/me/cards", { cardIds });
  },
};
