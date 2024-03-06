import type { InputValidation } from "./InputValidation";

export type FormValidation = {
  hasErrors: boolean;
  errors?: Map<string, { check: InputValidation }>;
};

export type FormErrors = {
  field: string;
  check: InputValidation;
};
