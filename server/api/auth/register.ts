import { sendError } from "h3";
import { IUser } from "~/types/IUser";

import bcrypt from "bcrypt";
import { createUser } from "~/server/database/repositories/userRepository";
import { RegistationRequest } from "~/types/IRegistration";
import { validateUser } from "~/server/database/services/userService";
import { makeSession } from "~/server/database/services/sessionService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data = body.data as RegistationRequest;

  const validation = await validateUser(data);

  if (validation.hasErrors === true) {
    const errors = JSON.stringify(Object.fromEntries(validation.errors));
    return sendError(event, createError({ statusCode: 422, data: errors }));
  }
  const { username, name, email, password } = data;

  const encryptedPassword: string = await bcrypt.hash(password!, 10);

  const userData: IUser = {
    username: username!,
    name: name,
    email: email!,
    loginType: "email",
    password: encryptedPassword,
  };

  const user = await createUser(userData);

  return await makeSession(user, event);
});
