import { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Icon } from "@/components/ui/Icon";

type TabOption = {
  label: string;
  value: string;
  icon?: string;
};

type UnderlineTabsProps = {
  options: TabOption[];
  value?: string;
  onChange?: (value: string) => void;
  style?: ViewStyle;
};

export const UnderlineTabs = ({
  options,
  value,
  onChange,
  style,
}: UnderlineTabsProps) => {
  const color = useThemeColor();
  const [selected, setSelected] = useState(value ?? options[0].value);

  const handlePress = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <View
      style={[styles.container, style, { borderBottomColor: color.border }]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <Pressable
              testID={`underline-tab-${option.value}`}
              key={option.value}
              onPress={() => handlePress(option.value)}
              style={({ pressed }) => [
                styles.tab,
                {
                  borderBottomColor: isSelected ? color.primary : "transparent",
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              {option.icon && (
                <Icon
                  name={option.icon}
                  size={16}
                  color={isSelected ? color.primary : color.icon}
                />
              )}
              <Text
                type="bodySmall"
                style={{
                  color: isSelected ? color.primary : color.textSecondary,
                  fontWeight: isSelected ? "700" : "400",
                }}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  scrollContent: {
    flexDirection: "row",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 2,
  },
});
