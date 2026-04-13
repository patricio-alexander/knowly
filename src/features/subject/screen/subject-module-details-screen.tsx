import { Button } from "@/components/ui/Button";
import { Content } from "@/components/ui/Content";
import { Header } from "@/components/ui/Header";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { Row } from "@/components/ui/Row";
import { Text } from "@/components/ui/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams, router } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useDeleteModule } from "../hooks/useDeleteModule";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
type ContentUpload = "audio" | "foto" | "text" | "pdf";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ContentUpload } from "../components/ContentUpload";
import { TextArea } from "@/features/generation/components/TextArea";
import { Image } from "expo-image";
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import AudioLines from "@/components/ui/Icons/AudioLines";
import { useUploadContent } from "../hooks/useUploadContent";

type PDFFile = {
  uri: string;
  name: string;
  mimeType: string;
};

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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [typeContent, setTypeContent] = useState<ContentUpload | null>(null);
  const [textNote, setTextNote] = useState("");
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const player = useAudioPlayer(audioRecorder.uri);
  const status = useAudioPlayerStatus(player);
  const { uploadAudio, uploadImage, uploadPDF, isLoading } = useUploadContent();
  const [PDFFile, setPDFFile] = useState<PDFFile | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const theme = useColorScheme();
  const [audioUri, setAudioUri] = useState("");

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

  const closeBottomSheet = () => {
    setTypeContent(null);
    bottomSheetRef.current?.close();
    setAudioUri("");
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const pickDocument = async () => {
    const picker = await DocumentPicker.getDocumentAsync();

    if (!picker.canceled) {
      const assets = picker.assets[0];
      if (assets.mimeType !== "application/pdf") {
        return Alert.alert("Solo se permite subir archivos pdf");
      }

      setTypeContent("pdf");
      setPDFFile({
        name: assets.name,
        uri: assets.uri,
        mimeType: assets.mimeType,
      });
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permisos requeridos",
        "Se requiere acceso a galería para subir las fotos de tus apuntes",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setTypeContent("foto");
      bottomSheetRef.current?.snapToIndex(2);
      setImageUri(result.assets[0].uri);
    }
  };

  const permissionRecording = async () => {
    const status = await AudioModule.requestRecordingPermissionsAsync();
    if (!status.granted) {
      Alert.alert("Permisos para acceder al micrófono denegado");
    }
    setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true,
    });
  };

  const record = async () => {
    await permissionRecording();
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
    setAudioUri(audioRecorder.uri ?? "");
  };

  const sendAudio = async () => {
    try {
      const now = Date.now();
      await uploadAudio(`${now}-audio.m4a`, audioUri);
      setAudioUri("");
    } catch (error: any) {
      Alert.alert(error);
    }
  };

  const sendPDF = async () => {
    try {
      const now = Date.now();
      await uploadPDF(`${now}-document.pdf`, PDFFile?.uri as string);
      setPDFFile(null);
      bottomSheetRef.current?.close();
      setTypeContent(null);
    } catch (error: any) {
      Alert.alert("Error", error);
    }
  };

  const sendImage = async () => {
    try {
      const now = Date.now();
      await uploadImage(`${now}-image.jpg`, imageUri as string);
      bottomSheetRef.current?.close();
      setTypeContent(null);
      setImageUri(null);
    } catch (error: any) {
      Alert.alert("Error", error);
    }
  };

  return (
    <>
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
        <Row justifyContent="space-between">
          <Button onPress={() => setIsOpenCollapsable(!isOpenCollapsible)}>
            <Row gap={4}>
              <Icon
                name={`folder-${isOpenCollapsible ? "open" : "closed"}`}
                color={color.icon}
                size={16}
              />
              <Text type="overline">ARCHIVOS SUBIDOS</Text>
            </Row>
          </Button>
          <Button onPress={openBottomSheet}>
            <Icon name="plus" color={color.text} size={20} />
          </Button>
        </Row>
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
      </Content>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: color.backgroundSecondary }}
        handleIndicatorStyle={{ backgroundColor: color.icon }}
        snapPoints={["40%", "65%"]}
      >
        <BottomSheetView style={{ paddingHorizontal: 20 }}>
          {/* Cuando no solecciona ningún contenido a subir */}
          {!typeContent && (
            <>
              <Text type="subheading">Añadir contenido</Text>
              <Text type="caption" style={{ marginBottom: 16 }}>
                Selecciona el formato de origen
              </Text>
              <Row gap={12} style={{ marginBottom: 12 }}>
                <ContentUpload
                  title="Nueva grabación"
                  icon="microphone"
                  onPress={() => setTypeContent("audio")}
                />
                <ContentUpload
                  title="Subir PDF"
                  variant="success"
                  icon="file-pdf"
                  onPress={() => {
                    pickDocument();
                  }}
                />
              </Row>
              <Row gap={12} style={{ marginBottom: 20 }}>
                <ContentUpload
                  title="Subir imagen"
                  variant="warning"
                  icon="image"
                  onPress={() => {
                    pickImage();
                  }}
                />
                <ContentUpload
                  title="Pegar texto"
                  variant="secondary"
                  icon="paste"
                  onPress={() => {
                    setTypeContent("text");
                    bottomSheetRef.current?.snapToIndex(2);
                  }}
                />
              </Row>
            </>
          )}

          {typeContent === "audio" && (
            <>
              <Row gap={10} style={{ marginBottom: 40 }}>
                <Button
                  onPress={() => {
                    setTypeContent(null);
                  }}
                >
                  <Icon name="arrow-left" color={color.secondary} size={20} />
                </Button>
                <Text type="subheading">Empieza a grabar</Text>
              </Row>
              <View style={{ alignItems: "center" }}>
                <Button
                  onPress={recorderState.isRecording ? stopRecording : record}
                  style={[
                    styles.recordButton,
                    {
                      backgroundColor: color.surfacePrimary,
                      borderColor: color.borderPrimary,
                    },
                  ]}
                >
                  <Icon
                    name={
                      recorderState.isRecording
                        ? "ear-listen"
                        : "microphone-lines"
                    }
                    color={color.text}
                    size={35}
                  />
                </Button>

                {audioRecorder.isRecording ? (
                  <Text type="bodySmallSemiBold">Grabando...</Text>
                ) : audioUri ? (
                  <>
                    <Button
                      onPress={sendAudio}
                      style={{
                        position: "absolute",
                        right: 0,
                        marginBottom: 12,
                        backgroundColor: color.surfacePrimary,
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 40,
                        width: 40,
                      }}
                    >
                      <Icon name="check" color={color.primary} size={16} />
                    </Button>
                    <Row gap={4} style={{ marginBottom: 16 }}>
                      <Button
                        onPress={player.playing ? player.pause : player.play}
                      >
                        <Icon
                          name={player.playing ? "circle-pause" : "circle-play"}
                          color={color.text}
                          size={20}
                        />
                      </Button>
                      <Row>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <AudioLines key={i} stroke={color.text} />
                        ))}
                      </Row>
                      <Text type="bodySemiBold">{status.currentTime}s</Text>
                    </Row>

                    <Text type="mutedSemibold">
                      Toca para grabar nuevamente
                    </Text>
                  </>
                ) : (
                  <Text type="mutedSemibold">
                    Toca para iniciar la grabación
                  </Text>
                )}

                <Text type="caption">
                  Asegúrate de estar en un lugar silencioso
                </Text>
              </View>
            </>
          )}

          {typeContent === "pdf" && (
            <>
              <Row gap={10} style={{ marginBottom: 50 }}>
                <Button
                  onPress={() => {
                    setTypeContent(null);
                  }}
                >
                  <Icon name="arrow-left" color={color.secondary} size={20} />
                </Button>
                <Text type="subheading">Subir PDF</Text>
              </Row>
              <Row
                gap={8}
                style={{
                  alignSelf: "center",
                  backgroundColor: color.surface,
                  padding: 10,
                  borderRadius: 16,
                  borderColor: color.border,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  marginBottom: 20,
                }}
              >
                <Icon name="file-pdf" size={20} color={color.primary} />
                <Text type="bodySemiBold" style={{ color: color.primary }}>
                  {PDFFile?.name}
                </Text>
              </Row>

              {isLoading ? (
                <ActivityIndicator size="small" color={color.text} />
              ) : (
                <Button
                  onPress={() => {
                    sendPDF();
                  }}
                  style={{
                    backgroundColor: color.primary,
                    alignItems: "center",
                    borderRadius: 100,
                    paddingVertical: 12,
                  }}
                >
                  <Row gap={8}>
                    <Icon
                      name="upload"
                      size={20}
                      color={theme === "light" ? color.white : color.text}
                    />
                    <Text
                      type="bodySemiBold"
                      style={{
                        color: theme === "light" ? color.white : color.text,
                      }}
                    >
                      Subir archivo
                    </Text>
                  </Row>
                </Button>
              )}
            </>
          )}

          {typeContent === "foto" && (
            <>
              <Row gap={10} style={{ marginBottom: 16 }}>
                <Button
                  onPress={() => {
                    setTypeContent(null);
                    bottomSheetRef.current?.snapToIndex(1);
                    setImageUri(null);
                  }}
                >
                  <Icon name="arrow-left" color={color.secondary} size={20} />
                </Button>
                <Text type="subheading">Subir foto</Text>
              </Row>
              <Image
                style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 16,
                  marginBottom: 20,
                }}
                source={{ uri: imageUri }}
              />

              {isLoading ? (
                <ActivityIndicator size="small" color={color.text} />
              ) : (
                <Button
                  onPress={sendImage}
                  style={{
                    backgroundColor: color.primary,
                    alignItems: "center",
                    borderRadius: 100,
                    paddingVertical: 12,
                  }}
                >
                  <Row gap={8}>
                    <Icon
                      name="upload"
                      size={20}
                      color={theme === "light" ? color.white : color.text}
                    />
                    <Text
                      type="bodySemiBold"
                      style={{
                        color: theme === "light" ? color.white : color.text,
                      }}
                    >
                      Subir foto
                    </Text>
                  </Row>
                </Button>
              )}
            </>
          )}

          {typeContent === "text" && (
            <>
              <Row gap={10} style={{ marginBottom: 16 }}>
                <Button
                  onPress={() => {
                    setTypeContent(null);
                    bottomSheetRef.current?.snapToIndex(1);
                  }}
                >
                  <Icon name="arrow-left" color={color.secondary} size={20} />
                </Button>
                <Text type="subheading">Pegar texto</Text>
              </Row>
              <View style={{ flex: 1 }}>
                <TextArea
                  value={textNote}
                  onChange={setTextNote}
                  placeholder="Pega aquí tus apuntes, notas de voz transcritas o cualquier texto que quieras analizar..."
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <Button
                  style={{
                    backgroundColor: color.primary,
                    borderRadius: 10,
                    paddingVertical: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text type="bodySemiBold" style={{ color: color.text }}>
                    Subir texto
                  </Text>
                </Button>
              </View>
            </>
          )}

          <Button
            style={[{ backgroundColor: color.background }, styles.cancelButton]}
            onPress={closeBottomSheet}
          >
            <Icon name="xmark" size={18} color={color.secondary} />
          </Button>
        </BottomSheetView>
      </BottomSheet>
    </>
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

  cancelButton: {
    borderRadius: 100,
    width: 40,
    height: 40,
    padding: 10,
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 16,
    justifyContent: "center",
  },

  recordButton: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});
