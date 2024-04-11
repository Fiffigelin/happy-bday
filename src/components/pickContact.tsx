import { Contact } from "@/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import GradientText from "./gradient-component/gradientText";

interface PickContactProps {
  contact: Contact;
  selected: boolean;
  onPress: () => void;
}

export default function PickContactCard({
  contact,
  selected,
  onPress,
}: PickContactProps) {
  const birthday = new Date(contact.birthday);

  const addLeadingZero = (number: number): string => {
    return number < 10 ? "0" + number : "" + number;
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: selected ? "#f1a0f6" : "white",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 8,
        margin: 6,
        marginBottom: 5,
        height: 55,
        padding: 8,
        flexDirection: "row",
        width: "100%",
      }}
      onPress={onPress}
    >
      <View style={{ minWidth: 180, flex: 1 }}>
        <GradientText
          colors={["purple", "black"]}
          start={{ x: 0.5, y: 0.25 }}
          end={{ x: 0.5, y: 1 }}
          style={{ fontSize: 15, fontWeight: "600", marginLeft: 5 }}
        >
          {contact.name}
        </GradientText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 2,
          marginRight: 5,
        }}
      >
        <View>
          <Text>
            {addLeadingZero(birthday.getDate())} /{" "}
            {addLeadingZero(birthday.getMonth() + 1)}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>{birthday.getFullYear()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
