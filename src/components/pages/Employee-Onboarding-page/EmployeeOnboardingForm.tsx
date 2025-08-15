import { useState } from "react";
import ProgressBar from "../form-steps/ProgressBar/ProgressBar";
import { EmployeeFormPersonalInfomationSteps1 } from "../form-steps/Steps1PersonalInformation";
import Step2JobDetails from "../form-steps/Step2JobDetails";

const steps = [
  "Personal Info",
  "Job Details",
  "Skills & Preferences",
  "Emergency Contact",
  "Review & Submit",
];

export default function EmployeeOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProgressBar currentStep={currentStep} steps={steps} />

      <div className="mt-6">
        {currentStep === 0 && (
          <EmployeeFormPersonalInfomationSteps1 onNext={nextStep} />
        )}
        {currentStep === 1 && (
          <Step2JobDetails onNext={nextStep} onPrev={prevStep} />
        )}
        {/* {currentStep === 2 && <Step3SkillsPreferences onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 3 && <Step4EmergencyContact onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 4 && <Step5ReviewSubmit onPrev={prevStep} />}  */}
      </div>
    </div>
  );
}
