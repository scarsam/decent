import { useFormikContext } from "formik";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  const { isSubmitting, isValid } = useFormikContext();

  return (
    <button
      className={
        "bg-primary text-white rounded-full font-semibold px-6 py-2 text-md uppercase tracking-wider hover:bg-primary-dark transition-colors disabled:opacity-70"
      }
      {...props}
      disabled={isSubmitting || !isValid}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
