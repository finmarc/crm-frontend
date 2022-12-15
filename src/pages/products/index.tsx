import { useCallback, useEffect, useState } from "react";
import api from "../../services/apiClient";
import DataTable from "../../components/Datatable";
import { Product } from "../budgets/interfaces/budget";

export const ProductIndex = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const columns = [
    {
      field: "name",
      headerName: "Nome",
      width: 150,
    },
  ]

  const fetchData = useCallback(async () => {
    const response = await api.get("/products");

    const { data } = response;

    setProducts(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <DataTable rows={products} columns={columns} component="produto" url="products" />
    </>
  );
};

