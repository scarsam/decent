import { IPassword } from "../types";

const PasswordRequirements: React.VFC<IPassword> = ({
  minLength,
  hasNumber,
  hasLowerCase,
  hasUpperCase,
}) => {
  return (
    <>
      <p className="text-sm font-semibold">Must have:</p>
      <ul className="text-sm">
        <li className={`${minLength ? "text-green-500" : "text-red-500"}`}>
          8 characters
        </li>
        <li className={`${hasUpperCase ? "text-green-500" : "text-red-500"}`}>
          1 UPPERCASE letter
        </li>
        <li className={`${hasLowerCase ? "text-green-500" : "text-red-500"}`}>
          1 lowercase letter
        </li>
        <li className={`${hasNumber ? "text-green-500" : "text-red-500"}`}>
          1 number
        </li>
      </ul>
    </>
  );
};

export default PasswordRequirements;
