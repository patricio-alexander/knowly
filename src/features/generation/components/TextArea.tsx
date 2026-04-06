import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type TextAreaProps = {
  onChange?: (val: string) => void;
  value?: string;
};

export const TextArea = ({ onChange, value }: TextAreaProps) => {
  const [focused, setFocused] = useState(false);
  const color = useThemeColor();

  return (
    <View
      style={[
        styles.constainer,
        {
          borderColor: focused ? color.borderPrimary : color.border,

          backgroundColor: color.surface,
        },
      ]}
    >
      <TextInput
        testID="text-note-textarea"
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        multiline
        placeholder="Escribe o pega aquí tus apuntes de clase, fragmentos de libros o notas rápidas..."
        placeholderTextColor={color.icon}
        style={[
          styles.input,
          {
            color: color.text,
          },
        ]}
      />
      <View
        style={[
          styles.bottom,
          {
            borderTopColor: color.borderPrimary,
            backgroundColor: color.surfaceTertiary,
          },
        ]}
      >
        <Text type="caption" style={{ color: color.textSecondary }}>
          Sugerencia: Divide tus notas por temas para mejores resultados.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 16,
  },
  input: {
    textAlignVertical: "top",
    padding: 16,
    minHeight: 280,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
});
