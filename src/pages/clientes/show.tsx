import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Lucide } from "@/base-components";
import { faker as $f } from "@/utils";
import api from "../../services/apiClient";
import { Clients } from "./interface/clients";


interface Role {
  id: string;
  name: string;
}


const ClientDetails = () => {
  const [client, setClient] = useState<Clients>();
  const history = useHistory();

  let { id } = useParams<any>();
  const fetchData = useCallback(async () => {
    const response = await api.get(`/clients/${id}`);
    const { data } = response;
   
    setClient(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
 
  return (
    <>
      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Detalhes do cliente</h2>
     
          <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
            <button className="btn btn-primary shadow-md mr-2" onClick={() => history.goBack()}>
              Voltar
            </button>
          </div>
   
      </div>
      <div className="intro-y box px-5 pt-5 mt-5">
        <div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
          <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
              <img
                alt="Midone Tailwind HTML Admin Template"
                className="rounded-full"
                src={$f()[0].photos[0]}
              />
              <div className="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2">
                <Lucide icon="Camera" className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="ml-5">
              <div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                {client?.name}
              </div>
              <div className="text-slate-500"></div>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
            <div className="font-medium text-center lg:text-left lg:mt-3">
              Contato
            </div>
            <div className="flex flex-col justify-center items-center lg:items-start mt-4">
              <div className="truncate sm:whitespace-normal flex items-center">
                <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                {client?.email}
              </div>
              <div className="truncate sm:whitespace-normal flex items-center mt-3">
                <Lucide icon="Phone" className="w-4 h-4 mr-2" /> 
                {client?.fone}
              </div>
              <div className="truncate sm:whitespace-normal flex items-center mt-3">
                <Lucide icon="File" className="w-4 h-4 mr-2" /> 
                {client?.document}
              </div>
            </div>
          </div>

        </div>

      </div>

    </>
  );
};

export default ClientDetails;
