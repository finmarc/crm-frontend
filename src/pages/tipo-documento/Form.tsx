import { SubmitHandler, useForm } from "react-hook-form";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/apiClient";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import ButtonGoBack from "../../components/Button/backto";
import {  useState } from "react";
import { TipoDocumento } from "./interface/tipo-documento";

type FormProps = {
  document?: TipoDocumento;
  title?: string;
};



export function Form(dataForm?: FormProps) {
  const history = useHistory();
  let documentType: any;
  if (dataForm) {
    const { document } = dataForm;
    documentType = document;
  }



  console.log(documentType)
  const schema = yup
    .object({
      name: yup.string().required().min(2),
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
    defaultValues: documentType ?? {},
  });

  const onSubmit: SubmitHandler<any> = async (data: TipoDocumento) => {
    let response;

    if (documentType && documentType.id) {
      response = await api.patch(`document-types/${documentType.id}`, data);
    } else {
      response = await api.post("document-types", data);
    }

    const { status } = response;
    if (status == 200) {
      toast.success("Cadastro atualizado com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      history.push("/tipo-documentos");
    } else if (status == 201) {
      toast.success("Cadastro realizado com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      history.push("/tipo-documentos");
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
        <h2 className="text-lg font-medium mr-auto">Tipo de Documento</h2>
        <ButtonGoBack route="/tipo-documentos" />
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto">
                {!dataForm?.title ? "Novo Documento" : dataForm?.title}
              </h2>
            </div>
            <div className="p-5">
              <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid ">
                  <div className="input-form">
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
                      defaultValue={documentType?.name ?? ""}
                      className={classnames({
                        "form-control": true,
                        "border-danger": errors.name,
                      })}
                      placeholder="John snow"
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
