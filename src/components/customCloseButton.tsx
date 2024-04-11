import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface CustomButtonProps {
  onPress: () => void;
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  locations: number[];
  name: string;
  size: number;
}

export default function CloseCustomButton(props: CustomButtonProps) {
  const buttonStyle = StyleSheet.create({
    closeButtonContainer: {
      height: props.size,
      width: props.size,
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      borderRadius: 20,
      top: -18,
    },
  });

  return (
    <TouchableOpacity style={buttonStyle.closeButtonContainer}>
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
    </TouchableOpacity>
  );
}
