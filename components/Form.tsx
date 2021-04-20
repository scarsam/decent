import { Form as FormikForm, Formik } from "formik";
import { IForm } from "../types";

const Form: React.VFC<IForm> = ({
  handleSubmit,
  initalValues,
  validationSchema,
  render,
}) => {
  return (
    <Formik
      initialValues={initalValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched, handleChange }) => (
        <FormikForm className="w-full md:w-96">
          {render(errors, touched, handleChange)}
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
