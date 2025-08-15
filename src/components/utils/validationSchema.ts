import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().regex(/^\S+\s+\S+/, "Must have at least 2 words"),
  email: z.string().email(),
  phone: z.string().regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Invalid format"),
  dob: z.string().refine((date) => {
    const age =
      (new Date().getTime() - new Date(date).getTime()) /
      (1000 * 60 * 60 * 24 * 365);
    return age >= 18;
  }, "Must be at least 18"),
  profilePicture: z
    .any()
    .optional()
    .refine((file) => {
      if (!file) return true;
      return (
        file.size <= 2_000_000 &&
        ["image/jpeg", "image/png"].includes(file.type)
      );
    }, "Max size 2MB, JPG/PNG only"),
});
