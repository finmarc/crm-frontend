import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import api from "../../services/apiClient";

interface User {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
}

const Colaborador = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchData = useCallback(async () => {
    const response = await api.get("/users");

    const newUsers: any = response.data.map((user: User) => {
      return {
        id: user.id,
        nome: user.name,
        email: user.email,
        telefone: user.phone,
        documento: user.document,
      }
    })

    setUsers(newUsers);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <Header title="Colaboradores" url="colaborador/new" action="Adicionar" />
      {users.length > 0 && <Table columns={users} component="colaborador" />}
    </>
  );
};

export default Colaborador;
