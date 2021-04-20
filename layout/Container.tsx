import { ILayout } from "../types";

const Container: React.FC<ILayout> = ({ children, height = false }) => {
  return (
    <section className={`${height ? "flex-grow" : ""}`}>
      <div className="container m-auto w-full">{children}</div>
    </section>
  );
};

export default Container;
