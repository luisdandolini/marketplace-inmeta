import type { Card } from "../../card/types";

export interface Me {
  id: string;
  name: string;
  email: string;
  cards: Card[];
}
