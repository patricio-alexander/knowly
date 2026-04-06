import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "expo-blur";
import { ReactNode } from "react";
import {
  StyleSheet,
  useColorScheme,
  View,
  Modal as RNModal,
} from "react-native";

type ModalProps = { open: boolean; children: ReactNode; onClose?: () => void };

export function Modal({ open, children, onClose }: ModalProps) {
  const color = useThemeColor();

  const theme = useColorScheme() ?? "light";

  return (
    <RNModal
      onRequestClose={onClose}
      visible={open}
      transparent={true}
      animationType="fade"
    >
      <BlurView
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: "center", alignItems: "center" },
        ]}
        tint={theme === "light" ? "light" : "dark"}
        intensity={30}
      >
        <View
          style={{
            backgroundColor: color.background,
            width: "80%",
            borderRadius: 16,
            padding: 16,
            gap: 10,
          }}
        >
          {children}
        </View>
      </BlurView>
    </RNModal>
  );
}
