import SignInScreen from "../signin-screen";

import { fireEvent, render, waitFor } from "@testing-library/react-native";

const mockSignIn = jest.fn();

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
  }),
}));

describe("<SignInScreen />", () => {
  test("Llama a SignIn con email y password cuando el usuario presiona Iniciar Sesión", async () => {
    const { getByText, getByPlaceholderText } = render(<SignInScreen />);

    const emailInput = getByPlaceholderText("nombre@ejemplo.com");

    const passwordInput = getByPlaceholderText("••••••••");

    const signInButton = getByText("Iniciar Sesión");

    fireEvent.changeText(emailInput, "test@mail.com");

    fireEvent.changeText(passwordInput, "123456");

    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("test@mail.com", "123456");
    });
  });
});
