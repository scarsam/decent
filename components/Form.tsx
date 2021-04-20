import { Form as FormikForm, Formik } from "formik";
import { IForm } from "../types";

const Form: React.VFC<IForm> = ({
  handleSubmit,
  initalValues,
  validationSchema,
  validate,
  render,
}) => {
  return (
    <Formik
      initialValues={initalValues}
      onSubmit={handleSubmit}
      validate={validate}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <FormikForm className="w-full md:w-96">
          {render(errors, touched)}
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
