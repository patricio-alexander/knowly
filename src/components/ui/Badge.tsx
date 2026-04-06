import { StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "./Text";
import { useThemeColor } from "@/hooks/useThemeColor";

type BadgeVariant = "primary" | "success" | "warning" | "danger" | "default";

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
};

export const Badge = ({ label, variant = "default", style }: BadgeProps) => {
  const color = useThemeColor();

  const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
    default: { bg: color.surfaceTertiary, text: color.text },
    primary: { bg: color.surfacePrimary, text: color.primary },
    success: { bg: color.surfaceSuccess, text: color.success },
    warning: { bg: color.surfaceWarning, text: color.warning },
    danger: { bg: color.surfaceDanger, text: color.danger },
  };

  const v = variantStyles[variant];

  return (
    <View style={[styles.badge, { backgroundColor: v.bg }, style]}>
      <Text type="bodySmallSemiBold" style={{ color: v.text }}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: "flex-start",
  },
});
