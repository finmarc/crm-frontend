import { UserX } from "lucide";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../services/apiClient";
import { Form } from "./Form";
import { Partners } from "./interface/partners";



const PartnerEdit = () => {
  const [partner, setPartner] = useState<Partners>();

  let { id } = useParams<any>();
  const fetchData = useCallback(async () => {
    const response = await api.get(`/partners/${id}`);
    const { data } = response;
   
    setPartner(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {partner && (<Form partner={partner} title="Editar parceiro" />)}
    </>
  );
};

export default PartnerEdit;
