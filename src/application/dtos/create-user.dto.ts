import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
