import React from "react";
import { View, Text } from "react-native";

const Badge = ({ icon, label, style }) => {
  return (
    <View
      style={[
        style.container, // Estilo pasado como prop
        {
          paddingHorizontal: 8, // Espaciado dentro del badge
          paddingVertical: 2, // Espaciado vertical
          borderWidth: 1, // Borde del badge
          borderRadius: 12, // Bordes redondeados
          flexDirection: "row", // Elementos en línea (horizontal)
          alignItems: "center", // Alinea los elementos verticalmente
          justifyContent: "center", // Centrado de los elementos
          gap: 4, // Espacio entre icono y texto
          alignSelf: "flex-start", // Ajusta el tamaño al contenido
        },
      ]}
    >
      {icon}
      <Text
        style={[
          style.label, // Estilo del texto pasado como prop
          // Estilo adicional para el texto
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export default Badge;
