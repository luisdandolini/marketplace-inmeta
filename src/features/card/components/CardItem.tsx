import { Check } from "lucide-react";
import { useState } from "react";
import type { Card } from "../types";
import { CardDetailModal } from "./CardDetailModal";

interface CardItemProps {
  card: Card;
  onSelect?: (card: Card) => void;
  selected?: boolean;
}

export const CardItem = ({ card, onSelect, selected }: CardItemProps) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div
        onClick={() => (onSelect ? onSelect(card) : setShowDetail(true))}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowDetail(true);
        }}
        className={`
        cursor-pointer hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 group relative rounded-xl overflow-hidden transition-all duration-300 ease-out
        bg-background border border-surface shadow-md shadow-black/20
        ${selected ? "ring-2 ring-primary border-primary shadow-lg shadow-primary/20 scale-[1.02]" : ""}
      `}
      >
        <div
          className={`
        absolute top-2 right-2 z-10 flex items-center justify-center rounded-full
        size-7 bg-primary text-white shadow-lg transition-all duration-300
        ${selected ? "opacity-100 scale-100" : "opacity-0 scale-50"}
      `}
        >
          <Check className="size-4" strokeWidth={3} />
        </div>

        {onSelect && (
          <div className="absolute inset-0 z-5 transition-opacity duration-300 pointer-events-none bg-primary/5 opacity-0 group-hover:opacity-100" />
        )}

        <div className="relative aspect-421/614 overflow-hidden bg-surface">
          <img
            src={card.imageUrl}
            alt={card.name}
            className={`size-full object-cover transition-transform duration-500 ease-out ${onSelect ? "group-hover:scale-105" : ""}`}
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background/80 to-transparent" />
        </div>

        <div className="px-2 py-2">
          <h3 className="text-text font-medium text-xs text-center truncate">
            {card.name}
          </h3>
        </div>
      </div>

      {showDetail && (
        <CardDetailModal card={card} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
};
