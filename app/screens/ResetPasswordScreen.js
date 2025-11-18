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
import { useKeyboard } from "../hooks/useKeyboard"; // Hook para el comportamiento del teclado
import OtpInput from "../components/OtpInput"; // Importar el componente OtpInput

const KEYBOARD_OFFSET_RATIO = 2.5; // Reducido para evitar un desplazamiento excesivo

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array de 6 caracteres para el OTP
  const keyboardOffset = useKeyboard(KEYBOARD_OFFSET_RATIO); // Usamos el custom hook para manejar el desplazamiento del teclado

  // Validación de contraseñas
  const validatePasswords = () => {
    if (password !== confirmPassword) {
      ToastAndroid.show("Las contraseñas no coinciden", ToastAndroid.SHORT);
      return false;
    }
    return true;
  };

  // Función para unir el OTP
  const getOtpValue = () => otp.join("");

  const onResetPasswordPress = () => {
    const otpValue = getOtpValue();

    if (!otpValue || !password || !confirmPassword) {
      ToastAndroid.show("Completa todos los campos", ToastAndroid.SHORT);
      return;
    }

    if (!validatePasswords()) return;

    // Aquí podrías hacer la llamada a la API para resetear la contraseña
    ToastAndroid.show(
      "Contraseña restablecida correctamente",
      ToastAndroid.SHORT
    );
    console.log("OTP:", otpValue);
    console.log("Nueva contraseña:", password);

    ToastAndroid.show("Por favor vuelve a iniciar sesión", ToastAndroid.SHORT);

    // Redirigir al login después de restablecer la contraseña
    navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
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
          <Text style={styles.title}>Restablecer</Text>
          <Text style={[styles.title, { marginTop: -2 }]}>Contraseña</Text>
          <Text style={styles.subtitle}>
            Introduce el código enviado a tu correo{"\n"} y tu nueva contraseña
          </Text>
        </View>

        {/* Usar el componente OTP */}
        <OtpInput otp={otp} setOtp={setOtp} />

        <View style={styles.divider} />

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onResetPasswordPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Restablecer Contraseña</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿Recuerdas tu contraseña? </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: "SignIn" }] })
            }
          >
            <Text style={styles.footerLink}>Inicia Sesión</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

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
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    marginBottom: 20,
  },
});

export default ResetPassword;
