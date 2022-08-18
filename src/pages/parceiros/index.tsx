import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import api from "../../services/apiClient";

interface Role {
  id: string;
  name: string;
}
interface Partners {
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

const Parceiro = () => {
  const [partners, setPartners] = useState<Partners[]>([]);

  const fetchData = useCallback(async () => {
    const response = await api.get("/partners");

    const newPartners: any = response.data.map((partner: Partners) => {
      return {
        id: partner.id,
        nome:  partner.name,
        email:  partner.email,
        telefone:  partner.phone,
        documento:  partner.document,
        
        
      }
    })

    setPartners(newPartners);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <Header title="Parceiros" url="parceiro/new" action="Adicionar" />
      {partners.length > 0 && <Table columns={partners} component="parceiro" url="partners" />}
    </>
  );
};

export default Parceiro;
