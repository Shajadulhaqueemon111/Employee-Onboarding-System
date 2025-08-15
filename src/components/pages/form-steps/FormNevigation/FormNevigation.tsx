type FormNavigationProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
};

export default function FormNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isNextDisabled = false,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between mt-6">
      {currentStep > 0 ? (
        <button
          onClick={onPrev}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Previous
        </button>
      ) : (
        <div />
      )}

      {currentStep < totalSteps - 1 ? (
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`px-4 py-2 rounded text-white ${
            isNextDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      )}
    </div>
  );
}
