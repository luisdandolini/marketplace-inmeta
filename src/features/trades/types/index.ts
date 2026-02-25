import type { Card } from "../../card/types";

export type TradeCardType = "OFFERING" | "RECEIVING";

export interface TradeCard {
  id: string;
  cardId: string;
  tradeId: string;
  type: TradeCardType;
  card: Card;
}

export interface Trade {
  id: string;
  userId: string;
  createdAt: string;
  user: {
    name: string;
  };
  tradeCards: TradeCard[];
}

export interface TradesResponse {
  list: Trade[];
  rpp: number;
  page: number;
  more: boolean;
}
