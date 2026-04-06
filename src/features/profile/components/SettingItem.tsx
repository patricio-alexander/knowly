import { StyleSheet, View, Pressable, ActivityIndicator } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome6 } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Text } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";

type SettingItemProps = {
  title: string;
  onPress?: () => void;
  icon: keyof typeof FontAwesome6.glyphMap;
  rightElement?: ReactNode;
  variant?: "default" | "warning" | "success" | "danger";
  disabled?: boolean;
  isLoading?: boolean;
};

export function SettingItem({
  title,
  onPress,
  icon,
  rightElement,
  variant,
  disabled,
  isLoading,
}: SettingItemProps) {
  const color = useThemeColor();

  const variantColors = {
    default: {
      icon: color.text,
      background: color.surfaceSecondary,
      text: color.text,
    },
    warning: {
      icon: color.warning,
      background: color.surfaceWarning,
      text: color.warning,
    },
    success: {
      icon: color.success,
      background: color.surfaceSuccess,
      text: color.success,
    },
    danger: {
      icon: color.danger,
      background: color.surfaceDanger,
      text: color.danger,
    },
  };

  const v = variantColors[variant ?? "default"];

  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        if (isLoading) {
          return;
        }
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.item,
        {
          backgroundColor: color.surface,
          borderWidth: 1,
          borderColor: color.border,
        },
        {
          opacity: pressed ? 0.7 : disabled ? 0.4 : 1,
        },
      ]}
    >
      <View style={[styles.iconWrapper, { backgroundColor: v.background }]}>
        <Icon name={icon} size={14} color={v.icon} />
      </View>
      <View style={styles.info}>
        <Text type="bodySemiBold" numberOfLines={1} style={{ color: v.text }}>
          {title}
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="small" color={color.primary} />
      ) : (
        rightElement
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    gap: 2,
  },
});
