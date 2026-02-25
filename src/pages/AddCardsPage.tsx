import { useState, useMemo, useEffect } from "react";
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
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCards("add-cards");
  const { data: myCards = [] } = useMyCards();
  const { mutate: addCards, isPending } = useAddCards();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const availableCards = useMemo(() => {
    const allLoadedCards = data?.pages.flatMap((page) => page.list) ?? [];
    return allLoadedCards.filter(
      (card) => !myCards.some((myCard) => myCard.id === card.id),
    );
  }, [data, myCards]);

  useEffect(() => {
    if (
      !isLoading &&
      availableCards.length === 0 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    availableCards.length,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  ]);

  const handleSelect = (card: Card) => {
    setSelectedIds((prev) =>
      prev.includes(card.id)
        ? prev.filter((id) => id !== card.id)
        : [...prev, card.id],
    );
  };

  const handleAdd = () => {
    addCards(selectedIds, {
      onSuccess: () => {
        showToast("Cartas adicionadas com sucesso!");
        setSelectedIds([]);
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">Adicionar Cartas</h1>
          <p className="text-text-muted text-sm mt-1">
            {selectedIds.length} carta(s) selecionada(s)
          </p>
        </div>
        <Button
          onClick={handleAdd}
          disabled={selectedIds.length === 0 || isPending}
        >
          {isPending ? "Adicionando..." : "Adicionar"}
        </Button>
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
          isLoading
        />
      )}
    </div>
  );
};
