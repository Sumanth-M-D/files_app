import { ReactNode } from "react";
import { Path } from "react-hook-form";

export interface SocialMediaInputInterface {
  id: Path<UserAccountInterface>;
  icon: ReactNode;
  // value: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputInterface {
  label: string;
  id: Path<UserAccountInterface>;
  type: string;
  validators: ValidatorInterface;
  span: number;
  // value: string | number;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ValidatorInterface {
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
}

export interface UserAccountInterface {
  photo: string;
  coverPhoto: string;

  facebook: string;
  twitterX: string;
  instagram: string;

  fName: string;
  lName: string;
  bio: string;
  email: string;
  phone: string;
  addressLine_1: string;
  addressLine_2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}
