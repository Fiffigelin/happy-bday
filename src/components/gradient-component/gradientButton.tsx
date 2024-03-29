import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";

interface GradientButtonProps {
  text: string;
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children?: React.ReactNode;
}

export default function GradientButton(props: GradientButtonProps) {
  const { text, colors, start, end, style, onPress } = props;

  return (
    <MaskedView maskElement={<TouchableOpacity {...props} />}>
      <LinearGradient colors={colors} start={start} end={end} style={style}>
        <TouchableOpacity onPress={onPress} style={style}>
          <Text>{text}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </MaskedView>
  );
}
