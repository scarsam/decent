import * as Yup from "yup";

export const validationFields = {
  email: Yup.string().email().required("Email required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,30}$/,
      "Please Enter your password",
    ),
};

export const sessionValidationSchema = Yup.object({
  ...validationFields,
});

export const signupValidationSchema = Yup.object({
  email: validationFields.email,
});
