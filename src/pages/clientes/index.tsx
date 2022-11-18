import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import api from "../../services/apiClient";
import DataTable from "../../components/Datatable";

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
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
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
  const columns = [

    {
      field: "nome",
      headerName: "Nome",
      width: 220,

    },
    {
      field: "email",
      headerName: "E-mail",
      width: 180,

    },
    {
      field: "telefone",
      headerName: "Telefone",
      width: 150,

    },
    {
      field: "documento",
      headerName: "Documento",
      width: 150,
    },
  
  ]
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Header title="Clientes" url="cliente" action="Adicionar" />
      <DataTable rows={clients} columns={columns} component="cliente" url="clients"  />
    </>
  );
};

export default Cliente;
