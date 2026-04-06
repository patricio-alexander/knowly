import { Content } from "@/components/ui/Content";
import { Header } from "@/components/ui/Header";
import { Image } from "expo-image";
import { ActivityIndicator, View } from "react-native";
import { useProfile } from "../hooks/useProfile";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ControlInput } from "@/components/ui/Input";
import { SettingItem } from "../components/SettingItem";
import { Text } from "@/components/ui/Text";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { Modal } from "@/components/ui/Modal";

export default function AccountSettingsScreen() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const { data } = useProfile(userId);
  const { mutate, isPending } = useUpdateProfile(userId);
  const color = useThemeColor();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      speciality: "",
    },
  });

  const onSubmit = (data: { username: string; speciality: string }) => {
    mutate({ username: data.username, speciality: data.speciality });
  };

  useEffect(() => {
    if (data) {
      reset({
        username: data.username,
        speciality: data.speciality,
      });
    }
  }, [data]);

  return (
    <Content
      header={
        <Header
          title="Ajustes de cuenta"
          rightElement={
            <>
              {isDirty && (
                <Button onPress={handleSubmit(onSubmit)} style={{ padding: 0 }}>
                  <Icon name="check" size={20} color={color.primary} />
                </Button>
              )}
            </>
          }
        />
      }
    >
      <Modal open={isPending}>
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator color={color.primary} size="small" />
          <Text type="bodySemiBold">Guardando...</Text>
        </View>
      </Modal>
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
        <Button style={{ position: "absolute", bottom: 0, right: 0 }}>
          <Icon
            name="pencil"
            color={color.text}
            size={15}
            style={{
              backgroundColor: color.primary,
              padding: 7,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: color.text,
            }}
          />
        </Button>
      </View>
      <View style={{ marginBottom: 20, gap: 16 }}>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field: { onBlur, onChange, value } }) => (
            <ControlInput
              label="Nombre completo"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          name="speciality"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <ControlInput
              label="Especialidad"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </View>

      <View style={{ marginBottom: 20, gap: 8 }}>
        <Text type="overline">SEGURIDAD</Text>
        <SettingItem
          icon="key"
          title="Cambiar contraseña"
          rightElement={
            <Icon name="chevron-right" size={14} color={color.icon} />
          }
        />
      </View>
      <View style={{ marginBottom: 16, gap: 8 }}>
        <Text type="overline">OTROS</Text>
        <SettingItem variant="danger" icon="trash-can" title="Borrar cuenta" />
      </View>
    </Content>
  );
}
