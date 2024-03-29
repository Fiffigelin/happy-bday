import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface gradientTextProps {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  style: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export default function GradientText(props: gradientTextProps) {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient colors={props.colors} start={props.start} end={props.end}>
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
}
