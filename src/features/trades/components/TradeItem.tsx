import { useState } from "react";
import {
  Trash2,
  ArrowRightLeft,
  Calendar,
  Layers,
  ChevronUp,
} from "lucide-react";
import { CardItem } from "../../card/components/CardItem";
import type { Trade } from "../types";

interface TradeItemProps {
  trade: Trade;
  onDelete?: (id: string) => void;
}

export const TradeItem = ({ trade, onDelete }: TradeItemProps) => {
  const [showAllOffering, setShowAllOffering] = useState(false);
  const [showAllReceiving, setShowAllReceiving] = useState(false);

  const offeringCards = trade.tradeCards.filter(
    (tradeCard) => tradeCard.type === "OFFERING",
  );
  const receivingCards = trade.tradeCards.filter(
    (tradeCard) => tradeCard.type === "RECEIVING",
  );

  const displayedOffering = showAllOffering
    ? offeringCards
    : offeringCards.slice(0, 3);
  const displayedReceiving = showAllReceiving
    ? receivingCards
    : receivingCards.slice(0, 3);

  return (
    <div className="group relative bg-surface/50 rounded-3xl p-5 md:p-6 border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-xl">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
              {trade.user.name.charAt(0)}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-surface rounded-full" />
          </div>
          <div className="min-w-0">
            <h4 className="text-text font-semibold text-sm truncate leading-none mb-1.5">
              {trade.user.name}
            </h4>
            <div className="flex items-center gap-1.5 text-text-muted text-[10px] md:text-[11px] font-medium">
              <Calendar size={12} className="opacity-70" />
              {new Date(trade.createdAt).toLocaleDateString("pt-BR")}
            </div>
          </div>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(trade.id)}
            className="text-text-muted hover:text-red-400 p-2 hover:bg-red-400/5 rounded-xl transition-all"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative">
        <div className="w-full md:flex-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">
                Oferece
              </span>
              <div className="h-px flex-1 bg-primary/20" />
            </div>

            <div className="flex flex-wrap md:grid md:grid-cols-3 gap-2 justify-start">
              {displayedOffering.map((tradeCard) => (
                <div
                  key={tradeCard.id}
                  className="w-[calc(33.33%-8px)] md:w-full max-w-20 md:max-w-none shadow-xl rounded-lg border border-white/10"
                >
                  <CardItem card={tradeCard.card} />
                </div>
              ))}

              {!showAllOffering && offeringCards.length > 3 && (
                <button
                  onClick={() => setShowAllOffering(true)}
                  className="w-[calc(33.33%-8px)] md:w-full aspect-2/3 bg-background/80 hover:bg-primary/20 border border-white/5 rounded-lg flex flex-col items-center justify-center text-text-muted transition-colors"
                >
                  <Layers size={14} />
                  <span className="text-[10px] font-bold">
                    +{offeringCards.length - 3}
                  </span>
                </button>
              )}

              {showAllOffering && (
                <button
                  onClick={() => setShowAllOffering(false)}
                  className="w-full mt-2 flex items-center justify-center gap-2 text-[10px] text-primary font-bold uppercase hover:underline"
                >
                  <ChevronUp size={12} /> Ver menos
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="relative z-20 shrink-0 self-center md:self-start md:mt-10">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-surface border border-white/10 rounded-2xl shadow-2xl text-primary flex items-center justify-center ring-4 ring-background">
            <ArrowRightLeft size={20} className="rotate-90 md:rotate-0" />
          </div>
        </div>

        <div className="w-full md:flex-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] font-black text-secondary uppercase tracking-[0.15em]">
                Deseja
              </span>
              <div className="h-px flex-1 bg-secondary/20" />
            </div>

            <div className="flex flex-wrap md:grid md:grid-cols-3 gap-2 justify-start md:justify-end">
              {displayedReceiving.map((tradeCard) => (
                <div
                  key={tradeCard.id}
                  className="w-[calc(33.33%-8px)] md:w-full max-w-20 md:max-w-none shadow-xl rounded-lg border border-white/10"
                >
                  <CardItem card={tradeCard.card} />
                </div>
              ))}

              {!showAllReceiving && receivingCards.length > 3 && (
                <button
                  onClick={() => setShowAllReceiving(true)}
                  className="w-[calc(33.33%-8px)] md:w-full aspect-2/3 bg-background/80 hover:bg-secondary/20 border border-white/5 rounded-lg flex flex-col items-center justify-center text-text-muted transition-colors"
                >
                  <Layers size={14} />
                  <span className="text-[10px] font-bold">
                    +{receivingCards.length - 3}
                  </span>
                </button>
              )}

              {showAllReceiving && (
                <button
                  onClick={() => setShowAllReceiving(false)}
                  className="w-full mt-2 flex items-center justify-center gap-2 text-[10px] text-secondary font-bold uppercase hover:underline"
                >
                  <ChevronUp size={12} /> Ver menos
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
    </div>
  );
};
