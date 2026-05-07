import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

interface Props {
  texto: string;
  totalFiltrado: number | null;
  setTexto: (texto: string) => void;
}

export default function Buscador({ texto, totalFiltrado, setTexto }: Props) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.searchSection,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
          isFocused && { borderColor: colors.accent },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={isFocused ? colors.accent : colors.icon}
          style={styles.searchIcon}
        />

        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Buscar odontólogo..."
          placeholderTextColor={colors.placeholder}
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
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.totalContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.totalInfo}>
          <View style={[styles.totalIconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Ionicons name="calculator-outline" size={16} color={colors.icon} />
          </View>
          <Text style={[styles.totalLabel, { color: colors.textMuted }]}>Total Filtrado</Text>
        </View>

        <Text
          style={[
            styles.totalValue,
            { color: "#0D9488" }, // Mantener teal para positivo por claridad clínica
            totalFiltrado !== null && totalFiltrado < 0 && { color: "#E11D48" },
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
    paddingTop: 50, // Aumentado para SafeArea
    paddingBottom: 10,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: "100%",
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
  },
  totalContainer: {
    marginTop: 16,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },
  totalInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
});
