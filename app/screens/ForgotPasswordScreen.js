import React, { useState } from "react";
import {
  Animated,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { useKeyboard } from "../hooks/useKeyboard"; // Hook personalizado para manejar el teclado

const KEYBOARD_OFFSET_RATIO = 8; // Reducido para evitar un desplazamiento excesivo

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const keyboardOffset = useKeyboard(KEYBOARD_OFFSET_RATIO); // Usamos el custom hook para manejar el desplazamiento del teclado

  const onRequestPasswordResetPress = () => {
    // Aquí podrías integrar la lógica para solicitar la recuperación de contraseña, por ejemplo, una API
    ToastAndroid.show(
      "Recuperación de contraseña solicitada",
      ToastAndroid.SHORT
    );
    console.log("Correo para recuperación:", email);

    // Redirigir al usuario después de solicitar la recuperación
    navigation.reset({ index: 0, routes: [{ name: "ResetPasswordScreen" }] });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.formContainer,
          { transform: [{ translateY: keyboardOffset }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Recuperar</Text>
          <Text style={[styles.title, { marginTop: -2 }]}>Contraseña</Text>
          <Text style={styles.subtitle}>Ingresa tu correo electrónico</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onRequestPasswordResetPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Solicitar</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿Recuerdas tu contraseña? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerLink}>Inicia Sesión</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 24,
    paddingVertical: 50,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "start",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#084ce8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  footerContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  footerLink: {
    color: "#084ce8",
    fontWeight: "800",
  },
});

export default ForgotPasswordScreen;
