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

type Step3Data = {
  skills: { name: string; selected: boolean; experience: number }[];
  workingHours: { start: string; end: string };
  remotePercent: number;
  managerApproved?: boolean;
  extraNotes: string;
  department: string;
};

type FormState = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
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
  step3: {
    skills: [],
    workingHours: { start: "", end: "" },
    remotePercent: 0,
    managerApproved: false,
    extraNotes: "",
    department: "",
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
    saveStep3: (state, action: PayloadAction<Step3Data>) => {
      state.step3 = action.payload;
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

export const {
  saveStep1,
  saveStep2,
  saveStep3,
  nextStep,
  prevStep,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
