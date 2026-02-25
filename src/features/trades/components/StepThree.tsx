import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { CardItem } from "../../card/components/CardItem";
import { useCreateTrade } from "../hooks/useTrades";
import { useCreateTradeStore } from "../store/createTradeStore";
import { useToast } from "../../../shared/components/ToastContext";
import { ArrowLeft } from "lucide-react";

export const StepThree = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { offeringCards, receivingCards, prevStep, reset } =
    useCreateTradeStore();
  const { mutate: createTrade, isPending } = useCreateTrade();

  const handleConfirm = () => {
    const payload = [
      ...offeringCards.map((card) => ({
        cardId: card.id,
        type: "OFFERING" as const,
      })),
      ...receivingCards.map((card) => ({
        cardId: card.id,
        type: "RECEIVING" as const,
      })),
    ];

    createTrade(payload, {
      onSuccess: () => {
        showToast("Troca criada com sucesso!");
        reset();
        navigate("/trocas");
      },
      onError: () => {
        showToast("Erro ao criar troca, tente novamente", "error");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-text font-bold text-lg">Confirme sua troca</h2>
        <p className="text-text-muted text-sm mt-1">
          Revise as cartas antes de confirmar
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-text font-semibold text-sm flex items-center gap-2">
            <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full">
              Oferecendo
            </span>
            {offeringCards.length} carta(s)
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {offeringCards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-text font-semibold text-sm flex items-center gap-2">
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
              Recebendo
            </span>
            {receivingCards.length} carta(s)
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {receivingCards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between border-t border-background pt-4">
        <Button
          variant="outline"
          onClick={prevStep}
          icon={<ArrowLeft className="w-4" />}
          iconPosition="left"
        >
          Anterior
        </Button>
        <Button onClick={handleConfirm} disabled={isPending}>
          {isPending ? "Criando troca..." : "Confirmar troca"}
        </Button>
      </div>
    </div>
  );
};
