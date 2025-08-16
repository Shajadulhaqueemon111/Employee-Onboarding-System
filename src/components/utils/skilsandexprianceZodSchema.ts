import z from "zod";

export const skillsPreferencesSchema = z.object({
  skills: z
    .array(
      z.object({
        name: z.string(),
        selected: z.boolean(),
        experience: z.number().min(0, "Experience must be >= 0"),
      })
    )
    .refine(
      (arr) => arr.filter((s) => s.selected).length >= 3,
      "Select at least 3 skills"
    ),
  workingHours: z.object({
    start: z.string().min(1, "working hours added"),
    end: z.string().min(1),
  }),
  remotePercent: z.number().min(0).max(100, "please remote percentence added"),
  managerApproved: z.boolean().optional(),
  extraNotes: z.string().optional(),
});
