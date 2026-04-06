import { Content } from "@/components/ui/Content";
import { Text } from "@/components/ui/Text";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function ModalScreen() {
  return (
    <Content style={styles.container}>
      <Text type="heading">This is a modal</Text>
      <Link href="/" dismissTo style={styles.link}>
        <Text type="link">Go to home screen</Text>
      </Link>
    </Content>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
