import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface gradientIconProps {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  locations: number[];
  name: string;
  size: number;
}
export default function GradientIcon(props: gradientIconProps) {
  return (
    <MaskedView maskElement={<MaterialCommunityIcons {...props} />}>
      <LinearGradient
        colors={props.colors}
        start={props.start}
        end={props.end}
        locations={props.locations}
      >
        <MaterialCommunityIcons
          {...props}
          style={{
            opacity: 0,
          }}
          name={props.name}
          size={props.size}
        />
      </LinearGradient>
    </MaskedView>
  );
}
