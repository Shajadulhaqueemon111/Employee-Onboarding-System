import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().regex(/^\S+\s+\S+/, "Must have at least 2 words"),
  email: z.string().email(),
  phone: z
    .string()
    .regex(
      /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/,
      "Phone number must be in format +1-123-456-7890"
    ),
  dob: z.string().refine((date) => {
    const age =
      (new Date().getTime() - new Date(date).getTime()) /
      (1000 * 60 * 60 * 24 * 365);
    return age >= 18;
  }, "Must be at least 18"),
  profilePicture: z
    .custom<FileList>()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const file = files[0];
      return (
        file.size <= 4_000_000 &&
        ["image/jpeg", "image/png"].includes(file.type)
      );
    }, "Max size 4MB, JPG/PNG only"),
});
