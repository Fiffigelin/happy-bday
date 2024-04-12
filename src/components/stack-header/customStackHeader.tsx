import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Svg, { ClipPath, Ellipse, Rect } from "react-native-svg";

export default function CustomStackHeader() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  function WavyHeader() {
    return (
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
            fill="#a316e9"
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
            style={{
              justifyContent: "center",
              marginLeft: 12,
              marginBottom: 20,
            }}
            onPress={() => navigation.goBack()}
          >
            <View
              style={{
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Ionicons name="caret-back-circle" size={60} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WavyHeader />
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
