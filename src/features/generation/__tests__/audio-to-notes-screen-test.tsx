import { fireEvent, render } from "@testing-library/react-native";
import AudioToNotesScreen from "../screens/audio-to-notes-screen";
import { uploadAudio } from "../services/audio";
jest.mock("@/components/ui/Icon");

jest.mock("../services/audio.ts", () => ({
  uploadAudio: jest.fn(),
}));

jest.mock("../components/AudioPicker.tsx", () => {
  const { Text } = require("react-native");
  return ({ onPick }: { onPick: (uri: string) => void }) => (
    <Text onPress={() => onPick("audio.mp3")}>Subir archivo de audio</Text>
  );
});

describe("<AudioToNotesScreen/>", () => {
  test("al presionar 'Subir archivo', muestra modal y llama a uploadAudio con uri correcta", () => {
    const { getByText, queryByText } = render(<AudioToNotesScreen />);

    expect(queryByText("Procesando...")).toBeNull();
    fireEvent.press(getByText("Subir archivo de audio"));

    expect(queryByText("Procesando...")).toBeTruthy();
    expect(uploadAudio).toHaveBeenCalledWith("audio.mp3");
  });
});
