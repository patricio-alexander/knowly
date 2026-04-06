import { fireEvent, render } from "@testing-library/react-native";
import PDFToQuestionsScreen from "../screens/pdf-to-questions-screen";
import { uploadPDF } from "../services/pdf";

jest.mock("@/components/ui/Icon");
jest.mock("../services/pdf.ts", () => ({
  uploadPDF: jest.fn(),
}));

jest.mock("../components/FilePicker.tsx", () => {
  const { useState } = require("react");
  const { Text, View } = require("react-native");

  return ({ onPick }: { onPick: (uri: string) => void }) => {
    const [selected, setSelected] = useState(false);

    const handlePress = () => {
      setSelected(true);
      onPick("archivo.pdf");
    };

    return (
      <View>
        <Text onPress={handlePress}>
          {selected ? "Seleccionar otro archivo" : "Subir archivo"}
        </Text>
      </View>
    );
  };
});

describe("<PDFToQuestionsScreen/>", () => {
  test("permite subir un archivo y cambia el texto del botón y el botón de 'Generar Quiz' está desactivado", () => {
    const { getByText, getByTestId } = render(<PDFToQuestionsScreen />);

    const button = getByTestId("generate-quiz-button");
    expect(button).toBeDisabled();

    fireEvent.press(getByText("Subir archivo"));

    expect(getByText("Seleccionar otro archivo")).toBeTruthy();
  });

  test("muestra el modal con opciones al presionar 'Seleccione el número de preguntas'", () => {
    const { getByText } = render(<PDFToQuestionsScreen />);

    fireEvent.press(getByText("Seleccione el número de preguntas"));

    ["5 preguntas", "10 preguntas", "15 preguntas", "20 preguntas"].forEach(
      (text) => expect(getByText(text)).toBeTruthy(),
    );
  });

  test("llama a uploadPDF al presionar 'Generar Quiz' este habilitado", () => {
    const { getByText, getByTestId } = render(<PDFToQuestionsScreen />);

    fireEvent.press(getByText("Subir archivo"));
    const button = getByTestId("generate-quiz-button");
    expect(button).toBeEnabled();

    fireEvent.press(getByText("Generar Quiz"));
    expect(uploadPDF).toHaveBeenCalledWith("archivo.pdf");
  });
});
