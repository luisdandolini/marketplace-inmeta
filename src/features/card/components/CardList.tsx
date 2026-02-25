import { LayoutGrid } from "lucide-react";
import { EmptyState } from "../../../shared/components/EmptyState";
import { LoadingState } from "../../../shared/components/LoadingState";
import { useInfiniteScroll } from "../../../shared/hooks/useInfiniteScroll";
import type { Card } from "../types";
import { CardItem } from "./CardItem";

interface CardListProps {
  cards: Card[];
  onSelect?: (card: Card) => void;
  selectedIds?: string[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
  isLoading: boolean;
}

export const CardList = ({
  cards,
  onSelect,
  selectedIds = [],
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  isLoading,
}: CardListProps) => {
  const loaderRef = useInfiniteScroll({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage && onLoadMore) {
        onLoadMore();
      }
    },
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  if (!isLoading && cards.length === 0) {
    return (
      <EmptyState
        icon={<LayoutGrid size={32} />}
        title="Nenhuma carta encontrada"
        description="Adicione cartas à sua coleção para começar"
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onSelect={onSelect}
            selected={selectedIds.includes(card.id)}
          />
        ))}
      </div>

      <div ref={loaderRef} className="py-4">
        {isFetchingNextPage && (
          <LoadingState message="Carregando mais cartas..." />
        )}
      </div>
    </div>
  );
};
