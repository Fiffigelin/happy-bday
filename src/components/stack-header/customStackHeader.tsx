import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Svg, { ClipPath, Ellipse, Rect } from "react-native-svg";
import GradientIcon from "../gradient-component/gradientIcon";

export default function CustomStackHeader() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Svg height={height / 7} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height / 3} ry={height / 7}></Ellipse>
          </ClipPath>
          <Rect
            x="0"
            y="0"
            width={width}
            height={height / 3}
            fill="#7110ae"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <View
          style={{
            position: "absolute",
            top: height / 25,
            left: width / 2 - 50,
            elevation: 2,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              justifyContent: "center",
              marginLeft: 12,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                padding: 10,
                borderRadius: 10,
              }}
            >
              <GradientIcon
                colors={["white", "#b3b3b3"]}
                start={{ x: 0.2, y: 0.2 }}
                end={{ x: 0, y: 1 }}
                name={"arrow-left-drop-circle"}
                locations={[0, 1]}
                size={60}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10,
  },
});
