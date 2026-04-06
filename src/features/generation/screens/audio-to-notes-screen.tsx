import { Content } from "@/components/ui/Content";
import { ItemList } from "@/components/ui/DocumentItem";
import { Header } from "@/components/ui/Header";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AudioPicker from "../components/AudioPicker";
import { uploadAudio } from "../services/audio";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export default function AudioToNotesScreen() {
  const color = useThemeColor();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("key-points");

  const onPick = (uri: string) => {
    uploadAudio(uri);
    setIsOpen(true);
  };

  const OPTIONS = [
    {
      value: "key-points",
      title: "Puntos clave",
      meta: "Listado conciso de lo más importante",
      icon: "list-ul",
    },
    {
      value: "detailed-summary",
      title: "Resumen detallado",
      meta: "Explicación estructurada por temas",
      icon: "file-lines",
    },
    {
      value: "full-transcript",
      title: "Transcripción completa",
      meta: "Texto palabra por palabra",
      icon: "file-waveform",
    },
  ];

  return (
    <Content header={<Header title="Audio a apuntes" />}>
      <Text type="subheading" style={{ marginBottom: 16 }}>
        Subir audio
      </Text>
      <AudioPicker onPick={onPick} />
      <Text type="caption" style={{ marginBottom: 20 }}>
        Nota: Una vez seleccionado empezara el análisis
      </Text>

      <Modal open={isOpen}>
        <Text type="subheading">Procesando...</Text>
        <Text type="body">
          Esto puede tardar unos segundos. Puedes cerrar este mensaje
          tranquilamente.
        </Text>
        <Button style={[styles.button]} onPress={() => setIsOpen(false)}>
          <Text style={{ color: color.primary }}>Cerrar</Text>
        </Button>
      </Modal>

      <Text type="subheading" style={{ marginBottom: 16 }}>
        Configuración de resumen
      </Text>
      <View style={{ gap: 10 }}>
        {OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <ItemList
              key={option.value}
              onPress={() => setSelected(option.value)}
              LeftElement={
                <Icon
                  name={option.icon}
                  size={20}
                  color={isSelected ? color.primary : color.icon}
                />
              }
              rightElement={
                <Icon
                  name={isSelected ? "circle-dot" : "circle"}
                  size={20}
                  color={isSelected ? color.primary : color.icon}
                />
              }
              title={option.title}
              meta={option.meta}
            />
          );
        })}
      </View>
    </Content>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    alignSelf: "flex-end",
  },
});
