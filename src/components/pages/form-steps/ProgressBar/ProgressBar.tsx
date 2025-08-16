type ModernProgressBarProps = {
  currentStep: number;
  steps: string[]; // step names
};

export default function ProgressBar({
  currentStep,
  steps,
}: ModernProgressBarProps) {
  return (
    <div className="flex justify-between items-center w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Connector line */}
            {index !== 0 && (
              <div
                className={`absolute top-1/2 left-1 w-full h-0.5 -translate-x-1/2 bg-gray-300 ${
                  isCompleted ? "bg-blue-600" : ""
                }`}
                style={{ zIndex: 0 }}
              />
            )}

            {/* Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10
                ${
                  isCompleted
                    ? "bg-blue-600 text-white"
                    : isActive
                    ? "border-2 border-blue-600 text-blue-600"
                    : "border-2 border-gray-300 text-gray-400"
                }`}
            >
              {index + 1}
            </div>

            {/* Step Name */}
            <span className="mt-2 text-xs text-center">{step}</span>
          </div>
        );
      })}
    </div>
  );
}
