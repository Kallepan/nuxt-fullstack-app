import { IUser } from "~/types/IUser";
import prisma from "~/server/database/client";
import { ISession } from "~~/types/ISession";

export async function createSession(data: ISession): Promise<ISession> {
  return await prisma.session.create({
    data: {
      userId: data.userId,
      authToken: data.authToken,
    },
  });
}

export async function getSessionByAuthToken(authToken: string): Promise<ISession> {
  const user: IUser = (await getUserByAuthToken(authToken)) as IUser;

  return { authToken, user, userId: user.id! };
}

async function getUserByAuthToken(authToken: string): Promise<IUser | null> {
  return (await prisma.session
    .findUnique({
      where: {
        authToken: authToken,
      },
    })
    .user()) as IUser | null;
}
