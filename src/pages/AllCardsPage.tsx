import { CardList } from "../features/card/components/CardList";
import { useCards } from "../features/card/hooks/useCards";
import { LoadingState } from "../shared/components/LoadingState";

export const AllCardsPage = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useCards("explore");

  const cards = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-text">Explorar Cartas</h1>

      {isLoading ? (
        <LoadingState message="Carregando cartas..." />
      ) : (
        <CardList
          cards={cards}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
          isLoading
        />
      )}
    </div>
  );
};
