import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Icon } from "./Icon";
import { useThemeColor } from "@/hooks/useThemeColor";

type SearchProps = TextInputProps & {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  containerStyle?: ViewStyle;
};

export const Search = ({
  onSearch,
  onClear,
  onChangeText,
  containerStyle,
  placeholder = "Buscar...",
  ...props
}: SearchProps) => {
  const color = useThemeColor();
  const [value, setValue] = useState("");

  const handleChange = (text: string) => {
    setValue(text);
    onChangeText?.(text);
  };

  const handleClear = () => {
    setValue("");
    onChangeText?.("");
    onClear?.();
  };

  const handleSubmit = () => {
    onSearch?.(value);
  };

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {
          backgroundColor: color.surface,
        },
      ]}
    >
      {/* Search Icon */}
      <View style={styles.iconLeft}>
        <View style={iconStyles.wrapper}>
          <Icon name="magnifying-glass" color={color.icon} />
        </View>
      </View>

      <TextInput
        style={[styles.input, { color: color.text }]}
        value={value}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        placeholder={placeholder}
        placeholderTextColor={color.icon}
        returnKeyType="search"
        clearButtonMode="never"
        {...props}
      />

      {/* Clear button */}
      {value.length > 0 && (
        <Pressable
          onPress={handleClear}
          style={({ pressed }) => [
            styles.iconRight,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          hitSlop={8}
        >
          <View style={iconStyles.cleanWrapper}>
            <Icon name="xmark" color={color.icon} />
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
    marginHorizontal: 8,
  },
  iconLeft: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconRight: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

const iconStyles = StyleSheet.create({
  wrapper: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cleanWrapper: {
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
