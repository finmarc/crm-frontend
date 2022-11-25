import { useCallback, useEffect, useState } from "react";
import DataTable from "../../components/Datatable";
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

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      width: 220,

    },
    {
      field: "email",
      headerName: "E-mail",
      width: 180,

    },
    {
      field: "telefone",
      headerName: "Telefone",
      width: 150,

    },
    {
      field: "documento",
      headerName: "Documento",
      width: 150,
    },
    {
      field: "perfil",
      headerName: "Perfil",
      width: 150,
    },
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
    <DataTable rows={users} columns={columns} component="colaborador" url="users" />
  );
};

export default Colaborador;
