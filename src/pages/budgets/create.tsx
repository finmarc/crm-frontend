import { SubmitHandler, useForm } from "react-hook-form";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/apiClient";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Client, Partner, Product, Status, Types } from "./interfaces/budget";

interface Budget {
  id?: string;
  client_id?: string;
  product_id?: string;
  partner_id?: string;
  status_id?: string;
  type_id?: string;
}

type FormProps = {
  budget?: Budget;
  title?: string;
}

export function CreateBudget(dataForm?: FormProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [types, setTypes] = useState<Types[]>([]);

  const history = useHistory()

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
      client_id: yup.string().required()
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    control
  } = useForm<Budget>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {}
  });

  const onSubmit: SubmitHandler<Budget> = async (data: Budget) => {
    let response;
    response = await api.post("budgets", data);
    
    const { status } = response;
    if (status == 201) {
      toast.success("Cadastro realizado com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      history.push("/orcamentos")
    } else {
      toast.error("Ops! Algo deu errado", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto"> {!dataForm?.title ? "Novo orçamento" : dataForm?.title}</h2>
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="p-5">
              <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("type_id",)}
                  >
                    <option >Selecione um tipo</option>
                    {types.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
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
                    {...register("client_id",)}
                  >
                    <option >Selecione um cliente</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
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
                    {...register("product_id",)}
                  >
                    <option >Selecione um produto</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
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
                    {...register("partner_id",)}
                  >
                    <option >Selecione um parceiro</option>
                    {partners.map(partner => (
                      <option key={partner.id} value={partner.id}>{partner.name}</option>
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
                    {...register("status_id",)}
                  >
                    <option >Selecione um status</option>
                    {status && status.map(situacao => (
                      <option key={situacao.id} value={situacao.id}>{situacao.name}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-primary mt-5">
                  Salvar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
