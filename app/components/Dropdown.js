import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from "react-native";

import { ChevronDown } from "lucide-react-native";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Estado para la opción seleccionada
  const [heightAnim] = useState(new Animated.Value(0)); // Valor animado para la altura

  // Manejar la selección de una opción
  const handleSelect = (option) => {
    setSelectedOption(option); // Guardamos la opción seleccionada
    onSelect(option); // Llamamos a la función onSelect con la opción seleccionada
    setIsOpen(false); // Cerramos el dropdown
  };

  // Función para abrir/cerrar el dropdown con animación
  const toggleDropdown = () => {
    if (isOpen) {
      // Cerrar con animación
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      // Abrir con animación
      Animated.timing(heightAnim, {
        toValue: options.length * 47, // Calculamos la altura basada en las opciones
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    setIsOpen(!isOpen); // Cambiamos el estado de apertura
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleDropdown} // Alternamos entre abierto y cerrado
        >
          <Text style={styles.buttonText}>
            {selectedOption ? selectedOption : "Selecciona una opción"}
          </Text>
          <ChevronDown size={20} color="#333" />
        </TouchableOpacity>

        {isOpen && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => setIsOpen(false)}
          >
            <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
              <View style={styles.overlay}>
                <Animated.View
                  style={[
                    styles.dropdown,
                    {
                      height: heightAnim, // La altura cambia con la animación
                    },
                  ]}
                >
                  <FlatList
                    data={options}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => handleSelect(item)} // Al seleccionar, cambia el texto
                      >
                        <Text style={styles.optionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative", // Para poder posicionar el dropdown encima de otros elementos
  },
  button: {
    backgroundColor: "#ffffff",
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Sombra para dispositivos Android
  },
  buttonText: {
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    width: "90%", // Asegura que el dropdown tenga un tamaño apropiado
    zIndex: 9999, // Asegura que el dropdown esté por encima de otros elementos
    overflow: "hidden", // Evita que los bordes del dropdown se desborden
    marginBottom: 18, // Espacio desde la parte inferior
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0", // Límite entre opciones
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center", // Mejor alineación de texto
  },
});

export default Dropdown;
