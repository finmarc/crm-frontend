import { SubmitHandler, useForm } from "react-hook-form";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/apiClient";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Partners } from "./interface/partners";
import { MaskedInput } from "../../components/InputMask";
import ButtonGoBack from "../../components/Button/backto";
import { helper } from "../../utils";
import Datepicker from "../../components/Inputs/Datepicker";
import { useEffect, useState } from "react";

type FormProps = {
  partner?: Partners;
  title?: string;
};

type User = {
  id: string;
  name: string;
  email?: string;
  document?: string;
  fone: string;
}

export function Form(dataForm?: FormProps) {
  const history = useHistory();
  const [tipoPessoa, setTipoPessoa] = useState("PF");
  const [colaboradores, setColaboradores] = useState<User[]>([])
  let parceiro: any;
  if (dataForm) {
    const { partner } = dataForm;
    parceiro = partner;
  }

  useEffect(() => {
    if (parceiro?.person) {
      setTipoPessoa(parceiro?.person);
    }
    api.get(`/users`)
      .then((response) => {
        setColaboradores(response.data);
      });
  }, [])

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
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: parceiro ?? {},
  });

  const onSubmit: SubmitHandler<any> = async (data: Partners) => {
    let response;
  
    if (parceiro && parceiro.id) {
      response = await api.patch(`partners/${parceiro.id}`, data);
    } else {
      response = await api.post("partners", data);
    }

    const { status } = response;
    if (status == 200) {
      toast.success("Cadastro atualizado com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      history.push("/parceiros");
    } else if (status == 201) {
      toast.success("Cadastro realizado com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      history.push("/parceiros");
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
        <h2 className="text-lg font-medium mr-auto">Parceiro</h2>
        <ButtonGoBack route="/parceiros" />
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto">
                {!dataForm?.title ? "Novo parceiro" : dataForm?.title}
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
                      {tipoPessoa === "PJ" ? "Razão Social" : "Nome"}
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
                      Tipo de Pessoa
                    </label>
                    <select
                      id="person"
                      {...register("person")}
                      className="form-select  sm:mr-2"
                      onChange={e => setTipoPessoa(e.target.value)}
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
                      {tipoPessoa === "PJ" ? "CNPJ" : "CPF"}
                    </label>

                    <MaskedInput
                      name="document"
                      id="document"
                      control={control}
                      mask={tipoPessoa === 'PF' ? '999.999.999-99' : '99.999.999/9999-99'}
                      placeholder={tipoPessoa === 'PF' ? '999.999.999-99' : '99.999.999/9999-99'}
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.document,
                      })}
                    />
                  </div>

                </div>

                <div className="grid grid-cols-12 gap-2 mt-3">
                  <div className="input-form col-span-6">
                    <Datepicker
                      name="birth_date"
                      control={control}
                      label={tipoPessoa === 'PF' ? "Data de Nascimento": "Data de criação"}
                      classname={classnames({
                        "form-control": true,
                        "border-danger": errors.birth_date,
                      })}
                    />
                  </div>
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
                </div>    

               {
                tipoPessoa === 'PF' && (
                    <div className="grid grid-cols-12 gap-2 mt-3">
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
                )
               } 
               

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
                      {colaboradores.map(colaborador => (
                        <option
                          key={colaborador.id}
                          value={colaborador.id}
                          selected={colaborador.id === parceiro?.seller_id}>
                          {colaborador.name}
                        </option>)
                      )}

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
