import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  ChevronLeft,
  Siren,
  ShieldCheck,
  Users,
  Loader,
  ChevronsUpDown,
} from "lucide-react-native";
import Dropdown from "../components/Dropdown";

const Header = ({ order, navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#e1e1e1",
        gap: 10,
      }}
    >
      <TouchableOpacity
        style={{ backgroundColor: "#f4f4f5", padding: 10, borderRadius: 12 }}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft size={24} color="#4b4b4b" />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View style={{ gap: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Orden de Trabajo #{order.id}
          </Text>
          <Text style={{ marginTop: -1 }}>
            {new Date(order.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Content = ({ order }) => {
  return (
    <ScrollView>
      <View style={{ flex: 1, gap: 10 }}>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            backgroundColor: "#ffffff",
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: "#e1e1e1",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#7a7a7b" }}>
            Título
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{order.title}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#e1e1e1",
              borderRadius: 18,
              flexDirection: "row",
              padding: 10,
              gap: 10,
              backgroundColor: "#ffffff",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#e1e1e1",
                padding: 8,
                borderRadius: 14,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e3f2fd", // Fondo azul claro
                borderColor: "#1e88e5", // Borde azul más fuerte
              }}
            >
              <ShieldCheck size={30} color="#1e88e5" />
            </View>
            <View
              styale={{
                flexDirection: "column",
                gap: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 14, color: "#7a7a7b", fontWeight: "500" }}
              >
                Tipo
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", marginTop: -4 }}>
                Preventivo
              </Text>
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#e1e1e1",
              borderRadius: 18,
              flexDirection: "row",
              padding: 10,
              gap: 10,
              backgroundColor: "#ffffff",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#e1e1e1",
                padding: 8,
                borderRadius: 14,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffebee", // Fondo rojo claro
                borderColor: "#e53935", // Borde rojo más fuerte
              }}
            >
              <Siren size={30} color="#e53935" />
            </View>
            <View
              styale={{
                flexDirection: "column",
                gap: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 14, color: "#7a7a7b", fontWeight: "500" }}
              >
                Prioridad
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", marginTop: -4 }}>
                Critica
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            width: "100%",
            backgroundColor: "#ffffff",
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: "#e1e1e1",
            gap: 4,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#7a7a7b" }}>
            Descripción
          </Text>
          <Text style={{ fontSize: 16 }}>{order.description}</Text>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            width: "100%",
          }}
        />

        <View
          style={{
            flexDirection: "column",
            width: "100%",
            backgroundColor: "#ffffff",
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: "#e1e1e1",
            gap: 4,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Ascensor</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400", color: "#ababac" }}>
              Nombre
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Panoramico
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400", color: "#ababac" }}>
              Capacidad
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              12 Personas
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400", color: "#ababac" }}>
              Ubicacion
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Interior
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400", color: "#ababac" }}>
              Nro. de Paradas
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              10
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            width: "100%",
          }}
        />

        <View
          style={{
            flexDirection: "column",
            width: "100%",
            backgroundColor: "#ffffff",
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: "#e1e1e1",
            gap: 4,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Edificio</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#7a7a7b" }}>
              Nombre
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              San Diego
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#7a7a7b" }}>
              Direccion
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Gobernador Centeno 1234
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#7a7a7b" }}>
              Ciudad
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Santa Cruz de la Sierra
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#7a7a7b" }}>
              Administrador
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Juan Perez
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            width: "100%",
          }}
        />

        <Dropdown
          options={["Asignada", "En Progreso", "Completada"]}
          onSelect={() => {
            console.log("Estado cambiado");
          }}
        />
      </View>
    </ScrollView>
  );
};

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Fin de la Orden de Trabajo</Text>
    </View>
  );
};

export default function WorkOrderScreen({ route, navigation }) {
  // Recibimos los datos de la orden de trabajo desde la propiedad "order"
  const { order } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header order={order} navigation={navigation} />

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          width: "100%",
        }}
      />

      <Content order={order} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
    flexDirection: "column",
    padding: 10,
    paddingTop: 40,
    paddingBottom: 50,
    gap: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "semibold",
  },
  detailsContainer: {
    width: "100%",
    marginTop: 20,
  },
  detailItem: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555555",
  },
  detailValue: {
    fontSize: 16,
    color: "#333333",
  },
});
