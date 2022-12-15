import { UserX } from "lucide";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../services/apiClient";
import Form from "./Form";

const ProdutoEdit = () => {
  const [product, setProduct] = useState<any>();

  let { id } = useParams<any>();
  const fetchData = useCallback(async () => {
    const response = await api.get(`/products/${id}`);
    const { data } = response;
    setProduct(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          {" "}
          Editar produto
        </h2>
      </div>
      <div className="mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box">
            <div className="p-5">
              {product && (<Form product={product} title="Editar Produto" />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdutoEdit;
