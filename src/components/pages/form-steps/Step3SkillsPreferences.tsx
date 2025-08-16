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

type StepProps = { onNext: () => void; onPrev: () => void };

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
    (state: RootState) => state.form.step2.department || ""
  );
  const savedStep3 = useSelector((state: RootState) => state.form.step3);

  const defaultSkills =
    savedStep3.skills && savedStep3.skills.length > 0
      ? savedStep3.skills
      : department
      ? skillsByDepartment[department].map((name) => ({
          name,
          selected: false,
          experience: 0,
        }))
      : [];

  const {
    register,
    formState: { errors },
    handleSubmitForm,
    watch,
    setValue,
  } = useReusableForm<SkillsPreferences>({
    schema: skillsPreferencesSchema,
    defaultValues: {
      department,
      skills: defaultSkills,
      workingHours: savedStep3.workingHours || { start: "", end: "" },
      remotePercent: savedStep3.remotePercent || 0,
      managerApproved: savedStep3.managerApproved || false,
      extraNotes: savedStep3.extraNotes || "",
    },
    onSubmit: (data) => {
      if (data.remotePercent <= 50) data.managerApproved = false;
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

  useEffect(() => {
    if (department && (!savedStep3.skills || savedStep3.skills.length === 0)) {
      const newSkills = skillsByDepartment[department].map((name) => ({
        name,
        selected: false,
        experience: 0,
      }));
      setValue("skills", newSkills);
    }
  }, [department, setValue, savedStep3.skills]);

  return (
    <form
      className="space-y-4 max-w-2xl mx-auto shadow-xl bg-white p-4"
      onSubmit={handleSubmitForm}
    >
      <div>
        <h1 className="text-2xl font-bold text-center">Skills & Preferences</h1>
        <p className="text-center text-gray-700">
          your skils,start date, end date and remote work add
        </p>
      </div>
      <div>
        <label>Primary Skills (Select at least 3)</label>
        {skills.map((skill, idx) => (
          <div key={skill.name} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              {...register(`skills.${idx}.selected` as const)}
            />
            <span>{skill.name}</span>
            {watch(`skills.${idx}.selected`) && (
              <input
                type="number"
                {...register(`skills.${idx}.experience` as const, {
                  valueAsNumber: true,
                })}
                placeholder="Years exp"
                className="ml-2 w-20 border p-1 rounded"
              />
            )}
          </div>
        ))}
        {errors.skills && (
          <p className="text-red-500">{(errors.skills as any)?.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <div>
          <label>Start Time</label>
          <input
            type="time"
            {...register("workingHours.start")}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="time"
            {...register("workingHours.end")}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <div>
        <label>Remote % ({remotePercent}%)</label>
        <input
          type="range"
          min={0}
          max={100}
          {...register("remotePercent", { valueAsNumber: true })}
          className="w-full"
        />
      </div>

      {remotePercent > 50 && (
        <div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" {...register("managerApproved")} /> Manager
            Approved
          </label>
        </div>
      )}

      <div>
        <label>Extra Notes</label>
        <textarea
          {...register("extraNotes")}
          className="w-full border p-2 rounded"
        />
      </div>

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
