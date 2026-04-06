import { FontAwesome6 } from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";
type IconProps = {
  name: keyof typeof FontAwesome6.glyphMap;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function Icon({ name, size, color, style }: IconProps) {
  return <FontAwesome6 name={name} size={size} color={color} style={style} />;
}
