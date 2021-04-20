import NavLink from "next/link";

const TopBar: React.VFC = () => {
  return (
    <header className="flex py-4 px-2 justify-between items-center">
      <NavLink href="/">
        <img
          className="w-36 hover:cursor-pointer"
          alt="Decent logo"
          src="/decent-logo.svg"
        />
      </NavLink>
    </header>
  );
};

export default TopBar;
