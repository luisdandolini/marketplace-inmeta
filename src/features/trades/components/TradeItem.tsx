import { Trash2 } from "lucide-react";
import { CardItem } from "../../card/components/CardItem";
import { Button } from "../../../shared/components/Button";
import type { Trade } from "../types";

interface TradeItemProps {
  trade: Trade;
  onDelete?: (id: string) => void;
}

export const TradeItem = ({ trade, onDelete }: TradeItemProps) => {
  const offeringCards = trade.tradeCards.filter(
    (tradeCard) => tradeCard.type === "OFFERING",
  );
  const receivingCards = trade.tradeCards.filter(
    (tradeCard) => tradeCard.type === "RECEIVING",
  );

  return (
    <div className="bg-background rounded-xl p-4 flex flex-col gap-4 border border-transparent hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text font-semibold text-sm">{trade.user.name}</p>
          <p className="text-text-muted text-xs">
            {new Date(trade.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
        {onDelete && (
          <Button variant="danger" size="sm" onClick={() => onDelete(trade.id)}>
            <Trash2 size={14} />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Oferecendo
          </span>
          <div className="grid grid-cols-3 gap-1">
            {offeringCards.map((tradeCard) => (
              <CardItem key={tradeCard.id} card={tradeCard.card} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Desejando
          </span>
          <div className="grid grid-cols-3 gap-1">
            {receivingCards.map((tradeCard) => (
              <CardItem key={tradeCard.id} card={tradeCard.card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
