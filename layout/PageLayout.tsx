const PageLayout: React.FC<{ center?: boolean }> = ({
  children,
  center = false,
}) => {
  return (
    <div
      className={`flex flex-col px-14 pt-20 sm:pt-32 ${
        center ? "items-center" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default PageLayout;
