import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // Ajusta la ruta
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  ToastAndroid,
  Keyboard,
} from "react-native";
import { useKeyboard } from "../hooks/useKeyboard"; // Custom hook para el teclado

const KEYBOARD_OFFSET_RATIO = 7.2; // Reducido para evitar un desplazamiento excesivo

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const keyboardOffset = useKeyboard(KEYBOARD_OFFSET_RATIO); // Usamos el custom hook para manejar el teclado

  const { signIn } = useContext(AuthContext); // Usamos el contexto para manejar la autenticación

  const onSignInPress = async () => {
    try {
      const response = await signIn(email, password);
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
    } catch (error) {
      // Mejor manejo de errores
      const errorMessage = error?.errors?.[0]?.message || "Error desconocido";
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }
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
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>
            Ingresa tu correo electrónico y contraseña
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onSignInPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿Olvidaste tu contraseña? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
            <Text style={styles.footerLink}>Recuperar</Text>
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
    backgroundColor: "#ffffff",
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
    borderRadius: 12,
  },
  passwordInput: {
    marginBottom: 16,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#1447e6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
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
    color: "#0057ff",
    fontWeight: "800",
  },
});

export default SignInScreen;
