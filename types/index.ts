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

export interface IUser {
  id: string;
  email: string;
  password: string;
}

export interface IUserContext {
  user: IUser;
}

export interface ITextField {
  options?: string[];
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  isInvalid: string | false | undefined;
  errorMessage: string | undefined;
  helperText?: React.ReactNode;
}

export interface IForm {
  handleSubmit: (
    values: FormikValues,
    helpers: FormikHelpers<FormikValues>,
  ) => void;
  validationSchema: UserValidationTypes | SessionValidationTypes;
  initalValues: {
    [key: string]: string | string[];
  };
  render: (
    errors: FormikErrors<{ [key: string]: string }>,
    touched: FormikTouched<{ [key: string]: string }>,
  ) => React.ReactNode;
}

export interface ILink {
  text: string;
  path: string;
  styleAs: "button" | "link";
  size?: "regular" | "large";
}

export interface ILayout {
  background?: boolean;
}
