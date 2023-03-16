import { SubmitHandler, useForm } from "react-hook-form";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/apiClient";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Clients } from "./interface/clients";
import { MaskedInput } from "../../components/InputMask";
import ButtonGoBack from "../../components/Button/backto";
import Datepicker from "../../components/Inputs/Datepicker";
import { helper } from "../../utils";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

type FormProps = {
  client?: Clients;
  title?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  document: string;
  phone: string;
};

export function Form(dataForm?: FormProps) {
  const history = useHistory();
  const [tipoPessoa, setTipoPessoa] = useState("PF");
  const [colaboradores, setColaboradores] = useState<User[]>([]);
  let cliente: any;
  if (dataForm) {
    const { client } = dataForm;
    cliente = client as Clients;
  }

  useEffect(() => {
    if (cliente?.person) {
      setTipoPessoa(cliente?.person);
    }
    api.get(`/users`).then((response) => {
      setColaboradores(response.data);
    });
  }, []);

  const schema = yup
    .object({
      name: yup.string().required().min(2),
      fone: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: cliente ?? {},
  });

  const onSubmit: SubmitHandler<any> = async (data: Clients) => {
    try {
      let response;

      if (cliente && cliente.id) {
        response = await api.patch(`clients/${cliente.id}`, data);
      } else {
        response = await api.post("clients", data);
      }

      const { status } = response;
      if (status == 200) {
        toast.success("Cadastro atualizado com sucesso!", {
          duration: 4000,
          position: "top-right",
        });
        history.push("/clientes");
      } else if (status == 201) {
        toast.success("Cadastro realizado com sucesso!", {
          duration: 4000,
          position: "top-right",
        });
        history.push("/clientes");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { statusCode, message } = error?.response?.data;
        if (statusCode === 409) {
          toast.error("Documento já esta cadastrado", {
            duration: 4000,
            position: "top-right",
          });
          return;
        }
        toast.error("Ops! Algo deu errado", {
          duration: 4000,
          position: "top-right",
        });
      }
    }
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Cliente</h2>
        <ButtonGoBack route="/clientes" />
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto">
                {!dataForm?.title ? "Novo cliente" : dataForm?.title}
              </h2>
            </div>
            <div className="p-5">
              <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-2">
                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-1"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      Nome
                    </label>
                    <input
                      {...register("name")}
                      id="name"
                      type="text"
                      name="name"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.name,
                      })}
                      placeholder="John snow"
                    />
                  </div>
                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-2"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      Email
                    </label>
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      name="email"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.email,
                      })}
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-3">
                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-2"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      {tipoPessoa === "PJ" ? "Razão Social" : "Tipo de Pessoa"}
                    </label>
                    <select
                      id="person"
                      {...register("person")}
                      className="form-select sm:mr-2"
                      onChange={(e) => setTipoPessoa(e.target.value)}
                    >
                      <option value="PF">Pessoa Fisica</option>
                      <option value="PJ">Pessoa Jurídica</option>
                    </select>
                  </div>

                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-1"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      CPF/CNPJ
                    </label>

                    <MaskedInput
                      name="document"
                      id="document"
                      control={control}
                      mask={
                        tipoPessoa === "PF"
                          ? "999.999.999-99"
                          : "99.999.999/9999-99"
                      }
                      placeholder={
                        tipoPessoa === "PF"
                          ? "999.999.999-99"
                          : "99.999.999/9999-99"
                      }
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.document,
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-3">
                  {tipoPessoa === "PF" && (
                    <div className="input-form col-span-6">
                      <label
                        htmlFor="validation-form-2"
                        className="form-label w-full flex flex-col sm:flex-row"
                      >
                        RG
                      </label>
                      <MaskedInput
                        name="rg"
                        id="rg"
                        control={control}
                        mask="9.999-999"
                        placeholder="9.999-999"
                        className={classnames({
                          "form-control": true,
                          "border-danger": errors.rg,
                        })}
                      />
                    </div>
                  )}
                  <div className="input-form col-span-6">
                    <Datepicker
                      name={
                        tipoPessoa === "PJ" ? "creation_date" : "birth_date"
                      }
                      control={control}
                      label={
                        tipoPessoa === "PJ"
                          ? "Data de Criação"
                          : "Data de Nascimento"
                      }
                      classname={classnames({
                        "form-control": true,
                        "border-danger": errors.birth_date,
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-3">
                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-2"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      Celular
                    </label>

                    <MaskedInput
                      name="fone"
                      id="fone"
                      control={control}
                      mask="(99) 99999-9999"
                      placeholder="(99) 99999-9999"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.fone,
                      })}
                    />
                  </div>
                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-2"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      Sexo
                    </label>
                    <select
                      id="sexo"
                      {...register("sexo")}
                      className="form-select  sm:mr-2"
                    >
                      <option value="">Selecione</option>
                      <option value="F">Feminino</option>
                      <option value="M">Masculino</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-2 mt-3">
                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-2"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      Endereço
                    </label>
                    <input
                      {...register("address")}
                      id="address"
                      type="text"
                      name="address"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.address,
                      })}
                      placeholder="Estado/Cidade/Rua"
                    />
                  </div>
                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-2"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      Vendedor(a) responsável
                    </label>
                    <select
                      id="seller_id"
                      {...register("seller_id")}
                      className="form-select  sm:mr-2"
                    >
                      <option value="">Selecione</option>
                      {colaboradores.map((colaborador) => (
                        <option
                          key={colaborador.id}
                          value={colaborador.id}
                          selected={colaborador.id === cliente?.seller_id}
                        >
                          {colaborador.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-12 mt-3">
                  <div className="input-form col-span-12">
                    <label
                      htmlFor="validation-form-1"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      Origem do cliente
                    </label>
                    <input
                      {...register("origin")}
                      id="origin"
                      type="text"
                      name="origin"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.origin,
                      })}
                      placeholder="Site / Parceiros "
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="btn btn-primary mt-5">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
