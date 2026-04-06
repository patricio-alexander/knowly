import { Text } from "@/components/ui/Text";
import { Content } from "@/components/ui/Content";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Icon } from "@/components/ui/Icon";
import { ItemList } from "@/components/ui/DocumentItem";
import { Row } from "@/components/ui/Row";
import { Button } from "@/components/ui/Button";
import { router } from "expo-router";

const documents = [
  {
    id: "1",
    title: "Biología Celular - Mitosis.pdf",
    meta: "Procesado hace 2 horas • 15 preguntas",
  },
  {
    id: "2",
    title: "Historia Universal - Segunda Guerra.pdf",
    meta: "Procesado hace 5 horas • 23 preguntas",
  },
  {
    id: "3",
    title: "Cálculo Diferencial - Derivadas.pdf",
    meta: "Procesado ayer • 31 preguntas",
  },
];

export default function HomeScreen() {
  const color = useThemeColor();
  const theme = useColorScheme() ?? "light";
  return (
    <Content>
      <Text type="subheading" style={{ marginBottom: 16 }}>
        Herramientas principales
      </Text>

      <Button
        style={[{ backgroundColor: color.primary }, styles.button]}
        onPress={() => router.push("/audio-to-notes")}
      >
        <Icon
          name="microphone-lines"
          size={24}
          style={{
            padding: 10,
            borderRadius: 16,
            backgroundColor: color.surfaceSecondary,
          }}
          color={theme === "light" ? "white" : color.text}
        />
        <View style={{ flex: 1 }}>
          <Text
            type="bodySemiBold"
            style={{ color: theme === "light" ? "white" : color.text }}
          >
            Audio a apuntes
          </Text>
          <Text
            type="bodySmall"
            style={{ color: theme === "light" ? "white" : color.text }}
          >
            Graba clases y obtén resúmenes mágicos
          </Text>
        </View>
        <Icon
          name="chevron-right"
          size={18}
          color={theme === "light" ? "white" : color.text}
          style={{ marginRight: 10 }}
        />
      </Button>
      <View style={styles.actionGrid}>
        <Button
          onPress={() => {
            router.push("/pdf-to-questions");
          }}
          style={[
            styles.actionCard,
            {
              borderColor: color.border,
              borderWidth: 1,
              backgroundColor: color.surface,
            },
          ]}
        >
          <Icon
            name="file-pdf"
            size={24}
            color={color.success}
            style={[
              styles.actionCardIcon,
              { backgroundColor: color.surfaceSuccess },
            ]}
          />
          <Text type="bodySemiBold">PDF a preguntas</Text>
          <Text type="caption">Crea cuestionarios con IA</Text>
        </Button>
        <Button
          onPress={() => router.push("/notes-to-study")}
          style={[
            styles.actionCard,
            {
              borderColor: color.border,
              borderWidth: 1,
              backgroundColor: color.surface,
            },
          ]}
        >
          <Icon
            name="file-signature"
            size={24}
            color={color.warning}
            style={[
              styles.actionCardIcon,
              { backgroundColor: color.surfaceWarning },
            ]}
          />
          <Text type="bodySemiBold">Apuntes a Material</Text>
          <Text type="caption">Guía de estudio</Text>
        </Button>
      </View>

      <Row justifyContent="space-between">
        <Text type="subheading" style={{ marginBottom: 16 }}>
          Estudios recientes
        </Text>
        <Button>
          <Text type="bodySemiBold" style={{ color: color.primary }}>
            Ver todo
          </Text>
        </Button>
      </Row>

      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemList
            onPress={() => router.push("/(generation)/pdf/1")}
            title={item.title}
            meta={item.meta}
            LeftElement={
              <Icon name="file-text" size={20} color={color.primary} />
            }
            rightElement={
              <Icon name="ellipsis-vertical" size={20} color={color.icon} />
            }
          />
        )}
        contentContainerStyle={{ gap: 8 }}
      />
    </Content>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  actionGrid: {
    flexDirection: "row",
    gap: 16,
  },
  actionCard: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 24,
    marginBottom: 16,
    flex: 1,
  },
  actionCardIcon: {
    textAlign: "center",
    padding: 10,
    width: 44,
    borderRadius: 16,
    marginBottom: 8,
  },
});
