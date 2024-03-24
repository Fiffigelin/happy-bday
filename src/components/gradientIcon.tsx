import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const GradientIcon = (props: {
  colors: any;
  start: any;
  end: any;
  locations: any;
  name: any;
  size: any;
}) => {
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
        />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientIcon;
