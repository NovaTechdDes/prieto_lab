import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Saldo } from "../interface/Saldo";

interface Props {
  saldo: Saldo;
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
};

export default function CuentaItem({ saldo }: Props) {
  const { colors, isDark } = useTheme();

  const totalBalance = useMemo(() => {
    return saldo.paciente.reduce((acc, p) => acc + p.saldo, 0);
  }, [saldo.paciente]);

  const isPositive = totalBalance >= 0;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: isDark ? "#000" : "#64748b",
          },
        ]}
      >
        {/* Status Indicator Bar */}
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: isPositive ? "#10b981" : "#ef4444" },
          ]}
        />

        {/* Header: Odontólogo */}
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: isDark
                  ? "rgba(241, 136, 37, 0.15)"
                  : "rgba(241, 136, 37, 0.08)",
              },
            ]}
          >
            <Ionicons name="medkit" size={18} color={colors.primary} />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.doctorLabel, { color: colors.textMuted }]}>
              Odontólogo
            </Text>
            <Text
              style={[styles.doctorName, { color: colors.text }]}
              numberOfLines={1}
            >
              {saldo.nom_odontologo}
            </Text>
          </View>
        </View>

        {/* Body: List of Patients */}
        <View style={styles.body}>
          {saldo.paciente.map((item, index) => (
            <View key={`${item.nombre_paciente}-${index}`} style={styles.patientRow}>
              <View style={styles.patientInfo}>
                <Ionicons
                  name="person-outline"
                  size={14}
                  color={colors.textMuted}
                  style={styles.patientIcon}
                />
                <Text
                  style={[styles.patientName, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {item.nombre_paciente}
                </Text>
              </View>
              <Text
                style={[
                  styles.patientBalance,
                  { color: item.saldo >= 0 ? "#10b981" : "#ef4444" },
                ]}
              >
                {formatCurrency(item.saldo)}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer: Total Balance */}
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Text style={[styles.totalLabel, { color: colors.textMuted }]}>
            SALDO TOTAL
          </Text>
          <Text
            style={[
              styles.totalValue,
              { color: isPositive ? "#10b981" : "#ef4444" },
            ]}
          >
            {formatCurrency(totalBalance)}
          </Text>
        </View>
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
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    paddingLeft: 20, // Extra padding for the status bar
    position: "relative",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  statusIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  doctorLabel: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  body: {
    marginBottom: 8,
  },
  patientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(148, 163, 184, 0.1)",
  },
  patientInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  patientIcon: {
    marginRight: 8,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "500",
  },
  patientBalance: {
    fontSize: 14,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
});
