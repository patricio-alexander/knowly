import React from "react";

import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  testID?: string | undefined;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

export const Button = ({
  children,
  style,
  onPress,
  disabled,
  testID,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : disabled ? 0.4 : 1 },
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
};
