import { z } from "zod";

const EditUserSchema = z.object({
  username: z
    .string()
    .min(2, "Seu nome de usuário é obrigatório")
    .max(20, "Seu nome de usuário deve ter no máximo 20 caracteres"),
  email: z.string().email("Digite um email válido"),
  phoneNumber: z.string(),
});

export type EditUser = z.infer<typeof EditUserSchema>;

export default EditUserSchema;
