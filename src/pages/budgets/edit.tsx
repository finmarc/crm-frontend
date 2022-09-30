import { useCallback, useEffect, useState, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import api from "../../services/apiClient";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@/base-components";
import { Form } from "@unform/web";
import { SubmitHandler, FormHandles } from "@unform/core";
import classnames from "classnames";
import CardUpload from "../../components/CardUpload";
import toast from "react-hot-toast";
import SelectCustom from "../../components/Inputs/Select";
import InputText from "../../components/Inputs/InputText";

import {
  Client,
  Partner,
  Product,
  Status,
  Types,
} from "./interfaces/budget";
import TextArea from "../../components/Inputs/TextArea";
import InputMaskMoney from "../../components/Inputs/InputMaskMoney";
import ButtonGoBack from "../../components/Button/backto";

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
  const formRef = useRef<FormHandles>(null);

  const [clients, setClients] = useState<Client[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [types, setTypes] = useState<Types[]>([]);
  const [initialDataBudget, setInitialDataBudget] = useState<BudgetEdit>();

  const { id } = useParams<any>();
  const location = useLocation();
  const history = useHistory();

  const isDisabled = location.pathname.includes("visualizar");


  const initialDataSelect = useCallback(async () => {
    const responseClients = await api.get("/clients");
    const responseProducts = await api.get("/products");
    const responsePartners = await api.get("/partners");
    const responseStatus = await api.get("/budget/status");
    const responseTypes = await api.get("/budget/types");

    setClients(responseClients?.data);
    setProducts(responseProducts?.data);
    setPartners(responsePartners?.data);
    setStatus(responseStatus?.data);
    setTypes(responseTypes?.data);
  }, []);

  useEffect(() => {
    initialDataSelect();
  }, []);

  useEffect(() => {
    api.get(`/budgets/${id}`).then((response) => {
      const { data } = response;

      setInitialDataBudget({
        type_id: data?.type.id,
        client_id: data?.client.id,
        product_id: data?.product.id,
        status_id: data?.status.id,
        partner_id: data?.partner.id,
        observation: data?.observation,
        description: data?.description,
        amount_loan:  data?.amount_loan
      });
    });
  }, [id]);

  
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
        <ButtonGoBack route={"/orcamentos"}/>
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="p-5">
              <TabGroup>
                <TabList className="nav-boxed-tabs">
                  <Tab className="w-full py-2" tag="button">
                    Geral
                  </Tab>
                  <Tab className="w-full py-2" tag="button">
                    Documentos
                  </Tab>
                  <Tab className="w-full py-2" tag="button">
                    Historico
                  </Tab>
                </TabList>
                <TabPanels className="mt-5">
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y box">
                      <div className="p-5">
                        {initialDataBudget && (
                          <Form
                            ref={formRef}
                            initialData={initialDataBudget}
                            onSubmit={handleSubmit}
                            
                          >
                            <div className="input-form">
                              <SelectCustom
                                disabled={isDisabled}
                                className={classnames({
                                  "form-control": true,
                                })}
                                label="Tipo de serviço"
                                name="type_id"
                                options={types}
                              />
                            </div>
                            <div className="input-form mt-3">
                              <SelectCustom
                                disabled={isDisabled}
                                className={classnames({
                                  "form-control": true,
                                })}
                                label="Cliente"
                                name="client_id"
                                options={clients}
                              />
                            </div>

                            <div className="input-form mt-3">
                              <SelectCustom
                                disabled={isDisabled}
                                className={classnames({
                                  "form-control": true,
                                })}
                                label="Produto/Serviço"
                                name="product_id"
                                options={products}
                              />
                            </div>
                            <div className="input-form mt-3">
                              <SelectCustom
                                disabled={isDisabled}
                                className={classnames({
                                  "form-control": true,
                                })}
                                label="Parceiro"
                                name="partner_id"
                                options={partners}
                              />
                            </div>
                            <div className="input-form mt-3">
                              <SelectCustom
                                disabled={isDisabled}
                                className={classnames({
                                  "form-control": true,
                                })}
                                label="Situação"
                                name="status_id"
                                options={status}
                              />
                            </div>
                            <div className="input-form mt-3">
                              <InputMaskMoney
                                disabled={isDisabled}
                                mask="currency"
                                name="amount_loan"
                                label="Valor do empréstimo"
                                placeholder="0,00"
                                classname="form-control"
                              />
                            </div>
                            <div className="input-form mt-3">
                              <InputText
                                name="description"
                                disabled={isDisabled}
                                label="Descrição"
                                placeholder="Decrição"
                                classname="form-control"
                              />
                            </div>
                            <div className="input-form mt-3">
                              <TextArea
                                disabled={isDisabled}
                                name="observation"
                                label="Observações"
                                placeholder="Observações"
                                classname="form-control"
                              />
                            </div>
                            {!isDisabled && (<button
                              type="submit"
                              className="btn btn-primary mt-5"
                            >
                              Salvar
                            </button>)}
                          </Form>
                        )}
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y col-span-12 lg:col-span-6">
                      <div className="flex justify-center items-center w-full">
                        <div className="container grid lg:grid-cols-3 gap-2 ">
                          {cardTitles.map((title, index) => {
                            return (
                              <CardUpload
                                key={index}
                                id={index}
                                description={title}
                                titleIndex={index}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y box">
                      <div className="p-5">
                        <ol className="relative border-l border-gray-200 dark:border-gray-700">
                          <li className="mb-10 ml-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                              03/08/2022 12:00 - Luciano Dias
                            </time>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Em análise
                            </h3>
                            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                              Get access to over 20+ pages including a dashboard
                              layout, charts, kanban board, calendar, and
                              pre-order E-commerce &amp; Marketing pages.
                            </p>
                          </li>
                          <li className="mb-10 ml-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                              03/08/2022 15:00 - Luciano Dias
                            </time>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Pendente de documentação
                            </h3>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                              All of the pages and components are first designed
                              in Figma and we keep a parity between the two
                              versions even as we update the project.
                            </p>
                          </li>
                          <li className="ml-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                              04/08/2022 09:00 - Luciano Dias
                            </time>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Enviado para análise com banco
                            </h3>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                              Get started with dozens of web components and
                              interactive elements built on top of Tailwind CSS.
                            </p>
                          </li>
                        </ol>
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
