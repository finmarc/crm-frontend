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

  const [initialDataBudget, setInitialDataBudget] = useState<any>();
  const [documents, setDocuments] = useState<Documents[]>([]);
  const [documentTypes, setDocumentTypes] = useState<any[]>([]);
  const isDisabled = location.pathname.includes("visualizar");
  const [selectedIndex, setSelectedIndex] = useState<any>(0);

  function getBudget() {
    api.get(`/budgets/${id}`).then((response) => {
      const { data } = response;
      setDocuments(data?.documents);
      data?.product.types.forEach((data: any) => {
        setDocumentTypes((prevItems) => [...prevItems, data.documentType]);
      });
      setInitialDataBudget({
        type_id: data?.type?.id,
        client_id: data?.client?.id,
        client: data?.client,
        product_id: data?.product?.id,
        status_id: data?.status?.id,
        partner_id: data?.partner?.id,
        observation: data?.observation,
        description: data?.description,
        amount_loan: data?.amount_loan,
      });
    });
  }

  useEffect(() => {
    getBudget();
  }, []);

  const handleSubmit: SubmitHandler<any> = async (data) => {
    const response = await api.patch(`budgets/${id}`, data);
    const { status } = response;
    if (status == 200) {
      toast.success("Atualizado com sucesso!", {
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

  const handleSubmitFiles = (e: any, files: FileList, index: number) => {
    e.preventDefault();

    let count = 0;
    for (let i = 0; i <= files.length; i++) {
      const fileUpload = files[i];

      const formData = new FormData();
      formData.append("type", String(index));
      formData.append("budget_id", id);
      formData.append("file", fileUpload);

      api
        .post("budgets/documents", formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }})
        .then((res) => {
          setSelectedIndex(3);
          setDocuments((prevItems) => [...prevItems, res?.data]);
          count++;
        })
        .catch((err) => {
          toast.error("Ops! Algo deu errado ao fazer upload", {
            duration: 4000,
            position: "top-right",
          });
        })
        .finally(() => {
          if (count === files.length) {
            toast.success("Upload realizado com sucesso!", {
              duration: 4000,
              position: "top-right",
            });
          }
        });
    }

    // const formData = new FormData();
    // formData.append("type", String(index));
    // formData.append("budget_id", id);
    // formData.append("file", fileUpload);

    // api
    //   .post("budgets/documents", formData)
    //   .then((res) => {
    //     setDocuments(prevItems => [...prevItems, res?.data])
    //     toast.success("Upload realizado com sucesso!", {
    //       duration: 4000,
    //       position: "top-right",
    //     });
    //     return;
    //   })
    //   .catch((err) => {
    //     toast.error("Ops! Algo deu errado ao fazer upload", {
    //       duration: 4000,
    //       position: "top-right",
    //     });
    //   });
  };

  const handleRemoveDocument = (id: string) => {
    const newArraydocuments = documents.filter((doc) => doc.document.id !== id);
    setDocuments(newArraydocuments);
    api
      .delete(`budgets/documents/${id}`)
      .then((res) => {
        setSelectedIndex(3);
        toast.success("Documento deletado com sucesso!", {
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
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          {" "}
          {isDisabled ? "Visualizar" : "Editar"} orçamento
        </h2>
        <ButtonGoBack route={"/orcamentos"} />
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="p-5">
              <TabGroup selectedIndex={selectedIndex}>
                <TabList className="nav-boxed-tabs">
                  <Tab className="w-full py-2 geral" tag="button">
                    Dados gerais
                  </Tab>
                  <Tab className="w-full py-2 funcionario" tag="button">
                    Funcionários
                  </Tab>
                  <Tab className="w-full py-2 obs" tag="button">
                    Observação
                  </Tab>
                  <Tab id="doc" className="w-full py-2 docs" tag="button">
                    Documentos
                  </Tab>
                </TabList>
                <TabPanels className="mt-5">
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y box">
                      <div className="p-5">
                        {initialDataBudget?.type_id && (
                          <Form
                            isDisabled={isDisabled}
                            initialData={initialDataBudget}
                            handleSubmit={handleSubmit}
                          />
                        )}
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y box">
                      <div className="p-5">
                        <FormFuncionario />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y box">
                      <div className="p-5">
                        <FormObservacao
                          isDisabled={isDisabled}
                          initialData={initialDataBudget?.observation}
                        />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y col-span-12 lg:col-span-6">
                      <div className="flex justify-center items-center w-full">
                        <div className="container grid lg:grid-cols-3 gap-2 ">
                          {documentTypes.length > 0 &&
                            documentTypes.map((type) => {
                              return (
                                <CardUpload
                                  key={type.id}
                                  documents={documents}
                                  onChange={handleSubmitFiles}
                                  onRemove={handleRemoveDocument}
                                  id={type.id}
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
