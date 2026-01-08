import * as zod from "zod";

const loginSchema = zod.object({
  login: zod.string().min(1),
  password: zod.string().min(8),
});

export default loginSchema;
