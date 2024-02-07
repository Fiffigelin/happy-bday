import React, { useEffect } from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface CustomToastProps {
  message: string;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, onClose }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onClose();
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, onClose]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    opacity: 0.5,
    padding: 15,
    borderRadius: 10,
    width: "90%",
  },
  message: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default CustomToast;
