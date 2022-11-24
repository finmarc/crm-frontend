import { useCallback, useEffect, useState } from "react";
import DataTable from "../../components/Datatable";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import api from "../../services/apiClient";

interface Partners {
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

const Parceiro = () => {
  const [partners, setPartners] = useState<Partners[]>([]);
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  const fetchData = useCallback(async () => {
    const response = await api.get("/partners");

    const newPartners: any = response.data.map((partner: Partners) => {
      return {
        id: partner.id,
        nome: partner.name,
        email: partner.email,
        telefone: partner.fone,
        documento: partner.document,
      };
    });

    setPartners(newPartners);
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
  ];
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <DataTable
        rows={partners}
        columns={columns}
        component="parceiro"
        url="parceiros"
      />
    </>
  );
};

export default Parceiro;
