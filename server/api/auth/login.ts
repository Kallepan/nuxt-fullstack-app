import bcrypt from "bcrypt";
import { sendError } from "h3";
import { getUserByEmail } from "~/server/database/repositories/userRepository";
import { makeSession } from "~/server/database/services/sessionService";
import { sanitizeUserForFrontend } from "~/server/database/services/userService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const email: string = body.email;
  const password: string = body.password;
  const user = await getUserByEmail(email);

  if (user === null) {
    sendError(event, createError({ statusCode: 401, statusMessage: "Unauthenticated" }));
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password!);

  if (!isPasswordCorrect) {
    sendError(event, createError({ statusCode: 401, statusMessage: "Unauthenticated" }));
    return;
  }

  await makeSession(user, event);

  return sanitizeUserForFrontend(user);
});
