import { CardList } from "../../card/components/CardList";
import { LoadingState } from "../../../shared/components/LoadingState";
import { Button } from "../../../shared/components/Button";
import { useCards } from "../../card/hooks/useCards";
import { useCreateTradeStore } from "../store/createTradeStore";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const StepTwo = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useCards("explore");
  const {
    receivingCards,
    offeringCards,
    toggleReceivingCard,
    nextStep,
    prevStep,
  } = useCreateTradeStore();
  useCreateTradeStore();

  const allCards = data?.pages.flatMap((page) => page.list) ?? [];

  const availableCards = allCards.filter(
    (card) => !offeringCards.some((cards) => cards.id === card.id),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row-reverse justify-between items-center">
        <div className="flex justify-between gap-5 border-t border-background pt-4">
          <Button
            variant="outline"
            onClick={prevStep}
            icon={<ArrowLeft className="w-4" />}
            iconPosition="left"
          >
            Anterior
          </Button>

          <Button
            onClick={nextStep}
            disabled={receivingCards.length === 0}
            icon={<ArrowRight className="w-4" />}
            iconPosition="right"
          >
            Próximo
          </Button>
        </div>

        <div>
          <h2 className="text-text font-bold text-lg">
            Cartas que você deseja
          </h2>
          <p className="text-text-muted text-sm mt-1">
            Selecione as cartas que gostaria de receber em troca
          </p>
        </div>
      </div>

      {isLoading ? (
        <LoadingState message="Carregando cartas..." />
      ) : (
        <CardList
          cards={availableCards}
          onSelect={toggleReceivingCard}
          selectedIds={receivingCards.map((card) => card.id)}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
