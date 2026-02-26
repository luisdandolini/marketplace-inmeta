import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center w-full gap-4 mb-10 px-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div
            key={step}
            className={`flex items-center gap-3 ${index !== steps.length - 1 ? "flex-1" : "flex-initial"}`}
          >
            <div className="flex items-center gap-3 shrink-0">
              <div
                className={`
                  size-9 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-500 shadow-sm
                  ${isCompleted ? "bg-primary text-white border-primary shadow-primary/20" : ""}
                  ${isActive ? "bg-surface border-2 border-primary text-primary shadow-md scale-110" : ""}
                  ${!isActive && !isCompleted ? "bg-surface border border-border text-text-muted" : ""}
                `}
              >
                {isCompleted ? (
                  <Check
                    size={18}
                    strokeWidth={3}
                    className="animate-in zoom-in duration-300"
                  />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>

              <span
                className={`text-sm font-semibold transition-colors duration-300 hidden md:block
                  ${isActive ? "text-text" : "text-text-muted/70"}
                `}
              >
                {step}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-border rounded-full overflow-hidden mx-2">
                <div
                  className={`h-full bg-primary transition-all duration-700 ease-in-out ${
                    isCompleted ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
