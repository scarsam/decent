import { userValidationSchema } from "../validation/userValidation";
import { sessionValidationSchema } from "../validation/sessionValidation";
import {
  FormikTouched,
  FormikErrors,
  FormikValues,
  FormikHelpers,
} from "formik";
import React from "react";

export type UserValidationTypes = typeof userValidationSchema;
export type SessionValidationTypes = typeof sessionValidationSchema;

export interface INotification {
  message: string;
  autoDeleteTime: number;
}

export interface IPassword {
  hasLength: boolean;
  hasNumber: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IUserContext {
  user: IUser;
  updateUser: (user: Partial<IUser>) => void;
}

export interface ITextField {
  options?: string[];
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  isInvalid: string | false | undefined;
  errorMessage?: string | undefined;
  helperText?: React.ReactNode;
  validate?: (value: any) => { error: string } | void;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

export interface IForm {
  handleSubmit: (
    values: FormikValues,
    helpers: FormikHelpers<FormikValues>,
  ) => void;
  validationSchema?: UserValidationTypes | SessionValidationTypes;
  initalValues: {
    [key: string]: string | string[];
  };
  render: (
    errors: FormikErrors<{ [key: string]: string }>,
    touched: FormikTouched<{ [key: string]: string }>,
    handleChange: (e: React.ChangeEvent<any>) => void,
  ) => React.ReactNode;
}

export interface ILink {
  content: string | React.ReactNode;
  path: string;
  styleAs: "button" | "link";
  size?: "regular" | "large";
  onClick?: (value: any) => void;
}

export interface ILayout {
  height?: boolean;
}
