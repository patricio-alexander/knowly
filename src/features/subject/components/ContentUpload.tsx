import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";

type ContentUploadProps = {
  title: string;
  icon: string;
  variant?: "warning" | "primary" | "danger" | "secondary" | "success";
  onPress?: () => void;
};

export const ContentUpload = ({
  title,
  icon,
  variant = "primary",
  onPress,
}: ContentUploadProps) => {
  const color = useThemeColor();

  const variants = {
    primary: {
      background: color.surfacePrimary,
      icon: color.primary,
    },

    success: {
      background: color.surfaceSuccess,
      icon: color.success,
    },
    warning: {
      background: color.surfaceWarning,
      icon: color.warning,
    },
    secondary: {
      background: color.surfaceSecondary,
      icon: color.secondary,
    },
    danger: {
      background: color.surfaceDanger,
      icon: color.danger,
    },
  };

  const colorsByVariant = variants[variant];

  return (
    <Button
      onPress={onPress}
      style={[
        styles.containerItemFormat,
        { backgroundColor: colorsByVariant.background },
      ]}
    >
      <View>
        <View
          style={[styles.iconContainer, { backgroundColor: color.surface }]}
        >
          <Icon name={icon} color={colorsByVariant.icon} size={25} />
        </View>
      </View>
      <Text type="bodySemiBold">{title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  containerItemFormat: {
    borderRadius: 16,
    padding: 16,
    flex: 1,
    alignItems: "center",
  },

  iconContainer: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
});
