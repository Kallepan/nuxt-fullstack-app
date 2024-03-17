import { FormValidation } from "~/types/FormValidation";
import { RegistationRequest } from "~/types/IRegistration";
import { IUser } from "~/types/IUser";
import { validate } from "./validator";

export type ExistsCheck = {
  value: boolean;
  message?: string;
};

export type RegistrationErrors = {
  emailError?: string;
  usernameError?: string;
};

export async function validateUser(data: RegistationRequest): Promise<FormValidation> {
  const errors = await validate(data);

  if (errors.size > 0) {
    return { hasErrors: true, errors };
  }

  return { hasErrors: false };
}

export function sanitizeUserForFrontend(user: IUser | undefined): IUser {
  if (!user) {
    return user!;
  }

  delete user.password;
  delete user.loginType;

  return user;
}
