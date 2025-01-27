import { Path } from "react-hook-form";

export interface SignupFormInputsInterface {
  fName: string;
  lName: string;
  email: string;
  phone: number;
  password: string;
  passwordConfirm: string;
}

export interface LoginFormInputsInterface {
  email: string;
  password: string;
}

export interface ValidatorInterface {
  required?: { value: boolean; message: string };
  pattern?: { value: RegExp; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  validate?: (value: string) => string | boolean; // Custom validation function
}

export interface InputFieldInterface {
  name: Path<SignupFormInputsInterface | LoginFormInputsInterface>;
  placeholder: string;
  type: string;
  validators: ValidatorInterface;
}
