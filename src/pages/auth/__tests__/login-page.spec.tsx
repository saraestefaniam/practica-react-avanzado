import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../login-page";
import { Provider } from "react-redux";
import { authLogin } from "../../../store/actions";

vi.mock("../../../store/actions");

describe("LoginPage", () => {
  const state = {
    auth: false,
    adverts: {
      loaded: false,
      data: [],
    },
    tags: {
      loaded: false,
      data: [],
    },
    ui: {
      pending: false,
      error: null,
    },
  };

  const renderComponent = () =>
    render(
      <Provider
        store={{
          getState: () => state,
          //@ts-expect-error: suscribe
          subscribe: () => {},
          //@ts-expect-error: dispatch
          dispatch: () => {},
        }}
      >
        <LoginPage />
      </Provider>,
    );

  test("should render", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("should dispatch login", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Login");
    expect(button).toBeDisabled();

    await userEvent.type(emailInput, "sara@example.com");
    await userEvent.type(passwordInput, "1234");
    // fireEvent.change(emailInput, { target: { value: "Sara@example.com" } });
    // fireEvent.change(passwordInput, { target: { value: "1234" } });
    expect(button).toBeEnabled();

    await userEvent.click(button);
    //fireEvent.click(button)
    expect(authLogin).toHaveBeenCalledWith({
      email: "sara@example.com",
      password: "1234",
    });
  });
});