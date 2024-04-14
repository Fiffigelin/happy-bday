import { Contact } from "@/types";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { parseDateToShortBirthDay } from "../services/sortUpComingBirthdays";
import GradientIcon from "./gradient-component/gradientIcon";
import GradientText from "./gradient-component/gradientText";

interface birtdayCardProps {
  contact: Contact;
  onCardPress: (contact: Contact) => void;
}

export default function UpComingBirthdayCard({
  contact,
  onCardPress,
}: birtdayCardProps) {
  const [isBirthday, setBirthday] = useState<boolean>(false);

  function onPressSend() {
    onCardPress(contact);
  }

  useEffect(() => {
    const todaysDate = parseDateToShortBirthDay();
    if (todaysDate === contact.short_birthday) {
      setBirthday(true);
    }
  }, []);

  function sendBirthdayMessage() {
    return (
      <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={onPressSend}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ marginRight: 10, width: 40 }}>
            <GradientIcon
              name="party-popper"
              colors={["#a310d8", "#d92697"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              size={30}
            />
          </View>
          <View style={{ marginRight: 10, width: 40 }}>
            <GradientIcon
              name="send-circle"
              colors={["#a310d8", "#d92697"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              size={30}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  function notABirthday() {
    return (
      <Pressable style={{ marginHorizontal: 10 }}>
        <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
          <View style={{ marginRight: 10, width: 40 }}>
            <GradientIcon
              name="party-popper"
              colors={["white", "black"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              size={30}
            />
          </View>
          <View style={{ marginRight: 10, width: 40 }} />
        </View>
      </Pressable>
    );
  }

  return (
    <TouchableOpacity style={style.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <View style={{ flexDirection: "row" }}></View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isBirthday ? sendBirthdayMessage() : notABirthday()}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 8,
    margin: 6,
    marginBottom: 25,
    height: 55,
    padding: 8,
    flexDirection: "row",
    elevation: 3,
  },
});
