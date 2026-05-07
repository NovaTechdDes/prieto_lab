import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  texto: string;
  totalFiltrado: number | null;
  setTexto: (texto: string) => void;
}

export default function Buscador({ texto, totalFiltrado, setTexto }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[styles.searchSection, isFocused && styles.searchSectionFocused]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={isFocused ? "#0D9488" : "#94A3B8"}
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.input}
          placeholder="Buscar odontólogo..."
          placeholderTextColor="#94A3B8"
          value={texto}
          onChangeText={setTexto}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          underlineColorAndroid="transparent"
        />

        {texto.length > 0 && (
          <TouchableOpacity
            onPress={() => setTexto("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={18} color="#CBD5E1" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.totalContainer}>
        <View style={styles.totalInfo}>
          <View style={styles.totalIconContainer}>
            <Ionicons name="calculator-outline" size={16} color="#64748B" />
          </View>
          <Text style={styles.totalLabel}>Total Filtrado</Text>
        </View>

        <Text
          style={[
            styles.totalValue,
            totalFiltrado !== null && totalFiltrado < 0 && styles.totalValueNegative,
          ]}
        >
          $
          {totalFiltrado?.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 12,
    height: 48,
    // Sombra sutil para dar profundidad
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  searchSectionFocused: {
    borderColor: "#0D9488",
    borderWidth: 1.5,
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    height: "100%",
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
  },
  totalContainer: {
    marginTop: 16,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  totalInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0D9488",
    letterSpacing: -0.5,
  },
  totalValueNegative: {
    color: "#E11D48",
  },
});
