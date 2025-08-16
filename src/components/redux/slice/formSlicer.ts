import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Step1Data = {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  profilePicture?: FileList;
};

type Step2Data = {
  department: "Engineering" | "Marketing" | "Sales" | "HR" | "Finance";
  positionTitle: string;
  startDate?: Date;
  jobType: "Full-Time" | "Part-Time" | "Contract" | "Internship";
  salary?: number;
  manager: string;
};

type FormState = {
  step1: Step1Data;
  step2: Step2Data;
  currentStep: number;
};

const initialState: FormState = {
  step1: {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    profilePicture: undefined,
  },
  step2: {
    department: "Engineering",
    positionTitle: "",
    startDate: undefined,
    jobType: "Full-Time",
    salary: undefined,
    manager: "",
  },
  currentStep: 1,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveStep1: (state, action: PayloadAction<Step1Data>) => {
      state.step1 = action.payload;
    },
    saveStep2: (state, action: PayloadAction<Step2Data>) => {
      state.step2 = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    resetForm: () => initialState,
  },
});

export const { saveStep1, saveStep2, nextStep, prevStep, resetForm } =
  formSlice.actions;

export default formSlice.reducer;
