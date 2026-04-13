import { StyleSheet, Text as RNText, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  type?:
    | "display"
    | "heading"
    | "subheading"
    | "body"
    | "bodySemiBold"
    | "bodySmall"
    | "bodySmallSemiBold"
    | "label"
    | "caption"
    | "overline"
    | "link"
    | "muted"
    | "mutedSemibold";
};

export function Text({ style, type = "body", ...rest }: ThemedTextProps) {
  const colors = useThemeColor();

  return (
    <RNText
      style={[
        { color: colors.text },
        type === "muted" || type == "caption" || type === "mutedSemibold"
          ? { color: colors.textSecondary }
          : undefined,
        type === "link" ? { color: colors.primary } : undefined,
        type === "display" ? styles.display : undefined,
        type === "heading" ? styles.heading : undefined,
        type === "subheading" ? styles.subheading : undefined,
        type === "body" ? styles.body : undefined,
        type === "bodySemiBold" ? styles.bodySemiBold : undefined,
        type === "bodySmall" ? styles.bodySmall : undefined,
        type === "bodySmallSemiBold" ? styles.bodySmallSemiBold : undefined,
        type === "label" ? styles.label : undefined,
        type === "caption" ? styles.caption : undefined,
        type === "overline" ? styles.overline : undefined,
        type === "link" ? styles.link : undefined,
        type === "muted" ? styles.muted : undefined,
        type === "mutedSemibold" ? styles.mutedSemibold : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  display: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "800",
    fontFamily: "Inter_800ExtraBold",
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
    fontFamily: "Inter_700Bold",
  },
  subheading: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "Inter_700Bold",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
  },
  bodySemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_600SemiBold",
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Inter_400Regular",
  },
  bodySmallSemiBold: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Inter_600SemiBold",
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "Inter_600SemiBold",
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Inter_400Regular",
  },
  overline: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Inter_600SemiBold",
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_500Medium",
    textDecorationLine: "underline",
  },
  muted: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
  },
  mutedSemibold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_600SemiBold",
  },
});
