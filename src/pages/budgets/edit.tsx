import { useEffect, useState, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import api from "../../services/apiClient";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@/base-components";
import { SubmitHandler } from "@unform/core";
import CardUpload from "../../components/CardUpload";
import toast from "react-hot-toast";
import ButtonGoBack from "../../components/Button/backto";
import Form from "./Form";
import FormObservacao from "./FormObs";
import FormFuncionario from "./Funcionarios";
import { Documents } from "./interfaces/budget";

export interface BudgetEdit {
  id?: string;
  type_id?: string;
  client_id: string;
  partner_id?: string;
  product_id: string;
  status_id?: string;
  amount_loan: number;
  description?: string;
  observation?: string;
}


const EditBudget = () => {
  const { id } = useParams<any>();
  const location = useLocation();
  const history = useHistory();

  const [initialDataBudget, setInitialDataBudget] = useState<BudgetEdit>();
  const [documents, setDocuments] = useState<Documents[]>([]);
  const [documentTypes, setDocumentTypes] = useState<any[]>([]);
  const [filename, setFilename] = useState("")
  const [cardInput, setCardInput] = useState<number>()
  const isDisabled = location.pathname.includes("visualizar");
  const [tabActive, setTabActive] = useState("geral")

  function typesDocuments() {
     api
      .get("/budgets/documents/types")
      .then(reponse => {
        setDocumentTypes(reponse.data)
     });
  }

  useEffect(() => {
    api.get(`/budgets/${id}`)
    .then((response) => {
      const { data } = response;
      setDocuments(data?.documents);
      setInitialDataBudget({
        type_id: data?.type?.id,
        client_id: data?.client?.id,
        product_id: data?.product?.id,
        status_id: data?.status?.id,
        partner_id: data?.partner?.id,
        observation: data?.observation,
        description: data?.description,
        amount_loan: data?.amount_loan
      });

    });

    typesDocuments()
  }, []);

  const handleSubmit: SubmitHandler<BudgetEdit> = async (data) => {
    const response = await api.patch(`budgets/${id}`, data);
    const { status } = response;
    if (status == 200) {
      toast.success("Atualizado  com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      history.push("/orcamentos");
    } else {
      toast.error("Ops! Algo deu errado", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  function handleTabActive(tab: string){
    setTabActive(tab)
  } 
  const handleSubmitFiles = (file: FileList, index: any) => {
    const fileUpload = file[0];
    setFilename(fileUpload.name);
    setCardInput(index);

    const formData = new FormData();
    formData.append("type", index);
    formData.append("budget_id", id);
    formData.append("file", fileUpload);

    api
      .post("budgets/documents", formData)
      .then((res) => {
        toast.success("Upload realizado com sucesso!", {
          duration: 4000,
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error("Ops! Algo deu errado ao fazer upload", {
          duration: 4000,
          position: "top-right",
        });
      });
  }

  const handleRemoveDocument = (id: string) => {
    api
      .delete(`budgets/documents/${id}`)
      .then((res) => {
        toast.success("Documento com sucesso!", {
          duration: 4000,
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error("Ops! Algo deu errado ao fazer upload", {
          duration: 4000,
          position: "top-right",
        });
      });
  }

  const cardTitles = [
    "Contrato Social e última Alteração Contratual consolidada",
    "CNH ou RG e CPF",
    "Comprovante de residência",
    "IRPF e recibo de entrega",
    "Faturamento dos últimos 12 meses",
    "Referências (Email, contato e 2 referências)",
    `Certidão de nascimento ou casamento (Se casado, anexar os documentos do cônjuge) ${`;`} Pacto antenupcial – se aplicável`,
    "ECF e recibo de entrega (Obs: para empresas de lucro presumido.)",
    "Cartão CNPJ",
  ];

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto"> {isDisabled ? "Visualizar" : "Editar"} orçamento</h2>
        <ButtonGoBack route={"/orcamentos"} />
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="p-5">
              <TabGroup>
                <TabList className="nav-boxed-tabs">
                  <Tab className="w-full py-2" tag="button">
                    Dados gerais
                  </Tab>
                  <Tab className="w-full py-2" tag="button">
                    Funcionários
                  </Tab>
                  <Tab className="w-full py-2" tag="button">
                    Observação
                  </Tab>
                  <Tab className="w-full py-2" tag="button">
                    Documentos
                  </Tab>
                </TabList>
                <TabPanels className="mt-5">
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y box">
                      <div className="p-5">
                        {initialDataBudget?.type_id && (
                          <Form isDisabled={isDisabled} initialData={initialDataBudget} handleSubmit={handleSubmit} />
                        )}
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y box">
                      <div className="p-5">
                        <FormFuncionario  />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y box">
                      <div className="p-5">
                        <FormObservacao isDisabled={isDisabled} initialData={initialDataBudget?.observation}  />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y col-span-12 lg:col-span-6">
                      <div className="flex justify-center items-center w-full">
                        <div className="container grid lg:grid-cols-3 gap-2 ">
                          {documentTypes.length > 0 && documentTypes.map((type) => {
                            return (
                              <CardUpload
                                key={type.id}
                                documents={documents}
                                onChange={(e: any) => handleSubmitFiles(e.currentTarget.files, type.id)}
                                onRemove={handleRemoveDocument}
                                cardInput={cardInput}
                                id={type.id}
                                filename={filename}
                                description={type.name}
                                titleIndex={type.name}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBudget;
