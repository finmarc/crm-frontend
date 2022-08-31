
import {
  Lucide,
  Modal,
  ModalBody,
} from "@/base-components";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import api from "../../services/apiClient";
interface RowProps {
  dataList: any;
  component: string
  url: string
}

export const TBodyRow = ({ dataList, component , url }: RowProps) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [ records, setRecords] = useState<any[]>([]);
  const [id, setId] = useState("");

  useEffect(() => {
    if(dataList.length > 0) {
      setRecords(dataList)
    }
  },[dataList])

  const keys = records && records?.length > 0 ? Object.keys(records[0]) : [];
  const history = useHistory();

  const show = useCallback((id: string) => {
    history.push(`${component}/show/${id}`)
  },[]);

  const edit = useCallback((id: string) => {
    history.push(`${component}/edit/${id}`)
  }, []);

  const remove = useCallback(async (id: string) => {
    await api.delete(`${url}/${id}`)
    setDeleteConfirmationModal(false); 
    toast.success("Cadastro excluido com sucesso!", {
      duration: 4000,
      position: "top-right",
    });
    listUpdate(id);
    return
  }, []);

  function listUpdate(id: string) {
    const recordsList = records?.filter(record => record.id !== id);
    setRecords(recordsList);
  }

  return (
    <>
        <tbody>
        {records?.length > 0 && (

          records.map((column, index) => (
            <tr key={index}>{keys.map((key) => key !== 'id' && (
              <td key={key} className="whitespace-nowrap">{column[key]}</td>
              ))}
              <td className="whitespace-nowrap ">
                <button className="btn btn-primary mr-1 mb-2" onClick={() => show(column['id'])}>
                  <Lucide icon="Eye" className="w-5 h-5" />
                </button>
                <button className="btn btn-warning mr-1 mb-2" onClick={() => edit(column['id'])}>
                  <Lucide icon="Edit" className="w-5 h-5" />
                </button>
                <button className="btn btn-danger mr-1 mb-2" onClick={() => { setId(column['id']), setDeleteConfirmationModal(true) }}>
                  <Lucide icon="Trash" className="w-5 h-5" />
                </button>
              </td>
            </tr>
          )))}
        </tbody>
      {/* BEGIN: Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Tem certeza ?</div>
            <div className="text-slate-500 mt-2">
              Você realmente deseja excluir esse registro?<br />
              Este processo não pode ser desfeito.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger w-24" onClick={() => remove(id) }>
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}
    </>
  );
};
