import { Content } from "@/components/ui/Content";
import { Header } from "@/components/ui/Header";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { UnderlineTabs } from "../components/UnderlineTabs";
import { Icon } from "@/components/ui/Icon";
import { useRef, useState } from "react";
import { useColorScheme, View } from "react-native";
import { StudyCard } from "../components/StudyCard";
import { Button } from "@/components/ui/Button";
import { Row } from "@/components/ui/Row";
import { TextArea } from "../components/TextArea";

import { CameraView, useCameraPermissions } from "expo-camera";
import { BlurView } from "expo-blur";

import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Modal } from "@/components/ui/Modal";

export default function NotesToStudyScreen() {
  const color = useThemeColor();
  const theme = useColorScheme();

  const [permission, requestPermission] = useCameraPermissions();
  const [note, setNote] = useState("");

  const [torch, setTorch] = useState(false);

  const [selected, setSelected] = useState("paste");
  const [image, setImage] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const camerRef = useRef<CameraView | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const takePhoto = async () => {
    const x = await camerRef.current?.takePictureAsync();
    setImage(x?.uri);
  };

  const generateMaterial = () => {
    setIsOpen(true);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const OPTIONS = [
    {
      label: "Pegar texto",
      value: "paste",
      icon: "paste",
    },
    {
      label: "Escanear imagen",
      value: "scan",
      icon: "camera",
    },
  ];

  const MATERIAL_TYPE = [
    {
      value: "flashcards",
      title: "Flashcards",
      meta: "Repaso activo",
      icon: "clone",
    },
    {
      value: "mind-map",
      title: "Mapa mental",
      meta: "Conexión visual",
      icon: "diagram-project",
    },
    {
      value: "outline",
      title: "Esquema",
      meta: "Jerarquía clara",
      icon: "sitemap",
    },
  ];

  const disabled =
    selected === "paste"
      ? !note || !selectedMaterial
      : !image || !selectedMaterial;

  return (
    <Content header={<Header title="Apuntes a material" />} scrollable>
      <Text type="subheading">Transforma tus notas</Text>
      <Text type="body" style={{ color: color.textSecondary }}>
        Pega tus apuntes o escanea una foto de tu cuaderno para empezar.
      </Text>
      <UnderlineTabs
        style={{ marginBottom: 16 }}
        options={OPTIONS}
        onChange={(val) => setSelected(val)}
      />
      {selected === "paste" ? (
        <TextArea onChange={(value) => setNote(value)} value={note} />
      ) : !permission?.granted ? (
        <View
          style={{
            height: 250,
            backgroundColor: color.surfacePrimary,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Icon name="lock" size={20} color={color.primary} />
          <Text type="subheading">Permitir acceso a la cámara</Text>
          <Text type="body" style={{ textAlign: "center", marginBottom: 16 }}>
            Necesitamos tu permiso para digitalizar tus apuntes
          </Text>
          <Button
            testID="request-permissions-camera-button"
            style={{
              backgroundColor: color.primary,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 16,
            }}
            onPress={requestPermission}
          >
            <Text
              style={{ color: theme === "light" ? "#fff" : color.text }}
              type="bodySemiBold"
            >
              Permitir acceso
            </Text>
          </Button>
        </View>
      ) : (
        <View
          style={{
            height: 500,
            marginBottom: 16,
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: color.surface,
          }}
        >
          {!image ? (
            <>
              <CameraView
                ref={camerRef}
                style={{ flex: 1, borderRadius: 16 }}
                facing="back"
                enableTorch={torch}
              />
              <Row
                style={{ position: "absolute", width: "100%", bottom: 20 }}
                justifyContent="space-around"
                gap={10}
              >
                <Button style={{ alignItems: "center" }} onPress={pickImage}>
                  <BlurView
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 8,
                      overflow: "hidden",
                    }}
                  >
                    <Icon name="images" color="#fff" size={20} />
                  </BlurView>

                  <Text type="bodySmallSemiBold">GALERÍA</Text>
                </Button>
                <Button testID="take-photo-button" onPress={takePhoto}>
                  <Icon name="circle-dot" color="#fff" size={70} />
                </Button>

                <Button
                  style={{ alignItems: "center" }}
                  onPress={() => setTorch(!torch)}
                >
                  <BlurView
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 8,
                      overflow: "hidden",
                    }}
                  >
                    <Icon name="bolt" color="#fff" size={20} />
                  </BlurView>
                  <Text type="bodySmallSemiBold">FLASH</Text>
                </Button>
              </Row>
            </>
          ) : (
            <Image source={image} testID="foto-note" />
          )}
        </View>
      )}

      <Text type="bodySemiBold" style={{ marginBottom: 16 }}>
        ¿Qué deseas generar?
      </Text>
      <View style={{ gap: 10, marginBottom: 16 }}>
        {MATERIAL_TYPE.map((material, key) => {
          const isSelected = material.value === selectedMaterial;
          return (
            <StudyCard
              testID={`material-${material.value}`}
              selected={isSelected}
              onPress={() => setSelectedMaterial(material.value)}
              key={key}
              title={material.title}
              meta={material.meta}
              icon={material.icon}
            />
          );
        })}
      </View>
      <Button
        testID="generate-material-button"
        disabled={disabled}
        onPress={() => generateMaterial()}
        style={{
          backgroundColor: color.primary,
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row gap={8}>
          <Text
            type="bodySemiBold"
            style={{ color: theme === "light" ? "#fff" : color.text }}
          >
            Generar material
          </Text>
          <Icon
            name="wand-magic-sparkles"
            size={16}
            color={theme === "light" ? "#fff" : color.text}
          />
        </Row>
      </Button>
      <Modal open={isOpen}>
        <Text type="subheading">Analizando</Text>
        <Text type="body">
          Esto puede tardar unos segundos, puede cerrar este mensaje
        </Text>
      </Modal>
    </Content>
  );
}
