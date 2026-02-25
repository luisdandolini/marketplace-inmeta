import { CardList } from "../../card/components/CardList";
import { LoadingState } from "../../../shared/components/LoadingState";
import { Button } from "../../../shared/components/Button";
import { useMyCards } from "../../card/hooks/useCards";
import { useCreateTradeStore } from "../store/createTradeStore";
import { ArrowRight } from "lucide-react";

export const StepOne = () => {
  const { data: myCards = [], isLoading } = useMyCards();
  const { offeringCards, toggleOfferingCard, nextStep } = useCreateTradeStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row-reverse justify-between items-center">
        <div className="">
          <Button
            onClick={nextStep}
            icon={<ArrowRight className="w-4" />}
            disabled={offeringCards.length === 0}
            iconPosition="right"
          >
            Próximo
          </Button>
        </div>

        <div>
          <h2 className="text-text font-bold text-lg">
            Cartas que você oferece
          </h2>
          <p className="text-text-muted text-sm mt-1">
            Selecione as cartas da sua coleção que deseja oferecer
          </p>
        </div>
      </div>

      {isLoading ? (
        <LoadingState message="Carregando suas cartas..." />
      ) : (
        <CardList
          cards={myCards}
          onSelect={toggleOfferingCard}
          selectedIds={offeringCards.map((card) => card.id)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
