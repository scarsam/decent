import { render as r, fireEvent, waitFor } from "@testing-library/react";
import api from "../utils/api";
import Signup from "../pages/sign-up";
import { UserProviderTest } from "../store/user";
import { useRouter } from "next/router";
import { IUserContext } from "../types";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("Sign Up", () => {
  let mockRouter;

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
        <Signup />
      </Store>,
    );
  };

  beforeEach(() => {
    fetchMock.resetMocks();
    mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("displays the correct form", async () => {
    const { getByPlaceholderText, getByText } = render();

    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByText("1 UPPERCASE letter")).toBeInTheDocument();
  });

  it("validates the form", async () => {
    const { getByText, getByPlaceholderText } = render();

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(getByText("Email required")).toBeInTheDocument();
      expect(getByText("Between 8 - 30 characters")).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, {
      target: { value: "123" },
    });
    fireEvent.change(emailInput, {
      target: { value: "sam@" },
    });

    await waitFor(() => {
      expect(getByText("Between 8 - 30 characters")).toBeInTheDocument();
      expect(getByText("email must be a valid email")).toBeInTheDocument();
    });
  });

  it("submits the data", async () => {
    const { getByText, getByPlaceholderText } = render();

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    fireEvent.change(emailInput, {
      target: { value: "sam@ojling.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "Password123" },
    });

    const button = getByText("Create my account");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchMock.mock.calls[0][0]).toEqual("/sign-up");
    });
  });

  it("submits the form correctly", async () => {
    const formData = {
      email: "test@test.com",
      password: "Password12345",
    };

    fetchMock.mockResponseOnce(JSON.stringify(formData));

    api("/sign-up", formData).then((data) => {
      expect(data).toEqual({
        email: "test@test.com",
        password: "Password12345",
      });
    });
  });
});
