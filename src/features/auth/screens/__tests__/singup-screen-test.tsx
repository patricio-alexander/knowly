import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import SignUpScreen from "../signup-screen";

const mockSignUp = jest.fn();

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    signUp: mockSignUp,
  }),
}));

describe("<SignUpScreen/>", () => {
  test("Llama a signup al completar los campos para crear una cuenta", async () => {
    const { getByPlaceholderText, getAllByPlaceholderText, getByText } = render(
      <SignUpScreen />,
    );

    const emailInput = getByPlaceholderText("nombre@ejemplo.com");
    const usernameInput = getByPlaceholderText("Juan Pérez");
    const [passwordInput, confirmPasswordInput] =
      getAllByPlaceholderText("••••••••");
    const submitButton = getByText("Crear cuenta");

    await act(async () => {
      fireEvent.changeText(emailInput, "test@mail.com");
      fireEvent.changeText(usernameInput, "Pedro");
      fireEvent.changeText(passwordInput, "Password1");
      fireEvent.changeText(confirmPasswordInput, "Password1");
      fireEvent.press(submitButton);
    });

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        "test@mail.com",
        "Pedro",
        "Password1",
      );
    });
  });
});
