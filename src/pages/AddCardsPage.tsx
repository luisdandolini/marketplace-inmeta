import { useState } from "react";
import { LoadingState } from "../shared/components/LoadingState";
import { Button } from "../shared/components/Button";
import {
  useAddCards,
  useCards,
  useMyCards,
} from "../features/card/hooks/useCards";
import type { Card } from "../features/card/types";
import { CardList } from "../features/card/components/CardList";
import { useToast } from "../shared/components/ToastContext";

export const AddCardsPage = () => {
  const { showToast } = useToast();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useCards();
  const { data: myCards = [] } = useMyCards();
  const { mutate: addCards, isPending } = useAddCards();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (card: Card) => {
    setSelectedIds((prev) =>
      prev.includes(card.id)
        ? prev.filter((id) => id !== card.id)
        : [...prev, card.id],
    );
  };

  const handleAdd = () => {
    addCards(selectedIds);
    showToast("Cartas adicionadas com sucesso!");
  };

  const allCards = data?.pages.flatMap((page) => page.list) ?? [];

  const availableCards = allCards.filter(
    (card) => !myCards.some((myCard) => myCard.id === card.id),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">Adicionar Cartas</h1>
          <p className="text-text-muted text-sm mt-1">
            {selectedIds.length} carta(s) selecionada(s)
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleAdd}
            disabled={selectedIds.length === 0 || isPending}
          >
            {isPending ? "Adicionando..." : "Adicionar"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <LoadingState message="Carregando cartas..." />
      ) : (
        <CardList
          cards={availableCards}
          onSelect={handleSelect}
          selectedIds={selectedIds}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      )}
    </div>
  );
};
