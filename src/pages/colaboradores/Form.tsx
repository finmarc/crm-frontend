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
import ButtonGoBack from "../../components/Button/backto";
import { AxiosError } from "axios";

interface Select {
  value: string;
  label: string;
}
interface User {
  id?: string;
  name: string;
  document?: string;
  password?: string;
  email?: string;
  phone: string;
  role_id?: string;
  role?: any
  ReactSelect?: Select; 
}

type FormProps = {
  user?: User;
  title?: string;
}

export function Form(dataForm?: FormProps) {
  const [roles, setRoles] = useState([]);
  const formRef = createRef<HTMLFormElement>();
  const history = useHistory()
  let user: User | undefined;
  if (dataForm) {
    user = dataForm.user;
  }
  const getRoles = async () => {
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
    getRoles();
  }, []);

  const schema = yup
    .object({
      name: yup.string().required().min(2),
      phone: yup.string()
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<User>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: user ?? {}
  });

  const onSubmit: SubmitHandler<User> = async (data: User) => {

    try {
      let response;
      data = {
        ...data,
        role_id: data?.ReactSelect?.value
      }

      delete data?.ReactSelect;
      if (user && user.id) {
        response = await api.patch(`users/${user.id}`, data);
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
    } catch (error) {
      if (error instanceof AxiosError) {
        const { statusCode, message } = error?.response?.data
        if (statusCode === 409) {
          toast.error("(E-mail ou documento) já foi cadastrado", {
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
        <h2 className="text-lg font-medium mr-auto"> {!dataForm?.title ? "Novo colaborador" : dataForm?.title}</h2>
        <ButtonGoBack route="/colaboradores" />
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
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
                      Celular
                    </label>
                    <MaskedInput
                      name="phone"
                      id="phone"
                      control={control}
                      mask="(99) 99999-9999"
                      placeholder="(99) 99999-9999"
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
                    optionSelected={user ? user.role : null}
                    id="role_id"
                    type="role_id"
                    name="role_id"
                    className={classnames({
                      "form-control": true,
                      "border-danger": errors?.role_id,
                    })}
                    placeholder="Selecione um perfil"
                  />
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
