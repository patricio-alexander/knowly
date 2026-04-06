import React, { useState } from "react";
import {
  ScrollView,
  Pressable,
  StyleSheet,
  ViewStyle,
  View,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";

type FilterOption = {
  label: string;
  value: string;
};

interface FilterTabsProps {
  options?: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  containerStyle?: ViewStyle;
}

export const FilterTabs = ({
  options = [],
  value,
  onChange,
  containerStyle,
}: FilterTabsProps) => {
  const [selected, setSelected] = useState(value ?? options[0].value);
  const color = useThemeColor();

  const handlePress = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <View style={containerStyle}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container]}
      >
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => handlePress(option.value)}
              style={({ pressed }) => [
                styles.tab,
                {
                  backgroundColor: isSelected ? color.primary : color.surface,
                  borderColor: isSelected ? color.primary : color.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text
                type="bodySmall"
                style={{
                  color: isSelected ? "#fff" : color.text,
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
    flexDirection: "row",
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
});
