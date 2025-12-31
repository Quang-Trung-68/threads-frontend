import * as zod from "zod";

import i18n from "@/i18n/config";

const registerSchema = zod
  .object({
    username: zod.string().min(1).max(20),
    email: zod.email(),
    password: zod.string().min(8),
    password_confirmation: zod.string().min(8),
  })
  .superRefine((data, ctx) => {
  if (data.password !== data.password_confirmation) {
    ctx.addIssue({
      code: "custom",
       message: i18n.t("validation:password_mismatch"),
      path: ["password_confirmation"],
    });
  }
});


export default registerSchema;
