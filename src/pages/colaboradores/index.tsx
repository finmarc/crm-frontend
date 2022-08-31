import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import api from "../../services/apiClient";

interface Role {
  id: string;
  name: string;
}
interface User {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  role: Role;
}

const Colaborador = () => {
  const [users, setUsers] = useState<User[]>([]);

  const theadTitles = [
   "id", "Nome", "Email", "Telefone", "CPF", "Perfil"
  ]

  const fetchData = useCallback(async () => {
    const response = await api.get("/users");

    
    const newUsers: any = response.data.map((user: User) => {
      return {
        id: user.id,
        nome: user.name,
        email: user.email,
        telefone: user.phone,
        documento: user.document,
        perfil: user?.role.name
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
      <Table titles={theadTitles} columns={users} component="colaborador" url="users" />
    </>
  );
};

export default Colaborador;
