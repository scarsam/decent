import * as Yup from "yup";

export const sessionFields = {
  email: Yup.string().email().required("Email required"),
};

export const sessionValidationSchema = Yup.object({
  ...sessionFields,
});
