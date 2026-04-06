import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { useColorScheme, View } from "react-native";

type AudioPickerProps = {
  onPick: (uri: string) => void;
};

export default function AudioPicker({ onPick }: AudioPickerProps) {
  const color = useThemeColor();
  const theme = useColorScheme();

  const selectAudio = () => {
    onPick("uri");
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
        marginBottom: 8,
      }}
    >
      <Icon name="cloud-arrow-up" color={color.primary} size={24} />
      <Text type="bodySemiBold">Sube tu archivo de audio</Text>
      <Text type="caption" style={{ marginBottom: 16 }}>
        Haz click para buscar
      </Text>
      <Button
        onPress={selectAudio}
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
          Subir archivo de audio
        </Text>
      </Button>
    </View>
  );
}
