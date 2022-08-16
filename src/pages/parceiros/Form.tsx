import { SubmitHandler, useForm } from "react-hook-form";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/apiClient";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Partners } from "./interface/partners";

type FormProps = {
  partner?: Partners;
  title?: string;
};

export function Form(dataForm?: FormProps) {
  const history = useHistory();
  let parceiro: any;
  if (dataForm) {
    const { partner } = dataForm;
    parceiro = partner;
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
    console.log(status);
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
                      CPF/CNPJ
                    </label>
                    <input
                      {...register("document")}
                      id="document"
                      type="text"
                      name="document"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.document,
                      })}
                      placeholder="CPF/CNPJ"
                    />
                  </div>
                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-2"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      RG
                    </label>
                    <input
                      {...register("rg")}
                      id="rg"
                      type="text"
                      name="rg"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.rg,
                      })}
                      placeholder="9.999-999"
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
                      Telefone
                    </label>
                    <input
                      {...register("fone")}
                      id="fone"
                      type="text"
                      name="fone"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.fone,
                      })}
                      placeholder="(61) 99999-9999"
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
