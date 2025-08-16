import { z } from "zod";
import { useSelector, useDispatch } from "react-redux";

import { useReusableForm } from "../hooks/useFromHooks";
import { Button } from "@/components/ui/button";
// import { resetForm } from "@/components/redux/slice/formSlicer";
import { reviewSubmitSchema } from "@/components/utils/reviewandsubmitZodSchema";
import type { RootState } from "@/components/redux/app/store";
import toast from "react-hot-toast";
import { resetToStep1 } from "@/components/redux/slice/formSlicer";

type StepProps = {
  onPrev: () => void;
};

export type ReviewSubmitForm = z.infer<typeof reviewSubmitSchema>;

export const Step5ReviewSubmit = ({ onPrev }: StepProps) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  const { register, handleSubmitForm, watch } =
    useReusableForm<ReviewSubmitForm>({
      schema: reviewSubmitSchema,
      defaultValues: { confirm: false },
      onSubmit: (data) => {
        console.log(data);
        const payload = {
          personalInfo: formData.step1,
          jobInfo: formData.step2,
          skillsInfo: formData.step3,
          emergencyContact: formData.step4,
          submittedAt: new Date().toISOString(),
        };
        console.log("✅ Form submitted:", payload);

        // dispatch(resetForm());
        toast.success("Form submitted successfully!");
        setTimeout(() => dispatch(resetToStep1()), 2000);
      },
    });

  const confirmChecked = watch("confirm");

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-xl bg-white rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-center">Review & Submit</h2>

      {/* Display all step data (read-only) */}
      <div className="p-4 border rounded">
        <h3 className="font-semibold mb-2">Personal Info</h3>
        <p>
          <strong>Full Name:</strong> {formData.step1.fullName}
        </p>
        <p>
          <strong>Email:</strong> {formData.step1.email}
        </p>
        <p>
          <strong>Phone:</strong> {formData.step1.phone}
        </p>
        <p>
          <strong>DOB:</strong> {formData.step1.dob}
        </p>
      </div>

      <div className="p-4 border rounded">
        <h3 className="font-semibold mb-2">Job Info</h3>
        <p>
          <strong>Department:</strong> {formData.step2.department}
        </p>
        <p>
          <strong>Position:</strong> {formData.step2.positionTitle}
        </p>
        <p>
          <strong>Job Type:</strong> {formData.step2.jobType}
        </p>
        <p>
          <strong>Manager:</strong> {formData.step2.manager}
        </p>
        <p>
          <strong>Salary:</strong> {formData.step2.salary ?? "-"}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {formData.step2.startDate?.toString() ?? "-"}
        </p>
      </div>

      <div className="p-4 border rounded">
        <h3 className="font-semibold mb-2">Skills & Preferences</h3>
        {formData.step3.skills.map((skill) => (
          <p key={skill.name}>
            {skill.name}:{" "}
            {skill.selected ? `${skill.experience} yrs` : "Not selected"}
          </p>
        ))}
        <p>
          <strong>Working Hours:</strong> {formData.step3.workingHours.start} -{" "}
          {formData.step3.workingHours.end}
        </p>
        <p>
          <strong>Remote %:</strong> {formData.step3.remotePercent}%
        </p>
        <p>
          <strong>Manager Approved:</strong>{" "}
          {formData.step3.managerApproved ? "Yes" : "No"}
        </p>
        <p>
          <strong>Extra Notes:</strong> {formData.step3.extraNotes || "-"}
        </p>
      </div>

      <div className="p-4 border rounded">
        <h3 className="font-semibold mb-2">Emergency Contact</h3>
        <p>
          <strong>Name:</strong> {formData.step4.contactName}
        </p>
        <p>
          <strong>Relationship:</strong> {formData.step4.relationship}
        </p>
        <p>
          <strong>Phone:</strong> {formData.step4.phone}
        </p>
        <p>
          <strong>Age:</strong> {formData.step4.age}
        </p>
        {formData.step4.age < 21 && (
          <>
            <p>
              <strong>Guardian Name:</strong> {formData.step4.guardianName}
            </p>
            <p>
              <strong>Guardian Phone:</strong> {formData.step4.guardianPhone}
            </p>
          </>
        )}
      </div>

      {/* Confirm Checkbox */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("confirm")} id="confirm" />
        <label htmlFor="confirm">
          I confirm that the information provided is correct
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <Button
          type="button"
          onClick={onPrev}
          className="bg-gray-500 hover:bg-gray-600"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleSubmitForm}
          disabled={!confirmChecked}
          className={`bg-blue-600 hover:bg-blue-700 ${
            !confirmChecked ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
