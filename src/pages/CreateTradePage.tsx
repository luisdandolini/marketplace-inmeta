import { useCreateTradeStore } from "../features/trades/store/createTradeStore";
import { StepIndicator } from "../features/trades/components/StepIndicator";
import { StepOne } from "../features/trades/components/StepOne";
import { StepTwo } from "../features/trades/components/StepTwo";
import { StepThree } from "../features/trades/components/StepThree";
import { BackToTop } from "../shared/components/BackToTop";
import { useEffect } from "react";

const STEPS = ["Suas cartas", "Cartas desejadas", "Confirmação"];

export const CreateTradePage = () => {
  const { step, reset } = useCreateTradeStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-text">Criar Troca</h1>
        <p className="text-text-muted text-sm mt-1">
          Selecione as cartas que deseja trocar
        </p>
      </div>

      <StepIndicator currentStep={step} steps={STEPS} />

      {step === 1 && <StepOne />}
      {step === 2 && <StepTwo />}
      {step === 3 && <StepThree />}

      <BackToTop />
    </div>
  );
};
