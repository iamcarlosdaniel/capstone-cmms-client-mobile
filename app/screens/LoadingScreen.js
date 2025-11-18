import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { checkToken } from "../services/userService";

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const verify = async () => {
      const user = await checkToken();
      if (user) {
        navigation.replace("Home");
      } else {
        navigation.replace("SignIn");
      }
    };
    verify();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
