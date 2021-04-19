import Link from "../components/Link";
import { useUserStore } from "../store/user";

const TopBar: React.VFC = () => {
  const { user } = useUserStore();

  return (
    <header className="flex py-4 px-2 justify-between items-center">
      <img className="w-24" alt="Decent logo" src="/decent-logo.svg" />
      {user?.email ? (
        <p>
          Hello <strong>{user?.email}</strong>
        </p>
      ) : (
        <nav className="flex">
          <Link path="/sign-up" text="Sign up" />
          <Link path="/login" text="Login" />
        </nav>
      )}
    </header>
  );
};

export default TopBar;
