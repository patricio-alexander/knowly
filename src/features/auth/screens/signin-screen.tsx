import { Button } from "@/components/ui/Button";
import { Content } from "@/components/ui/Content";
import GoogleLogo from "@/components/ui/GoogleLogo";
import { Icon } from "@/components/ui/Icon";
import { Row } from "@/components/ui/Row";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { ControlInput } from "@/components/ui/Input";

type SignInForm = {
  email: string;
  password: string;
};

export default function SignInScreen() {
  const color = useThemeColor();
  const [isHidePass, setIsHidePass] = useState(true);
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (form: SignInForm) => {
    signIn(form.email, form.password);
  };
  return (
    <Content style={{ justifyContent: "center" }}>
      <View style={{ alignItems: "center", marginBottom: 40 }}>
        <Image
          source={require("assets/images/logo-app.png")}
          style={{
            height: 80,
            width: 80,
          }}
        />
        <Text type="heading">Knowly</Text>
        <Text
          type="bodySemiBold"
          style={{
            color: color.textSecondary,
          }}
        >
          Potencia tu aprendizaje hoy mismo
        </Text>
      </View>
      <View style={{ marginBottom: 40 }}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "El correo es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido",
            },
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <ControlInput
              style={{ marginBottom: 8 }}
              label="Correo electrónico"
              placeholder="nombre@ejemplo.com"
              iconLeft={<Icon name="envelope" color={color.icon} size={16} />}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
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
          name="password"
          rules={{
            required: "La contraseña es requerida",
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <ControlInput
              style={{ marginBottom: 8 }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isHidePass}
              label="Contraseña"
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
        <Text type="bodySemiBold">Iniciar Sesión</Text>
      </Button>

      <View
        style={{
          flexDirection: "row",
          gap: 8,
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Text type="body">¿No tienes una cuenta?</Text>

        <Text
          type="bodySemiBold"
          style={{ color: color.primary }}
          onPress={() => router.push("/signup")}
        >
          Regístrate gratis
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginBottom: 16,
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <View style={{ flex: 1, height: 2, backgroundColor: color.border }} />
        <Text type="caption">O CONTINUAR CON</Text>
        <View style={{ flex: 1, height: 2, backgroundColor: color.border }} />
      </View>
      <Button
        style={{
          borderRadius: 100,
          backgroundColor: "#fff",
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 12,
          alignSelf: "center",
        }}
      >
        <Row gap={12} justifyContent="center">
          <GoogleLogo />
          <Text
            style={{
              color: "#1F1F1F",
              fontFamily: "Roboto_Medium",
              fontSize: 14,
            }}
            type="bodySemiBold"
          >
            Continuar con Google
          </Text>
        </Row>
      </Button>
    </Content>
  );
}
