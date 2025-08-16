import z from "zod";

const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

export const emergencyContactSchema = z
  .object({
    contactName: z.string().min(1, "Contact name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    phone: z.string().regex(phoneRegex, "Invalid phone number"),

    age: z.number().min(0, "Age is required"),

    guardian: z
      .object({
        name: z.string().min(1, "Guardian name is required"),
        phone: z.string().regex(phoneRegex, "Invalid guardian phone number"),
      })
      .optional(),
  })
  .refine(
    (data) => {
      // Guardian required if age < 21
      if (data.age < 21) {
        return !!data.guardian;
      }
      return true;
    },
    {
      message: "Guardian contact is required if age < 21",
      path: ["guardian"],
    }
  );
