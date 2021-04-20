import { ILayout } from "../types";

const Container: React.FC<ILayout> = ({ children, background = false }) => {
  return (
    <section>
      <div className="container m-auto w-full">{children}</div>
    </section>
  );
};

export default Container;
