import { Contact } from "@/types";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

interface contactProps {
  month: string;
  index: number;
  monthsWithData: string[];
  contactsInMonth: Contact[] | undefined;
}
export default function ContactCard({
  month,
  index,
  monthsWithData,
  contactsInMonth,
}: contactProps) {
  return (
    <View
      key={`${month}_${index}`}
      style={{
        marginHorizontal: 10,
        marginBottom: index === monthsWithData.length - 1 ? 0 : 25,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          marginHorizontal: 10,
          fontWeight: "600",
          color: "gray",
        }}
      >
        {month.toString()}
      </Text>
      <FlatList
        style={{ maxHeight: 300 }}
        data={contactsInMonth}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                {item.name}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginHorizontal: 10 }}>
                {new Date(item.birthday).getDate()}
              </Text>
              <Text>{new Date(item.birthday).getFullYear()}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                  console.log("EDIT ", item.id, " + ", item.birthday);
                }}
              >
                <View>
                  <Text>[ ]</Text>
                </View>
              </Pressable>
              <Pressable
                style={{ marginHorizontal: 8 }}
                onPress={() => {
                  console.log("DELETE: ", item.id);
                }}
              >
                <View>
                  <Text>X</Text>
                </View>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
