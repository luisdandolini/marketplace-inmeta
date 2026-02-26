import { LoadingState } from "../shared/components/LoadingState";
import { useMyCards } from "../features/card/hooks/useCards";
import { CardList } from "../features/card/components/CardList";
import { BackToTop } from "../shared/components/BackToTop";

export const MyCardsPage = () => {
  const { data: myCards = [], isLoading } = useMyCards();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-text">Minhas Cartas</h1>
        <p className="text-text-muted text-sm mt-1">
          {myCards.length} total de carta(s)
        </p>
      </div>

      {isLoading ? (
        <LoadingState message="Carregando suas cartas..." />
      ) : (
        <CardList cards={myCards} isLoading={isLoading} />
      )}

      <BackToTop />
    </div>
  );
};
