import { Content } from "@/components/ui/Content";
import { ItemList } from "@/components/ui/DocumentItem";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { Search } from "@/components/ui/Search";
import { Text } from "@/components/ui/Text";
import { useState } from "react";
import { FlatList } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function LibraryScreen() {
  const color = useThemeColor();

  const [option, setOption] = useState("all");
  const documents = [
    {
      id: "1",
      title: "Biología Celular - Mitosis.pdf",
      meta: "Procesado hace 2 horas • 15 preguntas",
      type: "pdf",
    },
    {
      id: "2",
      title: "Historia Universal - Segunda Guerra.pdf",
      meta: "Procesado hace 5 horas • 23 preguntas",
      type: "audio",
    },
    {
      id: "3",
      title: "Cálculo Diferencial - Derivadas.pdf",
      meta: "Procesado ayer • 31 preguntas",
      type: "notes",
    },
    {
      id: "4",
      title: "Quiz: Biología Celular",
      meta: "15 preguntas • 85% resolución",
      type: "quiz",
      subject: "Biología",
      module: "Cellular",
    },
    {
      id: "5",
      title: "Puntos Clave: Segunda Guerra",
      meta: "12 puntos clave",
      type: "key-points",
      subject: "Historia",
      module: "Segunda Guerra",
    },
    {
      id: "6",
      title: "Mind Map: Derivadas",
      meta: "Mapa mental interactivo",
      type: "mind-map",
    },
  ];

  const OPTIONS = [
    { label: "Todos", value: "all" },
    { label: "Sin organizar", value: "unorganized" },
    { label: "PDFs", value: "pdf" },
    { label: "Audios", value: "audio" },
    { label: "Apuntes", value: "notes" },
    { label: "Cuestionarios", value: "quiz" },
    { label: "Mapas mentales", value: "mind-map" },
  ];

  const filterDocuments = documents.filter((document) => {
    if (option === "all") {
      return true;
    }

    if (option === "unorganized") {
      return (
        ["quiz", "key-point", "mind-map"].includes(document.type) &&
        (!document.subject || !document.module)
      );
    }

    return option === document.type;
  });

  const onChangeFilter = (v: string) => {
    setOption(v);
  };

  return (
    <Content>
      <Text type="heading" style={{ marginBottom: 16 }}>
        Mi Biblioteca
      </Text>
      <Search containerStyle={{ marginBottom: 16 }} />
      <FilterTabs
        options={OPTIONS}
        onChange={onChangeFilter}
        value={option}
        containerStyle={{ marginBottom: 16 }}
      />
      <Text type="overline" style={{ marginBottom: 8 }}>
        RECIENTES
      </Text>

      <FlatList
        data={filterDocuments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const showBadges = ["quiz", "key-points", "mind-map"].includes(
            item.type,
          );
          const badges = [];

          if (showBadges) {
            if (item.subject && item.module) {
              badges.push({ label: item.subject });

              badges.push({ label: item.module, variant: "outline" as const });
            }

            if (!item.subject || !item.module) {
              badges.push({
                label: "Sin organizar",
                variant: "outline" as const,
              });
            }
          }

          const iconName =
            item.type === "audio"
              ? "file-waveform"
              : item.type === "quiz"
                ? "clipboard-question"
                : item.type === "key-points"
                  ? "lightbulb"
                  : item.type === "mind-map"
                    ? "sitemap"
                    : "file-pdf";

          return (
            <ItemList
              LeftElement={
                <Icon name={iconName} size={20} color={color.primary} />
              }
              rightElement={
                <Icon name="ellipsis-vertical" size={20} color={color.icon} />
              }
              title={item.title}
              meta={item.meta}
              badges={badges.length > 0 ? badges : undefined}
            />
          );
        }}
        contentContainerStyle={{ gap: 12 }}
      />
    </Content>
  );
}
