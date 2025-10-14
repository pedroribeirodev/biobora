import { hash } from "bcryptjs"
import { prisma } from "./prisma"
import { AuthProvider, PlanType } from "@prisma/client"

export async function createUser(data: {
  email: string
  password: string
  name?: string
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  })

  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      authProvider: AuthProvider.EMAIL,
      planType: PlanType.FREE,
    }
  })

  return user
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id }
  })
}
