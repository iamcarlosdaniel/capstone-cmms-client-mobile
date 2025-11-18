import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Usamos Ionicons para el icono de la lupa

import { SlidersHorizontal } from "lucide-react-native";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Estado para controlar la visibilidad de los filtros

  const handleChange = (text) => {
    setSearchQuery(text);
    onSearch(text); // Llamamos a la función onSearch cada vez que el texto cambia
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible); // Cambia la visibilidad de los filtros
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="search" size={20} color="#888" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={searchQuery}
          onChangeText={handleChange}
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={toggleFilterVisibility}
        >
          <SlidersHorizontal size={24} color="#4b4b4b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff", // Fondo blanco para el cuadro de búsqueda
    flex: 1, // Ocupa todo el espacio disponible
    paddingLeft: 14,
    paddingRight: 10,
    paddingVertical: 8,
    borderWidth: 1, // Añadido para el borde
    borderRadius: 14, // Bordes redondeados
    borderColor: "#e1e1e1",
  },
  iconContainer: {
    paddingRight: 10, // Espaciado para que el icono no se quede pegado al borde
  },
  input: {
    flex: 1, // Hace que el TextInput ocupe todo el espacio disponible
    fontSize: 16,
    color: "#333", // Color de texto
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#f4f4f5", // Fondo azul para el botón de filtro
    borderRadius: 12, // Bordes redondeados
    height: 40,
    width: 45,
  },
});

export default SearchBar;
