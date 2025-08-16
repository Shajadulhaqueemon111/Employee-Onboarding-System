import { useReusableForm } from "../hooks/useFromHooks";

import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { jobDetailsSchema } from "@/components/utils/personalInformaionZodSchema";

type JobDetails = {
  department: "Engineering" | "Marketing" | "Sales" | "HR" | "Finance";
  positionTitle: string;
  startDate: Date;
  jobType: "Full-Time" | "Part-Time" | "Contract" | "Internship";
  salary: number;
  manager: string;
};

type StepProps = {
  onNext: () => void;
  onPrev: () => void;
};

const managersByDepartment: Record<string, string[]> = {
  Engineering: ["Eng Manager 1", "Eng Manager 2"],
  Marketing: ["Mkt Manager 1", "Mkt Manager 2"],
  Sales: ["Sales Manager 1", "Sales Manager 2"],
  HR: ["HR Manager 1"],
  Finance: ["Finance Manager 1"],
};

export const Step2JobDetails = ({ onNext, onPrev }: StepProps) => {
  const {
    register,
    formState: { errors },
    handleSubmitForm,
    watch,
    setValue,
  } = useReusableForm<JobDetails>({
    schema: jobDetailsSchema,
    onSubmit: (data) => {
      console.log("Job Details Submitted:", data);
      toast.success("Step 2 completed!");
      onNext();
    },
  });

  const department = watch("department");
  const jobType = watch("jobType");

  // Auto-clear manager if department changes
  useEffect(() => {
    setValue("manager", "");
  }, [department, setValue]);

  const handleNextClick = () => {
    handleSubmitForm();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix validation errors before proceeding!");
    }
  };

  return (
    <form className="space-y-4 max-w-2xl mx-auto shadow-xl bg-white p-4">
      {/* Department */}
      <div>
        <label className="block mb-1 font-semibold">Department</label>
        <select
          {...register("department")}
          className="w-full border rounded p-2"
        >
          <option value="">Select Department</option>
          {["Engineering", "Marketing", "Sales", "HR", "Finance"].map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
        {errors.department && (
          <p className="text-red-500">{errors.department.message}</p>
        )}
      </div>

      {/* Position Title */}
      <div>
        <label className="block mb-1 font-semibold">Position Title</label>
        <input
          type="text"
          {...register("positionTitle")}
          className="w-full border rounded p-2"
        />
        {errors.positionTitle && (
          <p className="text-red-500">{errors.positionTitle.message}</p>
        )}
      </div>

      {/* Start Date */}
      <div>
        <label className="block mb-1 font-semibold">Start Date</label>
        <input
          type="date"
          {...register("startDate", { valueAsDate: true })}
          className="w-full border rounded p-2"
        />
        {errors.startDate && (
          <p className="text-red-500">{errors.startDate.message}</p>
        )}
      </div>

      {/* Job Type */}
      <div>
        <label className="block mb-1 font-semibold">Job Type</label>
        <div className="flex gap-4">
          {["Full-Time", "Part-Time", "Contract", "Internship"].map((jt) => (
            <label key={jt}>
              <input type="radio" value={jt} {...register("jobType")} /> {jt}
            </label>
          ))}
        </div>
        {errors.jobType && (
          <p className="text-red-500">{errors.jobType.message}</p>
        )}
      </div>

      {/* Salary */}
      <div>
        <label className="block mb-1 font-semibold">
          Salary{" "}
          {jobType === "Contract"
            ? "(Hourly $50–$150)"
            : jobType === "Full-Time"
            ? "(Annual $30k–$200k)"
            : ""}
        </label>
        <input
          type="number"
          {...register("salary", { valueAsNumber: true })}
          className="w-full border rounded p-2"
        />
        {errors.salary && (
          <p className="text-red-500">{errors.salary.message}</p>
        )}
      </div>

      {/* Manager */}
      <div>
        <label className="block mb-1 font-semibold">Manager</label>
        <select {...register("manager")} className="w-full border rounded p-2">
          <option value="">Select Manager</option>
          {department &&
            managersByDepartment[department]?.map((mgr) => (
              <option key={mgr} value={mgr}>
                {mgr}
              </option>
            ))}
        </select>
        {errors.manager && (
          <p className="text-red-500">{errors.manager.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
        >
          previos
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};
