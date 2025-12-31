import * as zod from "zod";

import i18n from "@/i18n/config";

const resetPasswordSchema = zod
  .object({
    token: zod.string().min(1),
    password: zod.string().min(8),
    password_confirmation: zod.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
      message: i18n.t("validation:password_mismatch"),
    path: ["password_confirmation"],
  });


export default resetPasswordSchema;
