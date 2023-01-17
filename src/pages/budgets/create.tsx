import * as yup from "yup";
import api from "../../services/apiClient";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { SubmitHandler } from "@unform/core";
import Form from "./Form";

interface Budget {
  id?: string;
  type_id?: string;
  client_id: string;
  partner_id?: string;
  product_id: string;
  status_id?: string;
  amount_loan: number;
  description?: string;
  observation?: string;
}
type FormProps = {
  budget?: Budget;
  title?: string;
};

export function CreateBudget(dataForm?: FormProps) {
  const history = useHistory();
  const schema = yup
    .object({
      client_id: yup.string().required(),
    })
    .required();

  const handleSubmit: SubmitHandler<Budget> = async (data) => {
    try {
      const response = await api.post("budgets", data);
      const { status } = response;
      if (status == 201) {
        const { id } = response.data;
        toast.success("Cadastro realizado com sucesso!", {
          duration: 4000,
          position: "top-right",
        });
        history.push(`/orcamento/${id}`);
      }
    } catch (err) {
      toast.error("Ops! Algo deu errado", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          {" "}
          {!dataForm?.title ? "Novo orçamento" : dataForm?.title}
        </h2>
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="p-5">
              <Form handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
