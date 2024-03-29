import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { captureRef } from "react-native-view-shot";

export default function ShareableReactImage() {
  const viewRef = useRef();

  async function shareDummyImage() {
    try {
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 0.7,
      });
      const fileUri = FileSystem.cacheDirectory + "dummyImage.png";
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      await Sharing.shareAsync(fileUri);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <View
      collapsable={false}
      style={{ justifyContent: "center", alignContent: "center" }}
      ref={viewRef as any}
    >
      <Text style={{ fontSize: 20, fontWeight: "600", textAlign: "center" }}>
        Don't be a dummy!
      </Text>
      <View style={styles.dummy}></View>
      <TouchableOpacity style={{ marginTop: 30 }} onPress={shareDummyImage}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            color: "red",
          }}
        >
          Share
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dummy: {
    width: 0,
    height: 0,
    borderTopWidth: 120,
    borderTopColor: "yellow",
    borderLeftColor: "black",
    borderLeftWidth: 120,
    borderRightColor: "black",
    borderRightWidth: 120,
    borderBottomColor: "yellow",
    borderBottomWidth: 120,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 120,
  },
});
