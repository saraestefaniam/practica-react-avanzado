import { render } from "@testing-library/react";
import LoginPage from "../login-page";
import { Provider } from "react-redux";

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
});