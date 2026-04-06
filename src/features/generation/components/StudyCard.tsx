import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome6 } from "@expo/vector-icons";
import { Icon } from "@/components/ui/Icon";

type StudyCardProps = {
  title: string;
  meta: string;
  icon: keyof typeof FontAwesome6.glyphMap;
  onPress?: () => void;
  selected?: boolean;
  testID?: string | undefined;
};

export const StudyCard = ({
  title,
  meta,
  icon,
  onPress,
  selected,
  testID,
}: StudyCardProps) => {
  const color = useThemeColor();

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed
            ? color.surfacePrimary
            : selected
              ? color.surfacePrimary
              : color.surface,
          borderColor: pressed
            ? color.borderPrimary
            : selected
              ? color.primary
              : color.border,
        },
      ]}
    >
      {({ pressed }) => (
        <>
          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor: color.background,
              },
            ]}
          >
            <Icon
              name={icon}
              size={20}
              color={
                pressed ? "#ffffff" : selected ? color.primary : color.icon
              }
            />
          </View>
          <View style={styles.info}>
            <Text type="bodySemiBold" style={{ textAlign: "center" }}>
              {title}
            </Text>
            <Text
              type="caption"
              style={{ color: color.icon, textAlign: "center" }}
            >
              {meta}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    alignItems: "center",
    gap: 2,
  },
});
