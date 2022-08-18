import { SubmitHandler, useForm } from "react-hook-form";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/apiClient";
import toast from "react-hot-toast";
import { createRef, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MaskedInput } from "../../components/InputMask";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";

interface Select {
  value: string;
  label: string;
}
interface User {
  id?: string;
  name: string;
  document: string;
  password?: string;
  email: string;
  phone: string;
  role_id?: string;
  ReactSelect?: Select; 
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
  const formRef = createRef<HTMLFormElement>();
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
    const options = data.map((role: any) => ({
      value: role.id,
      label: role.name
    }))
    setRoles(options);
  };

  useEffect(() => {
    perfis();
  }, []);

  const schema = yup
    .object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      document: yup.string().required().min(11),
      password: yup.string().min(6),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<User>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: colaborador ?? {}
  });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    let response;
    
    data = {
      ...data,
      role_id: data?.ReactSelect?.value
    }

    delete data?.ReactSelect;
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
              <form ref={formRef} className="validate-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-2">
                  <div className="input-form col-span-6">
                    <label
                      htmlFor="validation-form-1"
                      className="form-label w-full flex flex-col sm:flex-row"
                    >
                      Nome
                    </label>
                    <Input
                      control={control}
                      id="name"
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
                    <Input  
                      label="Email"
                      control={control}
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
                      Celular
                    </label>
                    <MaskedInput
                      name="phone"
                      id="phone"
                      control={control}
                      mask="(99) 99999-9999"
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.phone,
                      })}
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
                  <Select
                    options={roles}
                    control={control}
                    optionSelected={colaborador ? colaborador.roles : null}
                    id="role_id"
                    type="role_id"
                    name="role_id"
                    className={classnames({
                      "form-control": true,
                      "border-danger": errors?.role_id,
                    })}
                    placeholder="Selecione"
                  />
                  {/* <select
                    id="role_id"
                    {...register("role_id")}
                    className="form-select mt-2 sm:mr-2"
                  >
                    <option>
                      Selecione um perfil
                    </option>
                    {roles.map((role: Roles) => (
                      <option selected={colaborador && role.id === colaborador.role_id} value={role.id} key={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select> */}
                </div>
                <div className="input-form mt-3">
                  <label
                    htmlFor="validation-form-3"
                    className="form-label w-full flex flex-col sm:flex-row"
                  >
                    Senha
                  </label>
                  <Input
                    label="Email"
                    control={control}
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
