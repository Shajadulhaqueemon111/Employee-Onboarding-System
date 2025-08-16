import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/components/redux/app/store";
import { nextStep, prevStep } from "@/components/redux/slice/formSlicer";
import { EmployeeFormPersonalInfomationSteps1 } from "../form-steps/Steps1PersonalInformation";
import { Step2JobDetails } from "../form-steps/Step2JobDetails";
import { Step3SkillsPreferences } from "../form-steps/Step3SkillsPreferences";

import { Step5ReviewSubmit } from "../form-steps/Steps5ReviewAndSubmit";
import ProgressBar from "../form-steps/ProgressBar/ProgressBar";
import { Step4EmergencyContact } from "../form-steps/Step4EmergencyContact";

export default function EmployeeOnboardingForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.form.currentStep);

  const steps = [
    "Personal Info",
    "Job Details",
    "Skills & Preferences",
    "Emergency Contact",
    "Review & Submit",
  ];

  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps) dispatch(nextStep());
  };

  const handlePrev = () => {
    if (currentStep > 1) dispatch(prevStep());
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProgressBar currentStep={currentStep - 1} steps={steps} />

      <div className="mt-6">
        {currentStep === 1 && (
          <EmployeeFormPersonalInfomationSteps1 onNext={handleNext} />
        )}
        {currentStep === 2 && (
          <Step2JobDetails onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 3 && (
          <Step3SkillsPreferences onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 4 && (
          <Step4EmergencyContact onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 5 && <Step5ReviewSubmit onPrev={handlePrev} />}
      </div>
    </div>
  );
}
