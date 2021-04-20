const Label: React.FC<{ label: string; id: string }> = ({
  children,
  label,
  id,
}) => {
  return (
    <label className="relative flex flex-col mb-4" htmlFor={id}>
      <p className="font-semibold pb-1">
        {label}
        <span className="text-red-600 pl-1">*</span>
      </p>
      {children}
    </label>
  );
};

export default Label;
