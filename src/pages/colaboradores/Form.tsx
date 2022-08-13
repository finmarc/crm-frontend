import { SubmitHandler, useForm } from "react-hook-form";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/apiClient";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { TomSelect } from "../../base-components";
import { useHistory } from "react-router-dom";

type InputForm = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  document?: string;
  role_id?: string;
};

interface User {
  id: string;
  name: string;
  document: string;
  password?: string;
  email: string;
  phone: string;
  role_id?: string;
}

type Roles = {
  id: string;
  name: string;
};

type FormProps = {
  user?: User;
  title?: string;
}

export function Form(dataForm?: FormProps) {
  const [roles, setRoles] = useState([]);
  const history = useHistory()
  let colaborador: any;
  if (dataForm) {
    const { user } = dataForm;
    colaborador = user;
  }
  const perfis = async () => {
    const response = await api.get("roles");
    if (response.data.lenght < 1) return;

    const { data } = response;

    setRoles(data);
  };

  useEffect(() => {
    perfis();
  }, []);

  const schema = yup
    .object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      document: yup.string().required().min(11),
      password: yup.string().required().min(6),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: colaborador ?? {}
  });

  const onSubmit: SubmitHandler<any> = async (data: InputForm) => {
    let response;
    if (colaborador && colaborador.id) {
      response = await api.patch(`users/${colaborador.id}`, data);
    } else {
      response = await api.post("users", data);
    }

    const { status } = response;

    if (status == 200) {
      toast.success("Cadastro atualizado com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      history.push("/colaboradores")
    } else if (status == 201) {
      toast.success("Cadastro realizado com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      history.push("/colaboradores")
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
        <h2 className="text-lg font-medium mr-auto">Usuário</h2>
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto">
                {!dataForm?.title ? "Novo colaborador" : dataForm?.title}
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
                      Documento
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
                      placeholder="CPF"
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
                      {...register("phone")}
                      id="phone"
                      type="text"
                      name="phone"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.phone,
                      })}
                      placeholder="(61) 99999-9999"
                    />
                  </div>
                </div>
                <div className="input-form mt-3">
                  <label
                    htmlFor="validation-form-3"
                    className="form-label w-full flex flex-col sm:flex-row"
                  >
                    Perfil
                  </label>
                  <select
                    id="role_id"
                    {...register("role_id")}
                    className="form-select mt-2 sm:mr-2"
                    >
                    <option>
                      Selecione um perfil
                    </option>
                    {roles.map((role: Roles) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-form mt-3">
                  <label
                    htmlFor="validation-form-3"
                    className="form-label w-full flex flex-col sm:flex-row"
                  >
                    Senha
                  </label>
                  <input
                    {...register("password")}
                    id="password"
                    type="password"
                    name="password"
                    className={classnames({
                      "form-control": true,
                      "border-danger": errors?.password,
                    })}
                    placeholder="secret"
                  />
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
