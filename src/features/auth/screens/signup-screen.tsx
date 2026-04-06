import { Button } from "@/components/ui/Button";
import { Content } from "@/components/ui/Content";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { ControlInput } from "@/components/ui/Input";

type SignUpForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpScreen() {
  const color = useThemeColor();
  const [isHidePass, setIsHidePass] = useState(true);
  const [isHideConfirmPass, setIsHideConfirmPass] = useState(true);
  const { signUp } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = watch("password");

  const onSubmit = async (form: SignUpForm) =>
    signUp(form.email, form.username, form.password);

  return (
    <Content style={{ justifyContent: "center" }}>
      <View style={{ alignItems: "center", marginBottom: 40 }}>
        <Image
          source={require("assets/images/logo-app.png")}
          style={{ height: 80, width: 80 }}
        />
        <Text type="heading">Knowly</Text>
        <Text type="bodySemiBold" style={{ color: color.textSecondary }}>
          Crea tu cuenta y empieza a aprender
        </Text>
      </View>

      <View style={{ marginBottom: 40 }}>
        <Controller
          control={control}
          name="username"
          rules={{
            required: "El nombre es requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <ControlInput
              testID="email-input"
              value={value}
              onBlur={onBlur}
              label="Nombre completo"
              placeholder="Juan Pérez"
              style={{ marginBottom: 8 }}
              onChangeText={onChange}
              iconLeft={<Icon name="user" color={color.icon} size={16} />}
            />
          )}
        />

        {errors.username && (
          <Text
            type="caption"
            style={{ color: color.danger, marginBottom: 16 }}
          >
            {errors.username.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: "El correo es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido",
            },
          }}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <ControlInput
              testID="email"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={{ marginBottom: 8 }}
              label="Correo electrónico"
              placeholder="nombre@ejemplo.com"
              iconLeft={<Icon name="envelope" color={color.icon} size={16} />}
            />
          )}
        />
        {errors.email && (
          <Text
            type="caption"
            style={{ color: color.danger, marginBottom: 16 }}
          >
            {errors.email.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: "La contraseña es requerida",
            minLength: { value: 8, message: "Mínimo 8 caracteres" },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).+$/,
              message: "Debe incluir al menos una mayúscula y un número",
            },
          }}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <ControlInput
              testID="password"
              style={{ marginBottom: 8 }}
              secureTextEntry={isHidePass}
              onBlur={onBlur}
              onChangeText={onChange}
              label="Contraseña"
              value={value}
              placeholder="••••••••"
              iconLeft={<Icon name="lock" color={color.icon} size={16} />}
              iconRight={
                <Button onPress={() => setIsHidePass(!isHidePass)}>
                  <Icon
                    name={isHidePass ? "eye" : "eye-slash"}
                    color={color.icon}
                    size={16}
                  />
                </Button>
              }
            />
          )}
        />
        {errors.password && (
          <Text
            type="caption"
            style={{ color: color.danger, marginBottom: 16 }}
          >
            {errors.password.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: "Confirma tu contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          }}
          name="confirmPassword"
          render={({ field: { value, onChange, onBlur } }) => (
            <ControlInput
              testID="confirm-password"
              onBlur={onBlur}
              onChangeText={onChange}
              style={{ marginBottom: 8 }}
              value={value}
              secureTextEntry={isHideConfirmPass}
              label="Confirmar contraseña"
              placeholder="••••••••"
              iconLeft={<Icon name="lock" color={color.icon} size={16} />}
              iconRight={
                <Button
                  onPress={() => setIsHideConfirmPass(!isHideConfirmPass)}
                >
                  <Icon
                    name={isHideConfirmPass ? "eye" : "eye-slash"}
                    color={color.icon}
                    size={16}
                  />
                </Button>
              }
            />
          )}
        />
        {errors.confirmPassword && (
          <Text
            type="caption"
            style={{ color: color.danger, marginBottom: 12 }}
          >
            {errors.confirmPassword.message}
          </Text>
        )}
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: color.primary,
          borderRadius: 16,
          paddingVertical: 10,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text type="bodySemiBold">Crear cuenta</Text>
      </Button>

      <View
        style={{
          flexDirection: "row",
          gap: 8,
          justifyContent: "center",
        }}
      >
        <Text type="body">¿Ya tienes una cuenta?</Text>
        <Text
          type="bodySemiBold"
          style={{ color: color.primary }}
          onPress={() => router.back()}
        >
          Inicia sesión
        </Text>
      </View>
    </Content>
  );
}
