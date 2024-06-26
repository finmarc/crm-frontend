import { useEffect, useRef, useState } from "react";
import { Litepicker } from "@/base-components";
import { Client, Partner, Product, Status, Types } from "../../pages/budgets/interfaces/budget";
import api from "../../services/apiClient";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import classNames from "classnames";
import SelectCustom from "../../components/Inputs/Select";
import toast from "react-hot-toast";
import QueryString from "qs";

type Props = {
  items?: any[],
  setBudgets?: any,
  setFilter?: any
}
export default function SearchFilter({ items , setBudgets, setFilter} : Props) {
  const formRef = useRef<FormHandles>(null);
  const [date, setDate] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [types, setTypes] = useState<Types[]>([]);
  const [oldItems, setOldItems] = useState<any[]>()

  const initialDataSelect = async () => {
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
  };

  useEffect(() => {
   setOldItems(items) 
  }, [items])
  const handleSubmit: SubmitHandler = async (data) => {

const query = QueryString.stringify(data);
    try {
      const response = await api.get(`budgets/filters?${query}`);
     
      const { status, data } = response;
      if (status == 200) {
        const responseData = data.map((budget: any) => ({
          id: budget.id,
          codigo: budget.code,
          cliente: budget.client.name,
          produto: budget.product.name,
          parceiro: budget.partner?.name,
          situacao: budget.status.name,
          tipo: budget.type.name,
        }))
        setBudgets(responseData);
      }
    } catch (err) {
      toast.error("Ops! Algo deu errado", {
        duration: 4000,
        position: "top-right",
      });
    };
  };

  useEffect(() => {
    initialDataSelect()
  })

  return (
    <div className="mt-5 ">
      <div className="intro-y col-span-12 lg:col-span-6">
        <div className="intro-y box">
          <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
            <h2 className="font-medium text-base mr-auto">
              Filtro de Pesquisa
            </h2>
          </div>
          <div className="p-5  ">
            <Form
              ref={formRef}
              initialData={() => { }}
              onSubmit={handleSubmit}
              className="grid grid-cols-4 gap-2 md:col-span-6"
            >
              <div className=" col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Data Inicial
                </label>
                {/* <input placeholder="Data inicial" /> */}
                <Litepicker
                  value={date}
                  onChange={setDate}
                  options={{
                    autoApply: false,
                    showWeekNumbers: true,

                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  dateFormat="dd/mm/yyyy"
                  className="form-control w-full flex flex-col sm:flex-row"
                />
              </div>
              <div className="input-form col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Data Final
                </label>
                <Litepicker
                  value={date}
                  onChange={setDate}
                  options={{
                    autoApply: false,
                    showWeekNumbers: true,

                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  dateFormat="dd/mm/yyyy"
                  className="form-control w-full flex flex-col sm:flex-row"
                />
              </div>
              <div className="input-form col-span-1">
                <SelectCustom
                  className={classNames({
                    "form-control": true,
                  })}
                  label="Cliente"
                  name="client_id"
                  options={clients}
                />
              </div>
              <div className="input-form col-span-1">
                <SelectCustom
                  className={classNames({
                    "form-control": true,
                  })}
                  label="Situação"
                  name="status_id"
                  options={status}
                />
              </div>
              <div className="input-form col-span-1">
                <SelectCustom
                  className={classNames({
                    "form-control": true,
                  })}
                  label="Funcionários"
                  name="user_id"
                  options={partners}
                />
              </div>
              <div className="input-form col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Documentos
                </label>
                <select id="documentos" className="form-select  sm:mr-2">
                  <option>Selecione</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="analise">Em análise</option>
                  <option value="recusado">Recusado</option>
                </select>
              </div>
              <div className="input-form col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Enviado
                </label>
                <select id="documentos" className="form-select  sm:mr-2">
                  <option>Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
              </div>
              <div className="input-form col-span-1">
                <SelectCustom
                  className={classNames({
                    "form-control": true,
                  })}
                  label="Parceiros"
                  name="partner_id"
                  options={partners}
                />
              </div>
              <div className="input-form w-full col-span-4 ">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Aprovado/Rejeitado
                </label>
                <select id="aprovado" className="form-select  sm:mr-2">
                  <option>Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="btn btn-primary mt-5">Pesquisar</button>
                <button className="btn btn-primary mt-5">Limpar</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
