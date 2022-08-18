import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import api from "../../services/apiClient";

interface Role {
  id: string;
  name: string;
}
interface Clients {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  birth_date: Date,
  rg?:string,
  sexo?:string,
  address?:string,
  description?:string,
  seller_id?:string,
  
}

const Cliente = () => {
  const [clients, setClients] = useState<Clients[]>([]);

  const fetchData = useCallback(async () => {
    const response = await api.get("/clients");

    const newClient: any = response.data.map((client: Clients) => {
      return {
        id: client.id,
        nome:  client.name,
        email:  client.email,
        telefone:  client.phone,
        documento:  client.document,
        
        
      }
    })

    setClients(newClient);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <Header title="Clientes" url="cliente/new" action="Adicionar" />
      {clients.length > 0 && <Table columns={clients} component="cliente" url="clients" />}
    </>
  );
};

export default Cliente;
