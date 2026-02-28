import { create } from "zustand";
import type { Card } from "../../card/types";

interface CreateTradeState {
  step: number;
  offeringCards: Card[];
  receivingCards: Card[];
  nextStep: () => void;
  prevStep: () => void;
  toggleOfferingCard: (card: Card) => void;
  toggleReceivingCard: (card: Card) => void;
  reset: () => void;
}

export const useCreateTradeStore = create<CreateTradeState>((set) => ({
  step: 1,
  offeringCards: [],
  receivingCards: [],

  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),

  toggleOfferingCard: (card) =>
    set((state) => ({
      offeringCards: state.offeringCards.some(
        (existing) => existing.id === card.id,
      )
        ? state.offeringCards.filter((existing) => existing.id !== card.id)
        : [...state.offeringCards, card],
    })),

  toggleReceivingCard: (card) =>
    set((state) => ({
      receivingCards: state.receivingCards.some(
        (existing) => existing.id === card.id,
      )
        ? state.receivingCards.filter((existing) => existing.id !== card.id)
        : [...state.receivingCards, card],
    })),

  reset: () => set({ step: 1, offeringCards: [], receivingCards: [] }),
}));
