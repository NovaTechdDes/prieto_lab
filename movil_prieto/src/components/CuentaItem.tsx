import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Saldo } from "../interface/Saldo";
import { useTheme } from "../hooks/useTheme";

interface Props {
  saldo: Saldo;
}

export default function CuentaItem({ saldo }: Props) {
  const { colors, isDark } = useTheme();
  const isPositive = saldo.saldo >= 0;

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {/* Header: Odontólogo como figura central */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: isDark ? "rgba(241, 136, 37, 0.15)" : "rgba(13, 148, 136, 0.08)" }]}>
            <Ionicons name="medkit-outline" size={18} color={isDark ? colors.accent : "#0D9488"} />
          </View>
          <Text style={[styles.doctorName, { color: colors.text }]} numberOfLines={1}>
            {saldo.nom_odontologo}
          </Text>
        </View>

        {/* Content: Relación técnica Paciente - Deuda */}
        <View style={styles.body}>
          <View style={styles.patientRow}>
            <Ionicons name="person-outline" size={14} color={colors.textMuted} />
            <Text style={[styles.patientLabel, { color: colors.textMuted }]}>Paciente:</Text>
            <Text style={[styles.patientName, { color: colors.text }]}>{saldo.paciente}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.balanceRow}>
            <Text style={[styles.balanceLabel, { color: colors.textMuted }]}>Saldo Pendiente</Text>
            <Text
              style={[
                styles.balanceValue,
                { color: "#0D9488" },
                !isPositive && { color: "#E11D48" },
              ]}
            >
              $
              {saldo.saldo.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

        {/* Indicador lateral de estado clínico */}
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: isPositive ? "#0D9488" : "#E11D48" },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  statusIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    letterSpacing: -0.3,
  },
  body: {
    paddingLeft: 2,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  patientLabel: {
    fontSize: 13,
    marginLeft: 6,
    marginRight: 4,
  },
  patientName: {
    fontSize: 13,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
});
