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

type FormProps = {
  client?: Clients;
  title?: string;
};

export function Form(dataForm?: FormProps) {
  const history = useHistory();
  let cliente: any;
  if (dataForm) {
    const { client } = dataForm;
    cliente = client;
  }

  const schema = yup
    .object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      document: yup.string().required().min(11),
      fone: yup.string().required(),
      birth_date: yup.date().required(),
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
    defaultValues: cliente ?? {},
  });

  const onSubmit: SubmitHandler<any> = async (data: Clients) => {
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
                      htmlFor="validation-form-1"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      CPF
                    </label>

                    <MaskedInput
                      name="document"
                      id="document"
                      control={control}
                      mask="999.999.999-99"
                      placeholder="999.999.999-99"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.document,
                      })}
                    />
                  </div>
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
                </div>

                <div className="grid grid-cols-12 gap-2 mt-3">
                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-2"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      Data de Nascimento
                    </label>
                    <input
                      {...register("birth_date")}
                      id="birth_date"
                      type="date"
                      name="birth_date"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.birth_date,
                      })}
                      placeholder="00/00/0000"
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

                <div className="grid grid-cols-12 gap-2 mt-3">
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
                      <option>Selecione</option>
                      <option value="F">Feminino</option>
                      <option value="M">Masculino</option>
                    </select>
                  </div>
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
