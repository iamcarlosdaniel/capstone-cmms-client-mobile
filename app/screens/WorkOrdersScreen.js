import { useState, useEffect, useContext, use } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import { LogOut, BadgeCheck } from "lucide-react-native";

import Badge from "../components/Badge";

import { StatusBar } from "expo-status-bar";
import SearchBar from "../components/SearchBar";
import Avatar from "../components/Avatar";
import EmergencyButton from "../components/EmergencyButton";

import { AudioContext } from "../contexts/AudioContext";
import WorkOrderItem from "../components/WorkOrderItem"; // Importamos el componente WorkOrder

import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage en React Native

import workOrderService from "../services/workOrderService";

import Dropdown from "../components/Dropdown";

export default function WorkOrdersScreen({ navigation }) {
  const { player } = useContext(AudioContext);

  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    // Definimos una función async interna
    const fetchWorkOrders = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        console.log("AccessToken en WorkOrdersScreen:", accessToken);
        const response = await workOrderService.getAllWorkOrders(accessToken);
        console.log("Órdenes de trabajo obtenidas:", response.data);
        setWorkOrders(response.data);
      } catch (error) {
        ToastAndroid.show(error.errors[0].message, ToastAndroid.LONG);
        console.log("Error al obtener las órdenes de trabajo:", error);
      }
    };

    // Llamamos a la función async
    fetchWorkOrders();
  }, []); // Se ejecuta una sola vez cuando el componente se monta

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#ffffff",
          paddingBottom: 8,
          paddingTop: 8,
          paddingHorizontal: 10,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: "#e1e1e1",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Avatar userName="Carlos Mendoza" size={50} />
          <View style={{ gap: 1 }}>
            <Text style={{ fontSize: 17, fontWeight: "500" }}>
              Carlos Daniel
            </Text>
            <Text style={{ marginTop: -3 }}>carlosdaniel@gmail.com</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{ backgroundColor: "#f4f4f5", padding: 10, borderRadius: 12 }}
          onPress={() => console.log("Cerrar sesión")}
        >
          <LogOut size={24} color="#4b4b4b" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          width: "100%",
        }}
      />

      <EmergencyButton
        onPress={() => {
          player.play();
          navigation.reset({ index: 0, routes: [{ name: "EmergencyScreen" }] });
        }}
      />

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          width: "100%",
        }}
      />

      <View style={{ flexDirection: "column", gap: 8 }}>
        <SearchBar onSearch={(query) => console.log("Buscar:", query)} />
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          width: "100%",
        }}
      />

      <FlatList
        data={workOrders}
        renderItem={({ item }) => <WorkOrderItem item={item} />} // Usamos el componente WorkOrder aquí
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
    padding: 10,
    paddingTop: 40,
    paddingBottom: 50,
    gap: 15,
  },
});
