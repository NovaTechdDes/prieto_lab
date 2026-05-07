import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Saldo } from "../interface/Saldo";

interface Props {
  saldo: Saldo;
}

export default function CuentaItem({ saldo }: Props) {
  const isPositive = saldo.saldo >= 0;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header: Odontólogo como figura central */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="medkit-outline" size={18} color="#0D9488" />
          </View>
          <Text style={styles.doctorName} numberOfLines={1}>
            {saldo.nom_odontologo}
          </Text>
        </View>

        {/* Content: Relación técnica Paciente - Deuda */}
        <View style={styles.body}>
          <View style={styles.patientRow}>
            <Ionicons name="person-outline" size={14} color="#64748B" />
            <Text style={styles.patientLabel}>Paciente:</Text>
            <Text style={styles.patientName}>{saldo.paciente}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Saldo Pendiente</Text>
            <Text
              style={[
                styles.balanceValue,
                !isPositive && styles.negativeBalance,
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
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(13, 148, 136, 0.1)",
    padding: 16,
    position: "relative",
    overflow: "hidden",
    // Elevación suave (Sombra tipo Vercel/Linear)
    shadowColor: "#0D9488",
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
    backgroundColor: "rgba(13, 148, 136, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
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
    color: "#64748B",
    marginLeft: 6,
    marginRight: 4,
  },
  patientName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#334155",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.03)",
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
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0D9488",
    letterSpacing: -0.5,
  },
  negativeBalance: {
    color: "#E11D48",
  },
});
