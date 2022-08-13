import { UserX } from "lucide";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../services/apiClient";
import { Form } from "./Form";

interface User {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  role_id: string;
}

const ColaboradorEdit = () => {
  const [user, setUser] = useState<User>();

  let { id } = useParams<any>();
  const fetchData = useCallback(async () => {
    const response = await api.get(`/users/${id}`);
    const { data } = response;
    const newUser = {
      ...data,
      role_id: data.roles[0].role.id
    }
    setUser(newUser);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {user && (<Form user={user} title="Editar colaborador" />)}
    </>
  );
};

export default ColaboradorEdit;
