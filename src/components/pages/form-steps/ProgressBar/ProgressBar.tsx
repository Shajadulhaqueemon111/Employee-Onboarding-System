type ModernProgressBarProps = {
  currentStep: number;
  steps: string[];
};

export default function ProgressBar({
  currentStep,
  steps,
}: ModernProgressBarProps) {
  return (
    <ul className="steps w-full ">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`step ${index <= currentStep ? "step-primary" : ""}`}
        >
          {step}
        </li>
      ))}
    </ul>
  );
}
