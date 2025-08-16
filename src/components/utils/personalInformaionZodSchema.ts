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

    salary: z.preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z.number()
    ),

    manager: z.string().min(1, "Manager selection is required"),
  })
  .superRefine((data, ctx) => {
    if (data.startDate < new Date()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "Start date cannot be in the past",
      });
    }

    if (
      (data.department === "HR" || data.department === "Finance") &&
      data.startDate instanceof Date &&
      !isNaN(data.startDate.getTime()) &&
      [5, 6].includes(data.startDate.getDay())
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "HR/Finance start date cannot be Friday or Saturday",
      });
    }

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
