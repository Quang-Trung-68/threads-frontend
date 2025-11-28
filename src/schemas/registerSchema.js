import * as zod from "zod";

const registerSchema = zod.object({
  firstName: zod.string().min(1).max(10),
  lastName: zod.string().min(1).max(10),
  email: zod.email(),
  password: zod.string().min(8),
  password_confirmation: zod.string().min(8),
});

export default registerSchema;
