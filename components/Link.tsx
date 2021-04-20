import NavLink from "next/link";
import { ILink } from "../types";

const Link: React.VFC<ILink> = ({ text, path, styleAs, size }) => {
  let buttonSize;
  const isButton = styleAs === "button";

  const styles = isButton
    ? "bg-primary text-white rounded-full font-semibold tracking-wide hover:bg-primary-dark transition-colors"
    : "underline text-blue-600";

  if (isButton) {
    buttonSize =
      size === "large" && isButton
        ? "px-8 py-4 text-2xl"
        : "px-4 py-2 text-sm uppercase";
  }

  return (
    <NavLink href={path}>
      <a className={`${styles} ${buttonSize}`}>{text}</a>
    </NavLink>
  );
};

export default Link;
