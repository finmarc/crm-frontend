import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import SearchFilter from "../../components/SearchFilter";
import { Table } from "../../components/Table";
import api from "../../services/apiClient";

interface Clients {
  id: string;
  name: string;
  document: string;
  email: string;
  fone: string;
  birth_date: Date;
  rg?: string;
  sexo?: string;
  address?: string;
  description?: string;
  seller_id?: string;
}

const Cliente = () => {
  const [clients, setClients] = useState<Clients[]>([]);

  const fetchData = useCallback(async () => {
    const response = await api.get("/clients");

    const newClient: any = response.data.map((client: Clients) => {
      return {
        id: client.id,
        nome: client.name,
        email: client.email,
        telefone: client.fone,
        documento: client.document,
      };
    });

    setClients(newClient);
  }, []);
  const theadTitles = ["id", "Nome", "Email", "Telefone", "CPF"];
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <SearchFilter />
      <Header title="Clientes" url="cliente" action="Adicionar" />
      {clients.length > 0 && (
        <Table
          titles={theadTitles}
          columns={clients}
          component="cliente"
          url="clients"
        />
      )}
    </>
  );
};

export default Cliente;
