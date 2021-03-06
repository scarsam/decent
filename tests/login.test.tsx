import { render as r, fireEvent, waitFor } from "@testing-library/react";
import api from "../utils/api";
import Login from "../pages/login";
import { UserProviderTest } from "../store/user";
import { useRouter } from "next/router";
import { IUserContext } from "../types";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("Login", () => {
  const render = () => {
    const Store = ({ children }) => {
      const context: IUserContext = {
        user: {
          email: "",
          password: "",
        },
        updateUser: () => {},
      };

      return <UserProviderTest value={context}>{children}</UserProviderTest>;
    };

    return r(
      <Store>
        <Login />
      </Store>,
    );
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("displays the correct form", async () => {
    const { getByPlaceholderText } = render();

    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("validates the form", async () => {
    const { getByText, getByPlaceholderText } = render();

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(getByText("Email required")).toBeInTheDocument();
      expect(getByText("Please Enter your password")).toBeInTheDocument();
    });
  });

  it("submits and redirects you", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ email: "sam@ojling.com", password: "Password1" }),
    );

    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { getByText, getByPlaceholderText } = render();

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    fireEvent.change(emailInput, {
      target: { value: "sam@ojling.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "Password1" },
    });

    const button = getByText("Let me in");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("submits the form correctly", async () => {
    const formData = { email: "sam@ojling.com", password: "123456" };
    fetchMock.mockResponseOnce(JSON.stringify(formData));

    api("/login", formData).then((data) => {
      expect(data).toEqual({ email: "sam@ojling.com", password: "123456" });
    });

    expect(fetchMock.mock.calls[0][0]).toEqual("/login");
  });
});
