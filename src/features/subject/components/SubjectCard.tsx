import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";

type SubjectCardProps = {
  name: string;
  color: string;
  modulesCount?: number;
  onPress?: () => void;
  testID?: string | undefined;
};

export const SubjectCard = ({
  name,
  color,
  modulesCount = 0,
  onPress,
  testID,
}: SubjectCardProps) => {
  const themeColor = useThemeColor();

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed
            ? themeColor.surfacePrimary
            : themeColor.surface,
          borderColor: pressed ? themeColor.borderPrimary : themeColor.border,
        },
      ]}
    >
      <View style={[styles.colorIndicator, { backgroundColor: color }]} />
      <View style={styles.info}>
        <Text type="bodySemiBold" numberOfLines={2}>
          {name}
        </Text>
        <Text type="caption" style={{ color: themeColor.textSecondary }}>
          {modulesCount} {modulesCount === 1 ? "módulo" : "módulos"}
        </Text>
      </View>
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
  colorIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
  },
  info: {
    flex: 1,
  },
});

