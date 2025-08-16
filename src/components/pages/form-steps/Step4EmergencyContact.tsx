import { useDispatch, useSelector } from "react-redux";
import { useReusableForm } from "../hooks/useFromHooks";
import { emergencyContactSchema } from "@/components/utils/emergencyContactZodSchema";
import { saveStep4 } from "@/components/redux/slice/formSlicer";
import type { RootState } from "@/components/redux/app/store";

export type EmergencyContact = {
  contactName: string;
  relationship: string;
  phone: string;
  age: number;
  guardianName?: string;
  guardianPhone?: string;
};

type StepProps = { onNext: () => void; onPrev: () => void };

export const Step4EmergencyContact = ({ onNext, onPrev }: StepProps) => {
  const dispatch = useDispatch();
  const savedStep4 = useSelector((state: RootState) => state.form.step4);

  const {
    register,
    handleSubmitForm,
    watch,
    formState: { errors },
  } = useReusableForm<EmergencyContact>({
    schema: emergencyContactSchema,
    defaultValues: {
      contactName: savedStep4.contactName || "",
      relationship: savedStep4.relationship || "",
      phone: savedStep4.phone || "",
      age: savedStep4.age || 0,
      guardianName: savedStep4?.guardianName || "",
      guardianPhone: savedStep4?.guardianPhone || "",
    },
    onSubmit: (data) => {
      dispatch(saveStep4(data));
      console.log("Emergency Contact Data:", data);
      onNext();
    },
  });

  const age = watch("age");

  return (
    <div className="max-w-lg mx-auto p-6 shadow-xl bg-white rounded-lg">
      <form onSubmit={handleSubmitForm} className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center text-black">
            Emergency Contact
          </h2>
          <p className="text-center text-gray-700">
            your emergency contact details
          </p>
        </div>
        <div>
          <label className="block font-semibold">Contact Name</label>
          <input
            {...register("contactName")}
            placeholder="Enter contact name"
            className="w-full border rounded p-2"
          />
          {errors.contactName && (
            <p className="text-red-500">
              {errors.contactName.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Relationship</label>
          <select
            {...register("relationship")}
            className="w-full border rounded p-2"
          >
            <option value="" disabled>
              Select relationship
            </option>
            <option value="parent">Parent</option>
            <option value="sibling">Sibling</option>
            <option value="friend">Friend</option>
            <option value="spouse">Spouse</option>
          </select>
          {errors.relationship && (
            <p className="text-red-500">
              {errors.relationship.message as string}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold">Phone</label>
          <input
            {...register("phone")}
            placeholder="Enter phone number"
            className="w-full border rounded p-2"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message as string}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block font-semibold">Age</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            placeholder="Enter age"
            className="w-full border rounded p-2"
          />
          {errors.age && (
            <p className="text-red-500">{errors.age.message as string}</p>
          )}
        </div>

        {age < 21 && (
          <>
            <div>
              <label className="block font-semibold">Guardian Name</label>
              <input
                {...register("guardianName")}
                placeholder="Enter guardian name"
                className="w-full border rounded p-2"
              />
              {errors.guardianName && (
                <p className="text-red-500">
                  {errors.guardianName.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Guardian Phone</label>
              <input
                {...register("guardianPhone")}
                placeholder="Enter guardian phone"
                className="w-full border rounded p-2"
              />
              {errors.guardianPhone && (
                <p className="text-red-500">
                  {errors.guardianPhone.message as string}
                </p>
              )}
            </div>
          </>
        )}

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
    </div>
  );
};
