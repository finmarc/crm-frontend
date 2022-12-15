import * as yup from "yup";
import api from "../../services/apiClient";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { SubmitHandler } from "@unform/core";
import Form from "./Form";

interface Product {
  id?: string;
  documnet_types?: number[];
  name: string;
}
type FormProps = {
  product?: Product;
  title?: string;
};

export function CreateProduct(dataForm?: FormProps) {
  const history = useHistory();
  const schema = yup
    .object({
      name: yup.string().required(),
    })
    .required();

  const handleSubmit: SubmitHandler<Product> = async (data) => {

    try {
      const response = await api.post("products", data);
      const { status } = response;
      if (status == 201) {
        toast.success("Cadastro realizado com sucesso!", {
          duration: 4000,
          position: "top-right",
        });
        history.push("/produtos");
      }
    } catch (err) {
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
          {!dataForm?.title ? "Novo produto" : dataForm?.title}
        </h2>
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="p-5">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
