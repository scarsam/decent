import { render as r, fireEvent, waitFor } from "@testing-library/react";
import api from "../utils/api";
import Dashboard from "../pages/dashboard";
import { UserProviderTest } from "../store/user";
import { useRouter } from "next/router";
import { IUserContext } from "../types";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("Dashboard", () => {
  let mockRouter;

  const render = (id = "") => {
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
        <Dashboard />
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
    const { getByLabelText } = render("1");

    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
  });

  it("validates the form", async () => {
    const { getByText, getByPlaceholderText } = render("1");

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(getByText("Password required")).toBeInTheDocument();
      expect(getByText("Email required")).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, {
      target: { value: "123" },
    });
    fireEvent.change(emailInput, {
      target: { value: "sam@" },
    });

    await waitFor(() => {
      expect(
        getByText("password must be at least 6 characters"),
      ).toBeInTheDocument();
      expect(getByText("email must be a valid email")).toBeInTheDocument();
    });
  });

  it("submits the data", async () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render("5");

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    fireEvent.change(emailInput, {
      target: { value: "sam@ojling.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    const button = getByText("Save");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchMock.mock.calls[0][0]).toEqual("/api/update/5");
    });
  });

  it("submits the form correctly", async () => {
    const formData = {
      id: "5",
      email: "test@test.com",
      password: "123456",
    };

    fetchMock.mockResponseOnce(JSON.stringify(formData));

    api("/update/5", formData).then((data) => {
      expect(data).toEqual({
        id: "5",
        email: "test@test.com",
        password: "123456",
      });
    });
  });
});
