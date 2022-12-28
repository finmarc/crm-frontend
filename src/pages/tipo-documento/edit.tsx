import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/apiClient";
import { Form } from "./Form";
import { TipoDocumento } from "./interface/tipo-documento";

const TipoDocumentoEdit = () => {
  const [document, setDocument] = useState<TipoDocumento>();

  let { id } = useParams<any>();
  const fetchData = useCallback(async () => {
    const response = await api.get(`/document-types/${id}`);
    const { data } = response;

    setDocument(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
      <Form document={document} title="Editar Documento" />
  );
};

export default TipoDocumentoEdit;
