import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={step} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`
                  size-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${isCompleted ? "bg-primary text-white" : ""}
                  ${isActive ? "bg-secondary text-white" : ""}
                  ${!isActive && !isCompleted ? "bg-background text-text-muted" : ""}
                `}
              >
                {isCompleted ? <Check size={16} strokeWidth={3} /> : stepNumber}
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap transition-all duration-300
                  ${isActive ? "text-text" : "text-text-muted"}
                `}
              >
                {step}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-px transition-all duration-300 ${isCompleted ? "bg-primary" : "bg-background"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
