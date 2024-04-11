import { Contact } from "@/types";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import GradientIcon from "./gradient-component/gradientIcon";
import GradientText from "./gradient-component/gradientText";

interface ContactCardProps {
  contact: Contact;
  onDelete: (contactId: string) => void;
}

export default function ContactCard({ contact, onDelete }: ContactCardProps) {
  const navigation = useNavigation().getParent();

  function onPressEdit(id: string) {
    navigation?.navigate("HandleContactStack", { id: contact.id });
    console.log("Edit contact id ", id);
  }

  const birthDate = contact.birthday ? new Date(contact.birthday) : null;

  const day = birthDate ? birthDate.getDate() : "";
  const month = birthDate ? birthDate.getMonth() + 1 : "";
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
        elevation: 3,
      }}
    >
      <View style={{ minWidth: 180 }}>
        <GradientText
          colors={["purple", "black"]}
          start={{ x: 0.5, y: 0.25 }}
          end={{ x: 0.5, y: 1 }}
          style={{ fontSize: 15, fontWeight: "600", marginLeft: 10 }}
        >
          {contact.name}
        </GradientText>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ marginHorizontal: 10 }}>
          {day} / {month}
        </Text>
        <Text style={{ fontWeight: "600" }}>{year}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => onPressEdit(contact.id)}
        >
          <GradientIcon
            colors={["#6bc8e4", "#1f20e0"]}
            start={{ x: 0.2, y: 0.2 }}
            end={{ x: 0, y: 1 }}
            name={"account-edit"}
            locations={[0, 1]}
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => onDelete(contact.id)}
        >
          <GradientIcon
            colors={["#ff8300", "#bb000e"]}
            start={{ x: 0.2, y: 0.2 }}
            end={{ x: 0, y: 1 }}
            name={"delete"}
            locations={[0, 1]}
            size={28}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
