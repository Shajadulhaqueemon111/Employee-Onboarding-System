import { z } from "zod";

export const reviewSubmitSchema = z.object({
  confirm: z.boolean().refine((val) => val === true, {
    message: "You must confirm before submitting",
  }),
});

export type ReviewSubmitForm = z.infer<typeof reviewSubmitSchema>;
