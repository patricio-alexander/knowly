import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { SubjectCard } from "./SubjectCard";

export type Subject = {
  id: string;
  name: string;
  color: string;
  modulesCount?: number;
};

type SubjectListProps = {
  subjects: Subject[];
  onSubjectPress?: (subject: Subject) => void;
  style?: StyleProp<ViewStyle>;
};

export const SubjectList = ({
  subjects,
  onSubjectPress,
  style,
}: SubjectListProps) => {
  return (
    <FlatList
      style={style}
      data={subjects}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <SubjectCard
            name={item.name}
            color={item.color}
            modulesCount={item.modulesCount}
            onPress={() => onSubjectPress?.(item)}
            testID={`subject-${item.id}`}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  row: {
    gap: 12,
  },
  cardContainer: {
    flex: 1,
  },
});
