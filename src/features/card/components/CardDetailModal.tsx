import { X, Calendar } from "lucide-react";
import { Button } from "../../../shared/components/Button";
import type { Card } from "../types";

interface CardDetailModalProps {
  card: Card;
  onClose: () => void;
}

export const CardDetailModal = ({ card, onClose }: CardDetailModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-full object-cover scale-110 blur-md brightness-[0.4]"
          />
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative px-6 pb-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative -mt-20 shrink-0 mx-auto sm:mx-0">
              <img
                src={card.imageUrl}
                alt={card.name}
                className="w-32 h-44 rounded-2xl object-cover shadow-2xl border-4 border-surface ring-1 ring-black/5"
              />
            </div>

            <div className="flex flex-col pt-2 flex-1">
              <h2 className="text-2xl font-bold text-text tracking-tight mb-1">
                {card.name}
              </h2>

              <div className="flex items-center gap-1.5 text-text-muted mb-4">
                <Calendar size={14} className="opacity-70" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  {new Date(card.createdAt).toLocaleDateString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="bg-background/50 p-4 rounded-xl">
                <p className="text-text-muted text-sm leading-relaxed italic">
                  "{card.description}"
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={onClose}>Fechar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
