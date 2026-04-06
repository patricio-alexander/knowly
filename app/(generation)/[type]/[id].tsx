import AudioNotesDetailsScreen from "@/features/generation/screens/audio-notes-details-screen";
import PDFQuestionsDetailsScreen from "@/features/generation/screens/pdf-questions-details-screen";
import { useLocalSearchParams } from "expo-router";

type FileTypes = "audio" | "pdf";

export default function DetailsScreen() {
  const { type, id } = useLocalSearchParams<{ type: FileTypes; id: string }>();

  if (type === "audio") {
    return <AudioNotesDetailsScreen id={id} />;
  }

  if (type === "pdf") {
    return <PDFQuestionsDetailsScreen id={id} />;
  }
}
