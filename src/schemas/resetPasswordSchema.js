import * as zod from "zod";

const resetPasswordSchema = zod
  .object({
    token: zod.string().min(1),
    password: zod.string().min(8),
    password_confirmation: zod.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    error: "Password do not match with password confirmation",
    path: ["password_confirmation"],
  });

export default resetPasswordSchema;
