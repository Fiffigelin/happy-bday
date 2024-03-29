import { Contact } from "@/types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import GradientText from "./gradientText";

interface ContactCardProps {
  contact: Contact;
  onDelete: (contactId: string) => void;
}
export default function ContactCard({ contact, onDelete }: ContactCardProps) {
  function onPressEdit(id: string) {
    console.log("Edit contact id ", id);
  }

  const birthDate = contact.birthday ? new Date(contact.birthday) : null;

  const day = birthDate ? birthDate.getDate() : "";
  const year = birthDate ? birthDate.getFullYear() : "";

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
        <GradientText
          colors={["pink", "purple"]}
          start={{ x: 0.5, y: 0.25 }}
          end={{ x: 0.5, y: 1 }}
          style={{ fontSize: 15, fontWeight: "600", marginLeft: 10 }}
        >
          {contact.name}
        </GradientText>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ marginHorizontal: 10 }}>{day}</Text>
        <Text>{year}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          style={{ marginHorizontal: 10 }}
          onPress={() => onPressEdit(contact.id)}
        >
          <MaterialCommunityIcons name="account-edit" size={24} color="black" />
        </Pressable>
        <Pressable
          style={{ marginHorizontal: 8 }}
          onPress={() => onDelete(contact.id)}
        >
          <MaterialIcons name="delete-forever" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
