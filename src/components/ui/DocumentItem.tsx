import { StyleSheet, View, Pressable } from "react-native";
import { Text } from "./Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ReactNode } from "react";

type ItemListProps = {
  title: string;
  meta?: string;
  onPress?: () => void;
  rightElement?: ReactNode;
  LeftElement?: ReactNode;
  badges?: { label: string; variant?: "default" | "outline" }[];
};

export function ItemList({
  title,
  meta,
  onPress,
  rightElement,
  LeftElement,
  badges,
}: ItemListProps) {
  const colors = useThemeColor();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        },
        pressed && { opacity: 0.7 },
      ]}
    >
      {LeftElement && (
        <View
          style={[styles.iconWrapper, { backgroundColor: colors.background }]}
        >
          {LeftElement}
        </View>
      )}

      <View style={styles.info}>
        <Text type="bodySemiBold" numberOfLines={1}>
          {title}
        </Text>
        {badges && badges.length > 0 && (
          <View style={styles.badgesContainer}>
            {badges.map((badge, index) => (
              <View
                key={index}
                style={[
                  styles.badge,
                  {
                    backgroundColor: badge.variant === "outline" 
                      ? "transparent" 
                      : colors.surfacePrimary,
                    borderWidth: badge.variant === "outline" ? 1 : 0,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  type="caption"
                  style={{
                    color: badge.variant === "outline"
                      ? colors.textSecondary
                      : colors.primary,
                  }}
                >
                  {badge.label}
                </Text>
              </View>
            ))}
          </View>
        )}
        {meta && <Text type="caption">{meta}</Text>}
      </View>
      {rightElement}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
});
