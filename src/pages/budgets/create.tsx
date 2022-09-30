import classnames from "classnames";
import * as yup from "yup";
import api from "../../services/apiClient";
import toast from "react-hot-toast";
import { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Client, Partner, Product, Status, Types } from "./interfaces/budget";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import SelectCustom from "../../components/Inputs/Select";
import InputText from "../../components/Inputs/InputText";
import TextArea from "../../components/Inputs/TextArea";
import InputMaskMoney from "../../components/Inputs/InputMaskMoney";

interface Budget {
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
type FormProps = {
  budget?: Budget;
  title?: string;
};

export function CreateBudget(dataForm?: FormProps) {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [clients, setClients] = useState<Client[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [types, setTypes] = useState<Types[]>([]);


  const fetchData = useCallback(async () => {
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
    fetchData();
  }, []);

  const schema = yup
    .object({
      client_id: yup.string().required(),
    })
    .required();

  const handleSubmit: SubmitHandler<Budget> = async (data) => {

    try{
      const response = await api.post("budgets", data);
      const { status } = response;
      if (status == 201) {
        toast.success("Cadastro realizado com sucesso!", {
          duration: 4000,
          position: "top-right",
        });
        history.push("/orcamentos");
      }
    }catch(err) {
      toast.error("Ops! Algo deu errado", {
        duration: 4000,
        position: "top-right",
      });
    };
   
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          {" "}
          {!dataForm?.title ? "Novo orçamento" : dataForm?.title}
        </h2>
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="p-5">
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
                // schema={schema}
              >
                <div className="input-form">
                  <SelectCustom
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
                    label="Descrição"
                    placeholder="Decrição"
                    classname="form-control"
                  />
                </div>
                <div className="input-form mt-3">
                  <TextArea
                    name="observation"
                    label="Observações"
                    placeholder="Observações"
                    classname="form-control"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-5"
                >
                  Salvar
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
