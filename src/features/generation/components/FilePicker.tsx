import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { useColorScheme, View } from "react-native";

type FilePickerProps = {
  onPick: (uri: string) => void;
};

export default function FilePicker({ onPick }: FilePickerProps) {
  const color = useThemeColor();
  const theme = useColorScheme();
  const [name, setName] = useState("");

  const selectFile = () => {
    setName("archivo.pdf");
    onPick("expo://file:archivo.pdf");
  };

  return (
    <View
      style={{
        height: 180,
        backgroundColor: color.surfacePrimary,
        borderRadius: 24,
        borderStyle: "dashed",
        borderColor: color.borderPrimary,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <Icon name="file-pdf" color={color.primary} size={24} />
      {name ? (
        <Text type="bodySemiBold" style={{ marginBottom: 16 }}>
          {name}
        </Text>
      ) : (
        <>
          <Text type="caption" style={{ marginBottom: 16 }}>
            Haz click para buscar
          </Text>

          <Text type="bodySemiBold">Seleccionar PDF</Text>
        </>
      )}

      <Button
        onPress={selectFile}
        style={{
          backgroundColor: color.primary,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 100,
        }}
      >
        <Text
          type="bodySemiBold"
          style={{ color: theme === "light" ? "#fff" : color.text }}
        >
          {name ? "Seleccionar otro archivo" : "Subir archivo"}
        </Text>
      </Button>
    </View>
  );
}
