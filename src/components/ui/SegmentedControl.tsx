import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Text } from "./Text";
import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type SegmentedControlProps = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
};

export const SegmentedControl = ({
  options,
  value,
  onChange,
}: SegmentedControlProps) => {
  const color = useThemeColor();
  const theme = useColorScheme();

  const [selected, setSelected] = useState(value ?? options[0].value);

  const handlePress = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color.surface, borderColor: color.border },
      ]}
    >
      {options.map((option, i) => {
        const isSelected = selected === option.value;
        return (
          <Button
            onPress={() => handlePress(option.value)}
            key={i}
            style={[
              styles.option,
              isSelected && {
                backgroundColor: color.primary,
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
          </Button>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
    gap: 4,
  },
  option: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
