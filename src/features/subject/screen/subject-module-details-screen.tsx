import { Button } from "@/components/ui/Button";
import { Content } from "@/components/ui/Content";
import { Header } from "@/components/ui/Header";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { Row } from "@/components/ui/Row";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useDeleteModule } from "../hooks/useDeleteModule";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

export default function SubjectModuleDetails() {
  const { id, name, subjectId } = useLocalSearchParams<{
    id: string;
    subjectId: string;
    name: string;
  }>();
  const color = useThemeColor();
  const [isOpenCollapsible, setIsOpenCollapsable] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { mutate: deleteModule } = useDeleteModule();
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const handleDeleteModule = () => {
    deleteModule(Number(id), {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["modules", Number(subjectId)],
        });
        queryClient.invalidateQueries({
          queryKey: ["subjects", session?.user?.id],
        });
        setDeleteModalOpen(false);
        router.back();
      },
    });
  };

  const filesUpload = [
    { id: "1", name: "Apuntes Clase 1.pdf", size: "2.3 MB", type: "pdf" },
    { id: "2", name: "Ejercicios Resueltos.pdf", size: "1.1 MB", type: "pdf" },
    { id: "3", name: "Resumen Tema 3.pdf", size: "850 KB", type: "pdf" },
    { id: "4", name: "Grabación Clase 2.m4a", size: "15.2 MB", type: "audio" },
    { id: "5", name: "Audio Resumen.mp3", size: "8.5 MB", type: "audio" },
  ];

  const theme = useColorScheme();
  return (
    <Content
      header={
        <Header
          title="Detalles"
          rightElement={
            <Button onPress={() => setDeleteModalOpen(true)}>
              <Icon name="trash-can" color={color.danger} size={20} />
            </Button>
          }
        />
      }
    >
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Text type="bodySemiBold" style={{ marginBottom: 16 }}>
          ¿Estás seguro de que deseas eliminar este módulo?
        </Text>
        <Text type="body" style={{ marginBottom: 16 }}>
          Esta acción no se puede deshacer.
        </Text>
        <Row justifyContent="space-around">
          <Button onPress={handleDeleteModule}>
            <Text type="bodySemiBold" style={{ color: color.danger }}>
              Eliminar
            </Text>
          </Button>
          <Button onPress={() => setDeleteModalOpen(false)}>
            <Text type="bodySemiBold">Cancelar</Text>
          </Button>
        </Row>
      </Modal>
      <View
        style={[
          styles.container,
          {
            backgroundColor: color.surface,
            borderColor: color.border,
            borderWidth: 1,
            marginBottom: 16,
          },
        ]}
      >
        <Text type="heading">{name}</Text>
      </View>
      <Text type="subheading">Contenido del módulo</Text>
      <Button onPress={() => setIsOpenCollapsable(!isOpenCollapsible)}>
        <Row gap={4}>
          <Icon name="folder-open" color={color.icon} size={16} />
          <Text type="overline">ARCHIVOS SUBIDOS</Text>
          {isOpenCollapsible ? (
            <Icon name="chevron-up" color={color.icon} size={16} />
          ) : (
            <Icon name="chevron-down" color={color.icon} size={16} />
          )}
        </Row>
      </Button>
      {isOpenCollapsible && (
        <Animated.View entering={FadeIn.duration(200)}>
          <View style={[styles.filesList, { borderColor: color.border }]}>
            {filesUpload.map((file) => (
              <View
                key={file.id}
                style={[styles.fileItem, { borderBottomColor: color.border }]}
              >
                <Icon
                  name={file.type === "pdf" ? "file-pdf" : "file-waveform"}
                  size={20}
                  color={color.primary}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text type="bodySmall">{file.name}</Text>
                  <Text type="caption" style={{ color: color.textSecondary }}>
                    {file.size}
                  </Text>
                </View>
                <Icon name="download" size={18} color={color.icon} />
              </View>
            ))}
          </View>
        </Animated.View>
      )}

      <Button
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

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
  },
  button: {
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 8,
  },
  modulesList: {
    gap: 12,
  },
  filesList: {
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
  },
});
