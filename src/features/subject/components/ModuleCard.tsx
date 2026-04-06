import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";
import { useThemeColor } from "@/hooks/useThemeColor";

type ModuleCardProps = {
  index: number;
  title: string;
  onPress?: () => void;
  onDelete?: () => void;
  testID?: string | undefined;
};

export const ModuleCard = ({
  index,
  title,
  onPress,
  testID,
}: ModuleCardProps) => {
  const color = useThemeColor();

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? color.surfacePrimary : color.surface,
          borderColor: pressed ? color.borderPrimary : color.border,
        },
      ]}
    >
      <View style={styles.content}>
        <Text type="overline" style={styles.caption}>
          MÓDULO {index}
        </Text>
        <Text type="bodySemiBold" numberOfLines={1}>
          {title}
        </Text>
      </View>

      <Icon name="chevron-right" size={16} color={color.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  indexContainer: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  caption: {
    marginBottom: 6,
  },
  deleteButton: {
    padding: 4,
  },
});
