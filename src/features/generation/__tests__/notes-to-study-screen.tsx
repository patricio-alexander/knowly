import { act, fireEvent, render } from "@testing-library/react-native";
import NotesToStudyScreen from "../screens/notes-to-study-screen";

import { useCameraPermissions } from "expo-camera";

const mockedUseCameraPermissions = useCameraPermissions as jest.Mock;

export const mockTakePictureAsyncMock = jest
  .fn()
  .mockResolvedValue({ uri: "hello.png" });

jest.mock("expo-camera", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    CameraView: React.forwardRef((_, ref) => {
      React.useImperativeHandle(
        ref,
        () => ({
          takePictureAsync: mockTakePictureAsyncMock,
        }),
        [],
      );

      return <View />;
    }),

    useCameraPermissions: jest.fn(),
  };
});

jest.mock("@/components/ui/Icon");

describe("<NotesToStudyScreen/>", () => {
  test("cuando no acepta permisos, muestra mensaje", () => {
    mockedUseCameraPermissions.mockReturnValue([
      { granted: false },
      jest.fn().mockReturnValue({ granted: true }),
    ]);

    const { getByText, getByTestId } = render(<NotesToStudyScreen />);
    const changeMode = getByTestId("underline-tab-scan");
    fireEvent.press(changeMode);

    expect(
      getByText("Necesitamos tu permiso para digitalizar tus apuntes"),
    ).toBeTruthy();
  });

  test("al rellenar el TextArea y seleccionar el tipo de material ha generar, habilita el botón 'Generar Material'", async () => {
    mockedUseCameraPermissions.mockReturnValue([{ granted: true }, jest.fn()]);

    const { getByTestId } = render(<NotesToStudyScreen />);
    const textarea = getByTestId("text-note-textarea");
    const studyCard = getByTestId("material-mind-map");
    const buttonQuiz = getByTestId("generate-material-button");

    await act(async () => {
      fireEvent.changeText(textarea, "Mi nota de estudio");
      fireEvent.press(studyCard);
    });

    expect(buttonQuiz).toBeEnabled();
  });

  test("al tomar una foto  y seleccionar el tipo de material, habilita el botón 'Generar Material'", async () => {
    mockedUseCameraPermissions.mockReturnValue([{ granted: true }, jest.fn()]);

    const { getByTestId, queryByText } = render(<NotesToStudyScreen />);

    const changeMode = getByTestId("underline-tab-scan");

    const studyCard = getByTestId("material-mind-map");

    fireEvent.press(changeMode);
    fireEvent.press(studyCard);

    const buttonQuiz = getByTestId("generate-material-button");

    await act(async () => {
      const takePhotoButton = getByTestId("take-photo-button");
      fireEvent.press(takePhotoButton);
    });

    expect(buttonQuiz).toBeEnabled();
    fireEvent.press(buttonQuiz);

    const modalLoader = queryByText("Analizando");

    expect(modalLoader).toBeTruthy();
  });
});
