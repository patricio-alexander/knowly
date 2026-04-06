import { Text } from "react-native";
import React from "react";
export const Icon = ({
  name,
}: {
  name: string;
  color: string;
  size: number;
}) => <Text>{name}</Text>;
