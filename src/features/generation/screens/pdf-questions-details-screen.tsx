import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Content } from "@/components/ui/Content";
import { ItemList } from "@/components/ui/DocumentItem";
import { Header } from "@/components/ui/Header";
import { Icon } from "@/components/ui/Icon";
import { Row } from "@/components/ui/Row";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function PDFQuestionsDetailsScreen({ id }: { id: string }) {
  const color = useThemeColor();
  const theme = useColorScheme();

  return (
    <Content header={<Header title="Previsualización del Quiz" />}>
      <View
        style={[
          styles.titleContainer,
          {
            backgroundColor: color.surface,
            borderColor: color.border,
            borderWidth: 1,
            marginBottom: 16,
          },
        ]}
      >
        <View style={{ marginTop: 30, marginBottom: 20 }}>
          <Badge label="Inteligencia Artificial" variant="primary" />
          <Text type="heading">Fundamentos de redes neuronales</Text>
        </View>
        <Row gap={12}>
          <Row gap={4}>
            <Icon name="question-circle" color={color.icon} size={16} />
            <Text type="caption">20 Preguntas</Text>
          </Row>
          <View
            style={{ height: "100%", width: 2, backgroundColor: color.border }}
          />

          <Row gap={4}>
            <Icon name="gauge" color={color.icon} size={16} />
            <Text type="caption">Medio</Text>
          </Row>
          <View
            style={{ height: "100%", width: 2, backgroundColor: color.border }}
          />

          <Row gap={4}>
            <Icon name="clock" color={color.icon} size={16} />
            <Text type="caption">15 m</Text>
          </Row>
        </Row>
      </View>
      <Text type="subheading" style={{ marginBottom: 16 }}>
        Temas cubiertos
      </Text>
      <ItemList
        LeftElement={<Icon name="check" color={color.primary} size={16} />}
        title="Arquitectura de perceptores"
        meta="Capas de entrada, ocultas y salida."
      />
      <Button
        style={{
          backgroundColor: color.primary,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 16,
          alignItems: "center",
          position: "absolute",
          bottom: 30,
          alignSelf: "center",
          width: "100%",
        }}
      >
        <Row gap={8} alignItems="center">
          <Text
            type="bodySemiBold"
            style={{
              color: theme === "light" ? "#fff" : color.text,
            }}
          >
            Comenzar Quiz
          </Text>
          <Icon
            size={16}
            name="arrow-right"
            color={theme === "light" ? "#fff" : color.text}
          />
        </Row>
      </Button>
    </Content>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    borderRadius: 16,
    padding: 20,
  },
});
