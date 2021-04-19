const Label: React.FC<{ label: string; id: string }> = ({
  children,
  label,
  id,
}) => {
  return (
    <label className="relative flex flex-col" htmlFor={id}>
      <strong>{label}</strong>
      {children}
    </label>
  );
};

export default Label;
