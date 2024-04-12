import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface IconProps {
  focused: boolean;
  iconName: any;
  iconSize: number;
}
export default function CustomTabBarIcon({
  focused,
  iconName,
  iconSize,
}: IconProps) {
  return (
    <Ionicons
      name={iconName}
      size={focused ? iconSize * 1.2 : iconSize} // Öka storleken om ikonen är aktiv
      color={focused ? "#fbf8f8" : "#c781f3"}
    />
  );
}
