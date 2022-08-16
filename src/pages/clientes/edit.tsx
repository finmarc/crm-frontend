import { UserX } from "lucide";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../services/apiClient";
import { Form } from "./Form";
import { Clients } from "./interface/clients";




const ClientEdit = () => {
  const [client, setClient] = useState<Clients>();

  let { id } = useParams<any>();
  const fetchData = useCallback(async () => {
    const response = await api.get(`/clients/${id}`);
    const { data } = response;
    let date = new Date('2019-12-12');
    const dateFormat = new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(date);
    // data.birth_date = dateFormat
    console.log(data)
    
    setClient(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {client && (<Form client={client} title="Editar cliente" />)}
    </>
  );
};

export default ClientEdit;
