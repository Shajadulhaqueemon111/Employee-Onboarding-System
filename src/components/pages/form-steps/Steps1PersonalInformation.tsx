import { personalInfoSchema } from "@/components/utils/validationSchema";
import { useReusableForm } from "../hooks/useFromHooks";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { saveStep1 } from "@/components/redux/slice/formSlicer";
import type { RootState } from "@/components/redux/app/store";

type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  profilePicture?: FileList;
};

type StepProps = {
  onNext: () => void;
};

export function EmployeeFormPersonalInfomationSteps1({ onNext }: StepProps) {
  const dispatch = useDispatch();
  const step1Data = useSelector((state: RootState) => state.form.step1);

  const {
    register,
    formState: { errors },
    handleSubmitForm,
    watch,
  } = useReusableForm<PersonalInfo>({
    schema: personalInfoSchema,
    defaultValues: step1Data,
    onSubmit: (data: PersonalInfo) => {
      dispatch(saveStep1(data));

      console.log("Employee Data:", data);
      if (data.profilePicture && data.profilePicture.length > 0) {
        console.log("Uploaded file:", data.profilePicture[0]);
      }

      toast.success("Step 1 completed!");
      onNext();
    },
  });

  const profilePic = watch("profilePicture");

  const handleNextClick = () => {
    handleSubmitForm();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the validation errors before proceeding!");
    }
  };

  return (
    <form className="space-y-4 max-w-4xl mx-auto shadow-xl bg-white p-4">
      <div className="mx-auto text-center">
        <h1 className="text-2xl font-bold text-black">Personal Information</h1>
        <p className="text-gray-600">Lets start with your basic information</p>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Full Name</label>
        <input
          type="text"
          {...register("fullName")}
          className="w-full border rounded p-2"
        />
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded p-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex-1 mt-4 md:mt-0">
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="text"
            {...register("phone")}
            placeholder="+1-123-456-7890"
            className="w-full border rounded p-2"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Date of Birth</label>
          <input
            type="date"
            {...register("dob")}
            className="w-full border rounded p-2"
          />
          {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
        </div>

        {/* Profile Picture */}
        <div className="flex-1 mt-4 md:mt-0">
          <label className="block mb-1 font-semibold">
            Profile Picture (optional)
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/jpeg,image/png"
              {...register("profilePicture")}
              className="w-full border rounded p-2 pr-10 cursor-pointer"
            />
            <FiUploadCloud className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          {errors.profilePicture && (
            <p className="text-red-500 mt-1">{errors.profilePicture.message}</p>
          )}
          {profilePic && profilePic.length > 0 && (
            <p>Selected: {profilePic[0].name}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">JPG or PNG, max 2MB</p>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-4">
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
}
