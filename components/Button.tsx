import { useFormikContext } from "formik";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  const { isSubmitting, isValid } = useFormikContext();

  return (
    <button
      className={"text-white"}
      {...props}
      disabled={isSubmitting || !isValid}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
