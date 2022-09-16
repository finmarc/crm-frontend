import * as yup from "yup";
import { useCallback, useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../services/apiClient";
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  // Dropzone
} from "@/base-components";
import { SubmitHandler, useForm } from "react-hook-form";
import Budget, {
  Client,
  Partner,
  Product,
  Status,
  Types,
} from "./interfaces/budget";
import classnames from "classnames";

import { yupResolver } from "@hookform/resolvers/yup";
import UploadButtonComponent from "../../components/UploadButtonComponent";
import CardUpload from "../../components/CardUpload";
const EditBudget = () => {
  // const dropzoneMultipleRef = useRef();

  const [clients, setClients] = useState<Client[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [types, setTypes] = useState<Types[]>([]);
  const [budget, setBudget] = useState<any>();

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

  const history = useHistory();

  const schema = yup
    .object({
      client_id: yup.string().required(),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<Budget> = async (data: Budget) => {
    // let response;
    // response = await api.post("budgets", data);
    // const { status } = response;
    // if (status == 201) {
    //   toast.success("Cadastro realizado com sucesso!", {
    //     duration: 4000,
    //     position: "top-right",
    //   });
    //   history.push("/orcamentos")
    // } else {
    //   toast.error("Ops! Algo deu errado", {
    //     duration: 4000,
    //     position: "top-right",
    //   });
    // }
  };

  let { id } = useParams<any>();
  const fetchData = useCallback(async () => {
    const response = await api.get(`/budgets/${id}`);
    const { data } = response;

    setBudget(data);
  }, []);

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

  useEffect(() => {
    fetchData();
    initialDataSelect();
    // const elDropzoneMultipleRef:any = dropzoneMultipleRef.current;
    // elDropzoneMultipleRef.dropzone.on("success", () => {
    //   alert("Added file.");
    // });
    // elDropzoneMultipleRef.dropzone.on("error", () => {
    //   alert("No more files please!");
    // });
  }, []);

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto"> Editar orçamento </h2>
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
                        <form
                          className="validate-form"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="input-form">
                            <label
                              htmlFor="validation-form-3"
                              className="form-label w-full flex flex-col sm:flex-row"
                            >
                              Tipo
                            </label>
                            <select
                              className={classnames({
                                "form-select": true,
                                "border-danger": errors?.client_id,
                              })}
                              id="type_id"
                              {...register("type_id")}
                            >
                              <option>Selecione um tipo</option>
                              {types.map((type) => (
                                <option
                                  selected={budget.type.id === type.id}
                                  key={type.id}
                                  value={type.id}
                                >
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="input-form mt-3">
                            <label
                              htmlFor="validation-form-3"
                              className="form-label w-full flex flex-col sm:flex-row"
                            >
                              Cliente
                            </label>
                            <select
                              className={classnames({
                                "form-select": true,
                                "border-danger": errors?.client_id,
                              })}
                              id="client_id"
                              {...register("client_id")}
                            >
                              <option>Selecione um cliente</option>
                              {clients.map((client) => (
                                <option
                                  selected={budget.client.id === client.id}
                                  key={client.id}
                                  value={client.id}
                                >
                                  {client.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="input-form mt-3">
                            <label
                              htmlFor="validation-form-3"
                              className="form-label w-full flex flex-col sm:flex-row"
                            >
                              Produto/Serviço
                            </label>
                            <select
                              className={classnames({
                                "form-select": true,
                                "border-danger": errors?.product_id,
                              })}
                              id="product_id"
                              {...register("product_id")}
                            >
                              <option>Selecione um produto</option>
                              {products.map((product) => (
                                <option
                                  selected={budget.product.id === product.id}
                                  key={product.id}
                                  value={product.id}
                                >
                                  {product.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="input-form mt-3">
                            <label
                              htmlFor="validation-form-3"
                              className="form-label w-full flex flex-col sm:flex-row"
                            >
                              Parceiro
                            </label>
                            <select
                              className={classnames({
                                "form-select": true,
                                "border-danger": errors?.partner_id,
                              })}
                              id="partner_id"
                              {...register("partner_id")}
                            >
                              <option>Selecione um parceiro</option>
                              {partners.map((partner) => (
                                <option
                                  key={partner.id}
                                  selected={budget.partner.id === partner.id}
                                  value={partner.id}
                                >
                                  {partner.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="input-form mt-3">
                            <label
                              htmlFor="validation-form-3"
                              className="form-label w-full flex flex-col sm:flex-row"
                            >
                              Situação
                            </label>

                            <select
                              className={classnames({
                                "form-select": true,
                                "border-danger": errors?.status_id,
                              })}
                              id="status_id"
                              {...register("status_id")}
                            >
                              <option>Selecione um status</option>
                              {status &&
                                status.map((situacao) => (
                                  <option
                                    key={situacao.id}
                                    selected={budget.status.id === situacao.id}
                                    value={situacao.id}
                                  >
                                    {situacao.name}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary mt-5"
                          >
                            Salvar
                          </button>
                        </form>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="leading-relaxed">
                    <div className="intro-y col-span-12 lg:col-span-6">
                      <div className="flex justify-center items-center w-full">
                        <div className="container grid lg:grid-cols-3 gap-2 ">
                          {/*  Start Cards */}
{/* 
                           {cardTitles.forEach(title => (
                          <CardUpload description={title.} />
                          ))} */}

                          {cardTitles.map((title, index) =>{
                            return <CardUpload id={index} description={title} titleIndex={index} />
                          } 
                          )}

                        
                        </div>

                        {/* Ends Cards */}
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
