import { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Vibration,
  BackHandler,
  ToastAndroid,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AudioContext } from "../contexts/AudioContext";

// Constantes para tiempos de presión y colores
const PRESS_THRESHOLD = 2000; // 2 segundos
const BACKGROUND_INTERVAL = 500; // 0.5 segundos
const LONG_PRESS_DELAY = 3000; // 3 segundos

const EmergencyScreen = ({ navigation }) => {
  const { player } = useContext(AudioContext); // Uso del contexto

  // Estados del componente
  const [bgColor, setBgColor] = useState("red");
  const [textColor, setTextColor] = useState("white");
  const [pressStartTime, setPressStartTime] = useState(null);
  const opacity = new Animated.Value(1);

  // Efecto para alternar el color de fondo
  useEffect(() => {
    const interval = setInterval(() => {
      toggleBackgroundColor();
    }, BACKGROUND_INTERVAL);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  // Efecto para manejar el botón de retroceso en Android
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove(); // Limpiar el evento al desmontar
  }, []);

  // Función que alterna los colores de fondo y texto
  const toggleBackgroundColor = () => {
    setBgColor((prevColor) => (prevColor === "red" ? "white" : "red"));
    setTextColor((prevColor) => (prevColor === "white" ? "red" : "white"));
  };

  // Función para manejar el retroceso de Android
  const handleBackPress = () => {
    ToastAndroid.show(
      "Mantén presionado para salir de emergencia",
      ToastAndroid.SHORT
    );
    return true; // Bloquear el retroceso
  };

  // Función para manejar la presión larga
  const handleLongPress = () => {
    const pressDuration = new Date().getTime() - pressStartTime;
    if (pressDuration >= PRESS_THRESHOLD) {
      handleEmergencyExit();
    }
  };

  // Función para manejar el inicio de la presión
  const handlePressIn = () => {
    setPressStartTime(new Date().getTime());
  };

  // Función para manejar la liberación de la presión
  const handlePressOut = () => {
    if (pressStartTime) {
      const pressDuration = new Date().getTime() - pressStartTime;
      if (pressDuration < LONG_PRESS_DELAY) {
        setPressStartTime(null); // Resetea el tiempo si no es un "long press"
      }
    }
  };

  // Función para gestionar la salida de emergencia
  const handleEmergencyExit = () => {
    navigation.reset({ index: 0, routes: [{ name: "WorkOrdersScreen" }] });
    Vibration.vibrate(500); // Vibrar para dar retroalimentación
    player.pause(); // Pausar el audio
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}
      delayLongPress={LONG_PRESS_DELAY}
    >
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: bgColor, opacity: opacity },
        ]}
      >
        <MaterialIcons name="emergency" size={100} color={textColor} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
  },
});

export default EmergencyScreen;
