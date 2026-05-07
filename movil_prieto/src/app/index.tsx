import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Buscador from "../components/Buscador";
import CuentaItem from "../components/CuentaItem";
import { useSaldos } from "../hooks/useSaldos";
import { useTheme } from "../hooks/useTheme";

export default function Index() {
  const { colors } = useTheme();
  const version = Constants.expoConfig?.version;

  const [texto, setTexto] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [totalFiltrado, setTotalFiltrado] = useState<number | null>(null);

  const { data, isLoading, refetch } = useSaldos(texto);

  const handleRefresh = async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
  };

  useEffect(() => {
    if (!isLoading) {
      const total = data?.reduce((acc, item) => acc + item.saldo, 0);
      setTotalFiltrado(total || 0);
    }
  }, [data, isLoading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Buscador
        totalFiltrado={totalFiltrado}
        setTexto={setTexto}
        texto={texto}
      />
      <FlatList
        refreshing={refresh}
        onRefresh={handleRefresh}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          isLoading ? null : (
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={{ color: colors.textMuted }}>
                No se encontraron saldos
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <View
              style={[styles.footerLine, { backgroundColor: colors.border }]}
            />
            <Text style={[styles.versionText, { color: colors.textMuted }]}>
              Prieto Lab • v{version}
            </Text>
          </View>
        }
        keyExtractor={(item) => item.id_odontologo + item.paciente + item.saldo}
        data={data}
        renderItem={({ item }) => <CuentaItem saldo={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  footerLine: {
    width: 40,
    height: 1,
    marginBottom: 12,
  },
  versionText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
