import { Contact } from "@/types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import GradientIcon from "./gradientIcon";

interface birtdayCardProps {
  contact: Contact;
}

export default function UpComingBirthdayCard({ contact }: birtdayCardProps) {
  function onPressSend() {
    console.log("Send the card");
  }
  return (
    <View
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 8,
        margin: 6,
        marginBottom: 25,
        height: 55,
        padding: 8,
        flexDirection: "row",
      }}
    >
      <View style={{ minWidth: 180 }}>
        <Text style={{ fontSize: 15, fontWeight: "600", marginLeft: 10 }}>
          {contact.name}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}></View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          style={{ marginHorizontal: 10 }}
          onPress={() => onPressSend()}
        >
          <GradientIcon
            name="party-popper"
            colors={["purple", "pink"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 1]}
            size={30}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
