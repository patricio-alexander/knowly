import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { useThemeColor } from "@/hooks/useThemeColor";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
};

export function Header({
  title,
  showBack = true,
  onBack,
  rightElement,
}: HeaderProps) {
  const color = useThemeColor();
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color.background,
          borderBottomColor: color.border,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Left */}
        <View style={styles.side}>
          {showBack && (
            <Pressable
              onPress={handleBack}
              hitSlop={10}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Icon name="chevron-left" color={color.text} size={18} />
            </Pressable>
          )}
        </View>

        {/* Center */}
        <View style={styles.center}>
          {title && (
            <Text
              type="bodySemiBold"
              numberOfLines={1}
              style={{ fontSize: 18 }}
            >
              {title}
            </Text>
          )}
        </View>

        {/* Right */}
        <View style={[styles.side, styles.sideRight]}>{rightElement}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
  },
  side: {
    width: 40,
    justifyContent: "center",
  },
  sideRight: {
    alignItems: "flex-end",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
});
