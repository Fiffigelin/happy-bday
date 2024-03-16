import { Contact } from "@/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
        backgroundColor: selected ? "#f4c3d5" : "white",
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
        <Text style={{ fontSize: 15, fontWeight: "600", marginLeft: 10 }}>
          {contact.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 2,
        }}
      >
        <View>
          <Text>{addLeadingZero(birthday.getDate())}</Text>
        </View>
        <View>
          <Text>{addLeadingZero(birthday.getMonth() + 1)}</Text>
        </View>
        <View>
          <Text>{birthday.getFullYear()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
