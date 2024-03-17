import prisma from "~/server/database/client";
import { IUser } from "~/types/IUser";

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return (await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  })) as IUser | null;
}

export async function getUserByUserName(username: string): Promise<IUser | null> {
  return (await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  })) as IUser | null;
}

export async function createUser(data: IUser) {
  return (await prisma.user.create({
    data: {
      username: data.username,
      name: data.name,
      email: data.email,
      loginType: data.loginType,
      password: data.password,
    },
  })) as IUser;
}
