"use server"

import { createUser } from "@/lib/auth-helpers"
import { z } from "zod"

const signUpSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres").optional().or(z.literal("")),
})

export async function signUp(formData: FormData) {
  try {
    const nameValue = formData.get("name") as string | null
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: nameValue && nameValue.length > 0 ? nameValue : undefined,
    }

    const validated = signUpSchema.parse(data)

    const user = await createUser(validated)

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0]
      return {
        success: false,
        error: firstError?.message || "Erro de validação"
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Falha ao criar conta"
    }
  }
}
