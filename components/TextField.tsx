import { Field } from "formik";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { ITextField } from "../types";

const TextField: React.VFC<ITextField> = ({
  label,
  type,
  name,
  placeholder,
  isInvalid,
  errorMessage,
  helperText,
}) => {
  return (
    <div className="mb-1">
      <Label id={name} label={label}>
        <Field
          className={`bg-gray-200 p-2 rounded-sm form-border form-focus outline-none mb-1 ${
            isInvalid ? "form-error bg-red-100" : ""
          }`}
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
        />
        {isInvalid && <ErrorMessage message={errorMessage} />}
        {helperText && helperText}
      </Label>
    </div>
  );
};

export default TextField;
