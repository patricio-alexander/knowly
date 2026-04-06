import { useState } from "react";
import { Alert } from "react-native";
import { Button } from "@/components/ui/Button";
import { Content } from "@/components/ui/Content";
import { ControlInput } from "@/components/ui/Input";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { Row } from "@/components/ui/Row";
import { Search } from "@/components/ui/Search";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "react-native";
import { SubjectList } from "../components/SubjectList";
import { router } from "expo-router";
import { useSubjects } from "../hooks/useSubjects";
import { useAddSubject } from "../hooks/useAddSubject";
import ColorPicker, {
  ColorFormatsObject,
  colorKit,
  HueSlider,
  Panel1,
  PreviewText,
} from "reanimated-color-picker";
import Animated, { useSharedValue } from "react-native-reanimated";
const customSwatches = new Array(6)
  .fill("#fff")
  .map(() => colorKit.randomRgbColor().hex());

export default function SubjectScreen() {
  const color = useThemeColor();
  const theme = useColorScheme() ?? "light";

  const [isOpen, setIsOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");

  const { data } = useSubjects();
  const { mutate } = useAddSubject();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSubjectName("");
  };

  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useSharedValue(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    "worklet";
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  const handleAddSubject = () => {
    const trimmedName = subjectName.trim();
    if (!trimmedName) {
      Alert.alert("Error", "El nombre de la materia no puede estar vacío.");
      return;
    }

    mutate(
      { name: trimmedName, color: resultColor },
      {
        onSuccess: () => {
          closeModal();
        },
      },
    );
  };

  return (
    <Content>
      <Modal open={isOpen} onClose={closeModal}>
        <Text type="heading" style={{ marginBottom: 16 }}>
          Nueva Materia
        </Text>
        <ControlInput
          label="Nombre de la materia"
          value={subjectName}
          onChangeText={setSubjectName}
          placeholder="Ej: Matemáticas"
        />
        <Text type="label">Color</Text>

        <ColorPicker
          value={resultColor}
          sliderThickness={15}
          thumbSize={15}
          thumbShape="circle"
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          boundedThumb
        >
          <Row style={{ marginBottom: 12 }} gap={8}>
            <Animated.View
              style={{
                height: 20,
                width: 70,
                backgroundColor: currentColor,
                borderRadius: 16,
              }}
            />
            <PreviewText
              colorFormat="hex"
              style={{ color: color.text, textAlign: "left" }}
            />
          </Row>

          <Panel1 style={{ height: 100, marginBottom: 12 }} />
          <HueSlider style={{ marginBottom: 12 }} />
        </ColorPicker>
        <Row justifyContent="space-around" style={{ marginTop: 16 }}>
          <Button onPress={handleAddSubject}>
            <Text type="bodySemiBold" style={{ color: color.primary }}>
              Guardar
            </Text>
          </Button>
          <Button onPress={closeModal}>
            <Text type="bodySemiBold">Cancelar</Text>
          </Button>
        </Row>
      </Modal>
      <Text type="heading" style={{ marginBottom: 16 }}>
        Mis Materias
      </Text>
      <Search placeholder="Buscar materias..." />
      <SubjectList
        style={{ marginTop: 16 }}
        subjects={data ?? []}
        onSubjectPress={(subject) =>
          router.push({
            pathname: "/(subject)/details/[subjectId]",
            params: {
              subjectId: subject.id,
              name: subject.name,
              totalModules: subject.modulesCount,
            },
          })
        }
      />
      <Button
        onPress={openModal}
        style={{
          backgroundColor: color.primary,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          position: "absolute",
          bottom: 40,
          right: 16,
        }}
      >
        <Icon
          name="plus"
          color={theme === "light" ? "#fff" : color.text}
          size={24}
        />
      </Button>
    </Content>
  );
}
