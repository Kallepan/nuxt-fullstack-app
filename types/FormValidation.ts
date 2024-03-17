import type { InputValidation } from "./InputValidation";

type ValidationErrors = Map<string, { check: InputValidation }>;

export type FormValidation =
  | {
      hasErrors: true;
      errors: ValidationErrors;
    }
  | {
      hasErrors: false;
    };

export type FormErrors = {
  field: string;
  check: InputValidation;
};
