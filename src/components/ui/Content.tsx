import { useThemeColor } from "@/hooks/useThemeColor";
import { ScrollView, View, type ViewProps } from "react-native";
import Constants from "expo-constants";
import { ReactNode } from "react";

export type ContentProps = ViewProps & {
  header?: ReactNode;
  scrollable?: boolean;
};

export function Content({
  style,
  children,
  scrollable = false,
  header,
}: ContentProps) {
  const colors = useThemeColor();

  const Wrapper = scrollable ? ScrollView : View;

  const wrapperProps = scrollable
    ? {
        showsVerticalScrollIndicator: false,
        contentContainerStyle: {
          paddingHorizontal: 16,
          paddingTop: header ? 0 : Constants.statusBarHeight + 8,
          paddingBottom: 36,
        },
      }
    : {
        style: [
          {
            paddingHorizontal: 16,
            paddingBottom: 30,
            flex: 1,
            paddingTop: header ? 0 : Constants.statusBarHeight + 8,
          },
          style,
        ],
      };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      {header && (
        <View style={{ paddingTop: Constants.statusBarHeight }}>{header}</View>
      )}

      <Wrapper {...wrapperProps}>{children}</Wrapper>
    </View>
  );
}
