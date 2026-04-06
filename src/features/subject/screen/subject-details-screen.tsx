import { Button } from "@/components/ui/Button";
import { Content } from "@/components/ui/Content";
import { Header } from "@/components/ui/Header";
import { Icon } from "@/components/ui/Icon";
import { Row } from "@/components/ui/Row";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { ModuleCard } from "../components/ModuleCard";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ControlInput } from "@/components/ui/Input";
import { useModules } from "../hooks/useModules";
import { useAddModule } from "../hooks/useAddModule";
import { useAuth } from "@/context/AuthContext";

export default function SubjectDetailsScreen() {
  const { name, subjectId } = useLocalSearchParams<{
    name: string;
    subjectId: string;
  }>();
  const [isOpen, setIsOpen] = useState(false);
  const color = useThemeColor();

  const [moduleName, setModuleName] = useState("");
  const { data } = useModules(Number(subjectId));
  const { mutate } = useAddModule(Number(subjectId));

  const handleAddModule = () => {
    const module = moduleName.trim();

    if (!module) {
      Alert.alert("Error", "El nombre del módulo no puede estar vacío.");
      return;
    }
    mutate(
      { name: moduleName },
      {
        onSuccess: () => {
          setModuleName("");
          setIsOpen(false);
        },
      },
    );
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Content header={<Header title="Detalles de la materia" />}>
      <Modal open={isOpen}>
        <Text type="bodySemiBold">Nuevo módulo</Text>
        <ControlInput label="Nombre del módulo" onChangeText={setModuleName} />

        <Row justifyContent="space-around">
          <Button onPress={handleAddModule}>
            <Text type="bodySemiBold" style={{ color: color.primary }}>
              Guardar
            </Text>
          </Button>

          <Button onPress={closeModal}>
            <Text type="bodySemiBold">Cerrar</Text>
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
      <Row justifyContent="space-between" style={{ marginBottom: 16 }}>
        <Text type="bodySemiBold">Módulos</Text>
        <Button
          onPress={openModal}
          style={[
            styles.button,
            {
              backgroundColor: color.primary,
              marginTop: 16,
            },
          ]}
        >
          <Icon name="plus" color="#fff" size={16} />
          <Text type="bodySemiBold" style={{ color: "#fff" }}>
            Agregar módulo
          </Text>
        </Button>
      </Row>
      <FlatList
        contentContainerStyle={styles.modulesList}
        data={data}
        renderItem={({ item: module, index }) => (
          <ModuleCard
            onPress={() =>
              router.push({
                pathname: "/(subject)/module/[id]",
                params: {
                  id: module.id,
                  subjectId: subjectId,
                  name: `Módulo ${index + 1}: ${module.name}`,
                },
              })
            }
            key={module.id}
            index={index + 1}
            title={module.name}
            testID={`module-${module.id}`}
          />
        )}
      />
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
});
