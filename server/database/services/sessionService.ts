import { H3Event } from "h3";
import { IUser } from "~~/types/IUser";
import { v4 as uuidv4 } from "uuid";
import { sanitizeUserForFrontend } from "./userService";
import { createSession, getSessionByAuthToken } from "../repositories/sessionRepository";

export async function makeSession(user: IUser, event: H3Event): Promise<IUser> {
  const authToken = uuidv4().replaceAll("-", "");
  const session = await createSession({ authToken, userId: user.id! });
  const userId = session.userId;

  if (userId) {
    setCookie(event, "auth_token", authToken, { path: "/", httpOnly: true });
    return getUserBySessionToken(authToken);
  }

  throw Error("Error Creating Session");
}

export async function getUserBySessionToken(authToken: string): Promise<IUser> {
  const session = await getSessionByAuthToken(authToken);

  return sanitizeUserForFrontend(session.user);
}
