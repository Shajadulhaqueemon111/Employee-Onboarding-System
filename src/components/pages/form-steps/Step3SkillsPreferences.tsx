/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useReusableForm } from "../hooks/useFromHooks";
import { toast } from "react-hot-toast";

import { skillsPreferencesSchema } from "@/components/utils/skilsandexprianceZodSchema";
import type { RootState } from "@/components/redux/app/store";
import { useDispatch, useSelector } from "react-redux";
import { saveStep3 } from "@/components/redux/slice/formSlicer";

type SkillsPreferences = {
  department: string;
  skills: { name: string; selected: boolean; experience: number }[];
  workingHours: { start: string; end: string };
  remotePercent: number;
  managerApproved?: boolean;
  extraNotes: string;
};

type StepProps = {
  onNext: () => void;
  onPrev: () => void;
};

const skillsByDepartment: Record<string, string[]> = {
  Engineering: ["React", "Node.js", "TypeScript", "Python", "Docker"],
  Marketing: ["SEO", "Content Writing", "Social Media", "Ads Management"],
  Sales: ["Negotiation", "CRM", "Lead Generation"],
  HR: ["Recruitment", "Payroll", "Employee Relations"],
  Finance: ["Accounting", "Budgeting", "Excel", "Analysis"],
};

export const Step3SkillsPreferences = ({ onNext, onPrev }: StepProps) => {
  const dispatch = useDispatch();
  const department = useSelector(
    (state: RootState) => state.form.step2.department
  );

  const {
    register,
    formState: { errors },
    handleSubmitForm,
    watch,
    setValue,
  } = useReusableForm<SkillsPreferences>({
    schema: skillsPreferencesSchema,
    defaultValues: {
      skills:
        skillsByDepartment[department]?.map((name) => ({
          name,
          selected: false,
          experience: 0,
        })) || [],
      workingHours: { start: "", end: "" },
      remotePercent: 0,
      managerApproved: false,
      extraNotes: "",
      department,
    },
    onSubmit: (data) => {
      dispatch(saveStep3(data));
      toast.success("Step 3 completed!");
      onNext();
    },
  });

  const remotePercent = watch("remotePercent");
  const skills = watch("skills");

  useEffect(() => {
    if (remotePercent <= 50) setValue("managerApproved", false);
  }, [remotePercent, setValue]);

  return (
    <form
      className="space-y-4 max-w-2xl mx-auto shadow-xl bg-white p-4"
      onSubmit={handleSubmitForm}
    >
      {/* Skills */}
      <div>
        <label className="block mb-1 font-semibold">
          Primary Skills (Select at least 3)
        </label>
        {skills.map((skill, idx) => (
          <div key={skill.name} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              {...register(`skills.${idx}.selected` as const)}
              className="h-4 w-4"
            />
            <span>{skill.name}</span>
            {watch(`skills.${idx}.selected`) && (
              <input
                type="number"
                {...register(`skills.${idx}.experience` as const, {
                  valueAsNumber: true,
                })}
                placeholder="Years exp"
                className="ml-2 w-20 border rounded p-1"
              />
            )}
          </div>
        ))}

        {/* show refine error properly */}
        {errors.skills && (
          <p className="text-red-500">
            {(errors.skills as any)?.message ||
              (errors.skills as any)?.root?.message}
          </p>
        )}
      </div>

      {/* Working Hours */}
      <div className="flex gap-4">
        <div>
          <label className="block mb-1 font-semibold">Start Time</label>
          <input
            type="time"
            {...register("workingHours.start")}
            className="border rounded p-2"
          />
          {errors.workingHours?.start && (
            <p className="text-red-500">
              {errors.workingHours.start.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">End Time</label>
          <input
            type="time"
            {...register("workingHours.end")}
            className="border rounded p-2"
          />
          {errors.workingHours?.end && (
            <p className="text-red-500">
              {errors.workingHours.end.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Remote % */}
      <div>
        <label className="block mb-1 font-semibold">
          Remote % ({remotePercent}%)
        </label>
        <input
          type="range"
          min={0}
          max={100}
          {...register("remotePercent", { valueAsNumber: true })}
          className="w-full"
        />
        {errors.remotePercent && (
          <p className="text-red-500">
            {errors.remotePercent.message as string}
          </p>
        )}
      </div>

      {/* Manager Approved */}
      {remotePercent > 50 && (
        <div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" {...register("managerApproved")} />
            Manager Approved
          </label>
        </div>
      )}

      {/* Extra Notes */}
      <div>
        <label className="block mb-1 font-semibold">Extra Notes</label>
        <textarea
          {...register("extraNotes")}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};
