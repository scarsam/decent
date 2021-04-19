import NavLink from "next/link";
import { useRouter } from "next/router";
import { ILink } from "../types";

const Link: React.VFC<ILink> = ({ text, path }) => {
  const router = useRouter();

  return (
    <NavLink href={path}>
      <a
        className={`${
          router.pathname === path ? "font-semibold" : "font-normal"
        } no-underline`}
      >
        {text}
      </a>
    </NavLink>
  );
};

export default Link;
