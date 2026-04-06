import { Button } from "@/components/ui/Button";
import { Content } from "@/components/ui/Content";
import { Header } from "@/components/ui/Header";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Dimensions, StyleSheet, View } from "react-native";
import FilePicker from "../components/FilePicker";
const { width, height } = Dimensions.get("window");

import { ItemList } from "@/components/ui/DocumentItem";
import { useState } from "react";

import { Modal } from "@/components/ui/Modal";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { uploadPDF } from "../services/pdf";

export default function PDFToQuestionsScreen() {
  const color = useThemeColor();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [selectedTypeQuestion, setSelectedTypeQuestion] =
    useState("option_multiple");

  const [selected, setSelected] = useState(0);
  const onPick = (uri: string) => {
    setFile(uri);
  };

  const generateQuiz = () => {
    uploadPDF(file);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: number) => {
    setOpen(false);
    setSelected(value);
  };

  const OPTIONS_QUESTIONS = [
    { value: 5, title: "5 preguntas", meta: "Repaso rápido" },
    { value: 10, title: "10 preguntas", meta: "Práctica estándar" },
    { value: 15, title: "15 preguntas", meta: "Evaluación completa" },
    { value: 20, title: "20 preguntas", meta: "Examen exhaustivo" },
  ];

  const OPTIONS_TYPES_QUESTIONS = [
    {
      value: "option_multiple",
      title: "opción múltiple",
      meta: "4 opciones por pregunta",
      icon: "list-check",
    },
    {
      value: "development",
      title: "desarrollo",
      meta: "preguntas abiertas",
      icon: "brain",
    },
  ];

  return (
    <>
      <Content header={<Header title="PDF a preguntas" />} scrollable={true}>
        <Text type="subheading" style={{ marginBottom: 16 }}>
          Cargar Archivo
        </Text>
        <FilePicker onPick={onPick} />

        <Text type="subheading" style={{ marginBottom: 16 }}>
          Configuración del Quiz
        </Text>
        <View style={{ marginBottom: 16 }}>
          <Text type="bodySemiBold" style={{ marginBottom: 6 }}>
            Número de preguntas
          </Text>
          <Button
            style={[
              styles.questionButton,
              { borderWidth: 1, borderColor: color.border, borderRadius: 16 },
            ]}
            onPress={() => {
              handleOpen();
            }}
          >
            <Text type="body">
              {OPTIONS_QUESTIONS.find((o) => o.value === selected)?.title ??
                "Seleccione el número de preguntas"}
            </Text>
            <Icon name="chevron-down" color={color.icon} />
          </Button>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text type="bodySemiBold" style={{ marginBottom: 6 }}>
            Nivel de dificultad
          </Text>

          <SegmentedControl
            options={[
              { label: "Fácil", value: "easy" },
              { label: "Medio", value: "medium" },
              { label: "Difícil", value: "hard" },
            ]}
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text type="bodySemiBold" style={{ marginBottom: 6 }}>
            Tipo de preguntas
          </Text>
          <View style={{ gap: 10 }}>
            {OPTIONS_TYPES_QUESTIONS.map((option, index) => {
              const isSelected = option.value === selectedTypeQuestion;
              return (
                <ItemList
                  onPress={() => setSelectedTypeQuestion(option.value)}
                  key={index}
                  title={option.title}
                  meta={option.meta}
                  LeftElement={
                    <Icon
                      name={option.icon}
                      size={20}
                      color={isSelected ? color.primary : color.icon}
                    />
                  }
                />
              );
            })}
          </View>
        </View>
        <Button
          testID="generate-quiz-button"
          disabled={!file}
          onPress={generateQuiz}
          style={{
            backgroundColor: color.primary,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text type="bodySemiBold">Generar Quiz</Text>
        </Button>
      </Content>

      <Modal open={open} onClose={() => setOpen(!open)}>
        {OPTIONS_QUESTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <ItemList
              key={option.value}
              onPress={() => {
                handleClose(option.value);
              }}
              LeftElement={
                <Icon
                  name="circle-question"
                  size={18}
                  color={isSelected ? color.primary : color.icon}
                />
              }
              rightElement={
                <Icon
                  name={isSelected ? "circle-dot" : "circle"}
                  size={18}
                  color={isSelected ? color.primary : color.icon}
                />
              }
              title={option.title}
              meta={option.meta}
            />
          );
        })}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  questionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerPickerQuestion: {
    position: "absolute",
    width,
    height,
  },
});
