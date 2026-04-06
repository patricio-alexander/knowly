import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  BlurEvent,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";

type InputProps = {
  style?: ViewStyle;
  label?: string;
  onChangeText?: (value: string) => void;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onBlur?: (e: BlurEvent) => void;
  testID?: string | undefined;
  defaultValue?: string;
};

export function ControlInput({
  style,
  label,
  iconLeft,
  iconRight,
  placeholder,
  secureTextEntry = false,
  value,
  onBlur,
  onChangeText,
  testID,
  defaultValue,
}: InputProps) {
  const color = useThemeColor();

  return (
    <View style={[{ gap: 8 }, style]}>
      {label && <Text type="label">{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          { borderColor: color.border, backgroundColor: color.surface },
        ]}
      >
        {iconLeft}
        <TextInput
          defaultValue={defaultValue}
          testID={testID}
          onBlur={onBlur}
          value={value}
          onChangeText={onChangeText}
          keyboardType="email-address"
          style={[styles.input, { color: color.text }]}
          placeholder={placeholder}
          placeholderTextColor={color.textSecondary}
          secureTextEntry={secureTextEntry}
        />
        {iconRight}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  inputWrapper: {
    borderWidth: 1,

    borderRadius: 8,
    height: 44,
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
