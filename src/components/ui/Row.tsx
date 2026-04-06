import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";

type FlexWrap = "wrap" | "nowrap" | "wrap-reverse";

type RowProps = {
  children?: React.ReactNode;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  gap?: number;
  wrap?: FlexWrap;
  flex?: number;
  style?: StyleProp<ViewStyle>;
};

export const Row = ({
  children,
  justifyContent = "flex-start",
  alignItems = "center",
  gap = 0,
  wrap = "wrap",
  flex,
  style,
  ...props
}: RowProps) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent,
          alignItems,
          gap,
          flexWrap: wrap ? "wrap" : "nowrap",
          ...(flex !== undefined && { flex }),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
