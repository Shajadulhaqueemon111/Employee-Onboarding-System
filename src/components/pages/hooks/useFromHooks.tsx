/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
} from "react-hook-form";
import type { ZodType } from "zod";

type UseReusableFormProps<T extends FieldValues> = {
  schema: ZodType<T, any, any>;
  defaultValues?: UseFormProps<T>["defaultValues"];
  onSubmit: SubmitHandler<T>;
};

export function useReusableForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
}: UseReusableFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema) as any,
    defaultValues,
  });

  const handleSubmitForm = form.handleSubmit(onSubmit);

  return { ...form, handleSubmitForm };
}
