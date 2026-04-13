import { Content } from "@/components/ui/Content";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";

import { Image } from "expo-image";
import { useState } from "react";
import { Alert, View } from "react-native";
import { useProfile } from "../hooks/useProfile";
import { router } from "expo-router";
import { SettingItem } from "../components/SettingItem";

export default function ProfileScreen() {
  const color = useThemeColor();
  const [isSignOut, setIsSignOut] = useState(false);
  const { signOut, session } = useAuth();
  const userId = session?.user?.id;
  const { data } = useProfile(userId);

  return (
    <Content>
      <Text type="heading">Perfil</Text>
      <View
        style={{
          height: 100,
          width: 100,
          alignSelf: "center",
          marginBottom: 16,
        }}
      >
        <Image
          source={data?.avatar_url}
          style={{
            borderRadius: 100,
            borderWidth: 3,
            borderColor: color.text,
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          marginBottom: 20,
          gap: 6,
        }}
      >
        <Text type="subheading">{data?.username}</Text>
        <Text type="label" style={{ color: color.primary }}>
          {data?.speciality ?? "Ninguna"}
        </Text>
        {/* <Text type="caption">Estudiante de 3er año</Text> */}
      </View>
      <View style={{ gap: 12 }}>
        <SettingItem
          onPress={() => router.push("./account-settings")}
          title="Ajustes de cuenta"
          icon="user-large"
          rightElement={
            <Icon name="chevron-right" size={14} color={color.icon} />
          }
        />
        {/* <SettingItem */}
        {/*   title="Ayuda y soporte" */}
        {/*   icon="circle-question" */}
        {/*   rightElement={ */}
        {/*     <Icon name="chevron-right" size={14} color={color.icon} /> */}
        {/*   } */}
        {/* /> */}
        <SettingItem
          isLoading={isSignOut}
          onPress={async () => {
            setIsSignOut(true);
            const { success, error } = await signOut();
            if (!success) {
              setIsSignOut(false);
              Alert.alert(
                "Sesión",
                error?.message ?? "Ocurrió un error inesperado",
              );
            }
            setIsSignOut(false);
          }}
          title="Cerrar Session"
          icon="right-from-bracket"
          variant="danger"
        />
      </View>
    </Content>
  );
}
