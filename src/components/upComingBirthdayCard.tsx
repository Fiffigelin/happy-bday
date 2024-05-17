import { Contact } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
      <View style={{ marginLeft: 10 }}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ width: 40, marginLeft: 15 }}>
            <GradientIcon
              name="party-popper"
              colors={["#a310d8", "#d92697"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              size={30}
            />
          </View>
          <TouchableOpacity
            style={{ marginRight: 20, width: 40 }}
            onPress={onPressSend}
          >
            <GradientIcon
              name="send-circle"
              colors={["#a310d8", "#d92697"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function notABirthday() {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 40 }}>
            <GradientIcon
              name="party-popper"
              colors={["white", "black"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              size={30}
            />
          </View>
          <View style={{ marginRight: 20, width: 40 }}>
            <GradientIcon
              name="send-circle"
              colors={["white", "black"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              size={30}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      {isBirthday ? (
        <LinearGradient
          colors={["turquoise", "#a310d8"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: 70,
            alignItems: "center",
            borderRadius: 10,
            maxWidth: 400,
            marginTop: 5,
          }}
        >
          <View style={style.container}>
            <View
              style={{
                minWidth: "55%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
        </LinearGradient>
      ) : (
        <View style={style.container}>
          <View
            style={{
              minWidth: 180,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
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
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 8,
    marginTop: 8,
    height: 55,
    padding: 8,
    flexDirection: "row",
    elevation: 3,
  },
});
