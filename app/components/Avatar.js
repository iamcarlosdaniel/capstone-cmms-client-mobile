import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Avatar = ({ userName, size = 50 }) => {
  // Tamaño con valor por defecto de 50
  // Función para obtener las iniciales del nombre del usuario
  const getInitials = (name) => {
    const names = name.split(" "); // Dividimos el nombre por los espacios
    if (names.length > 1) {
      return names[0][0] + names[1][0]; // Retorna las iniciales del primer y segundo nombre
    }
    return names[0][0] + names[0][1]; // Si solo es un nombre, tomamos las primeras dos letras
  };

  const initials = getInitials(userName);

  return (
    <View
      style={[
        styles.avatarContainer,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size / 2.5 }]}>
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: "#f4f4f5", // Color de fondo del avatar
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontWeight: "350",
    color: "#4b4b4b", // Color del texto (blanco)
  },
});

export default Avatar;
