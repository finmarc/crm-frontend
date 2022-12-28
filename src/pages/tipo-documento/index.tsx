import { useCallback, useEffect, useState } from "react";
import DataTable from "../../components/Datatable";
import api from "../../services/apiClient";
import { TipoDocumento } from "./interface/tipo-documento";

interface Partners {
  id: string;
  name: string;

}

const Parceiro = () => {
  const [document, setDocument] = useState<TipoDocumento[]>([]);
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  const fetchData = useCallback(async () => {
    const response = await api.get("/document-types");

    const newDocuments: any = response.data.map((document: TipoDocumento) => {
      return {
        id: document.id,
        nome: document.name,

      };
    });

    setDocument(newDocuments);
  }, []);

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      width: 220,
    }
  ];
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <DataTable
      rows={document}
      hideButtonView
      columns={columns}
      component="tipo-documento"
      title="TIPOS DE DOCUMENTO"
      url="document-types"
    />
  );
};

export default Parceiro;
