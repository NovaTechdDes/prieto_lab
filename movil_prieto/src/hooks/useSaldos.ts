import { useQuery } from "@tanstack/react-query";
import { getSaldos } from "../actions/saldos.actions";

export const useSaldos = (texto: string) => {
  return useQuery({
    queryKey: ["saldos", texto],
    queryFn: () => getSaldos(texto),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
