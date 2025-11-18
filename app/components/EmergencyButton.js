import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";
import React, { useRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const EmergencyButton = ({ onPress }) => {
  const timer = useRef(null); // Guardamos la referencia del temporizador.

  const handlePressIn = () => {
    // Cancelamos el temporizador anterior, si existe.
    clearTimeout(timer.current);

    // Iniciamos un nuevo temporizador cuando el botón es presionado.
    timer.current = setTimeout(() => {
      console.log("Emergencia activada");

      onPress(); // Llamamos a la función pasada por props después de 2 segundos.
      Vibration.vibrate(500); // Vibrar por 500 ms para dar feedback al usuario
    }, 2000);
  };

  const handlePressOut = () => {
    // Limpiamos el temporizador si el usuario deja de presionar antes de los 2 segundos.
    clearTimeout(timer.current);
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <MaterialIcons name="emergency" size={30} color="#fff" />
      <Text style={styles.buttonText}>Emergencia</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7180B",
    paddingHorizontal: 16,
    borderRadius: 15,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 18,
  },
});

export default EmergencyButton;
