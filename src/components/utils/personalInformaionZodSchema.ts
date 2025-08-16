import z from "zod";

export const jobDetailsSchema = z
  .object({
    department: z
      .enum(["Engineering", "Marketing", "Sales", "HR", "Finance"])
      .refine((val) => val !== undefined, {
        message: "Department is required",
      }),

    positionTitle: z
      .string()
      .min(2, "Position title must be at least 2 characters")
      .max(100, "Position title must be less than 100 characters"),

    startDate: z
      .date()
      .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
        message: "Invalid date format",
      }),

    jobType: z
      .enum(["Full-Time", "Part-Time", "Contract", "Internship"])
      .refine((val) => val !== undefined, { message: "Job type is required" }),

    salary: z.preprocess((val) => {
      if (typeof val === "string") return Number(val);
      return val;
    }, z.number().min(30000, "Full-Time salary must be at least $30,000").max(200000, "Full-Time salary cannot exceed $200,000")),

    manager: z.string().min(1, "Manager selection is required"),
  })
  .superRefine((data, ctx) => {
    // 1. Start date cannot be in the past
    if (data.startDate < new Date()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "Start date cannot be in the past",
      });
    }

    // 2. HR/Finance cannot start on Friday or Saturday
    if (
      (data.department === "HR" || data.department === "Finance") &&
      data.startDate instanceof Date &&
      !isNaN(data.startDate.getTime()) &&
      [5, 6].includes(data.startDate.getDay()) // 5=Friday, 6=Saturday
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "HR/Finance start date cannot be Friday or Saturday",
      });
    }

    // 3. Salary rules based on Job Type
    if (data.jobType === "Contract") {
      if (data.salary < 50 || data.salary > 150) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salary"],
          message: "Contract hourly rate must be between $50–$150",
        });
      }
    }

    if (data.jobType === "Full-Time") {
      if (data.salary < 30000 || data.salary > 200000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salary"],
          message: "Full-Time annual salary must be between $30k–$200k",
        });
      }
    }
  });
