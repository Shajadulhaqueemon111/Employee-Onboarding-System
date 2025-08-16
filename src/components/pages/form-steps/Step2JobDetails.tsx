import { useReusableForm } from "../hooks/useFromHooks";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { jobDetailsSchema } from "@/components/utils/personalInformaionZodSchema";
import { mockManagers } from "@/components/utils/mocdata";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/components/redux/app/store";
import { saveStep2 } from "@/components/redux/slice/formSlicer";

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

export const Step2JobDetails = ({ onNext, onPrev }: StepProps) => {
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
  } = useReusableForm<JobDetails>({
    schema: jobDetailsSchema,
    onSubmit: (data) => {
      dispatch(saveStep2(data));
      console.log("Job Details Submitted:", data);
      toast.success("Step 2 completed!");
      onNext();
    },
  });

  const jobType = watch("jobType");

  // Auto-clear manager if department changes
  useEffect(() => {
    setValue("manager", "");
  }, [department, setValue]);

  // Filter managers dynamically from mockManagers
  const filteredManagers = department
    ? mockManagers.filter((mgr) => mgr.department === department)
    : [];

  return (
    <form className="space-y-4 max-w-2xl mx-auto shadow-xl bg-white p-4">
      {/* Department */}
      <div className="mx-auto text-center">
        <h1 className="text-2xl font-bold text-black">Job Details</h1>
        <p className="text-gray-600">
          Tell us Aboute your role and expectation
        </p>
      </div>
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
          {filteredManagers.map((mgr) => (
            <option key={mgr.id} value={mgr.name}>
              {mgr.name}
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
          Previous
        </button>
        <button
          type="button"
          onClick={handleSubmitForm}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};
