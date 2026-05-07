import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Buscador from "../components/Buscador";
import CuentaItem from "../components/CuentaItem";
import { useSaldos } from "../hooks/useSaldos";

export default function Index() {
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
    <View>
      <View>
        <FlatList
          refreshing={refresh}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            isLoading ? null : (
              <View style={{ alignItems: "center", marginTop: 50 }}>
                <Text style={{ color: "#94A3B8" }}>
                  No se encontraron saldos
                </Text>
              </View>
            )
          }
          ListHeaderComponent={
            <Buscador
              totalFiltrado={totalFiltrado}
              setTexto={setTexto}
              texto={texto}
            />
          }
          keyExtractor={(item) =>
            item.id_odontologo + item.paciente + item.saldo
          }
          data={data}
          renderItem={({ item }) => <CuentaItem saldo={item} />}
        />
      </View>
    </View>
  );
}
