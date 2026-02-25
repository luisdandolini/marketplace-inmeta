export interface Card {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface CardsResponse {
  list: Card[];
  rpp: number;
  page: number;
  more: boolean;
}
