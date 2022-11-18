import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import {
  Lucide,
  Modal,
  ModalBody,
} from "@/base-components"; 
import api from "../../services/apiClient";
import { Header } from "../Header";

type Props = {
  columns: any[];
  rows: any[];
  component: string
  url: string
}
const DataTable = ({ columns, rows, component, url }: Props) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [records, setRecords] = useState<any[]>(rows);
  const [id, setId] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (rows.length > 0) {
      setRecords(rows)
    }
  }, [rows])
  const show = useCallback((id: string) => {
    history.push(`${component}/${id}/visualizar`)
  }, []);

  const edit = useCallback((id: string) => {
    history.push(`${component}/${id}`)
  }, []);

  const remove = async (id: string) => {

    try {
      await api.delete(`${url}/${id}`)
      setDeleteConfirmationModal(false);
      toast.success("Cadastro excluido com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      listUpdate(id);
    } catch (error: any) {
      setDeleteConfirmationModal(false)
      if (error.hasOwnProperty('response')) {
        toast.error(error.response.data.message, {
          duration: 4000,
          position: "top-center",
        });
        return;
      }

      toast.error("Sistema não conseguiu processar esta ação. Procure o administrador do sistema", {
        duration: 4000,
        position: "top-center",
      });
    }

  };

  function listUpdate(id: string) {
    const recordsList = rows?.filter(record => record.id !== id);
    setRecords(recordsList);
  }

  const actions = {
    field: 'action',
    headerName: 'Ações',
    width: 200,
    sortable: false,
    disableClickEventBubbling: true,

    renderCell: (params: any) => {
   
      return (
        <>
          <button className="btn btn-primary mr-1 mb-1" onClick={() => show(params.row.id)}>
            <Lucide icon="Eye" className="w-4 h-4" />
          </button>
          <button className="btn btn-warning mr-1 mb-1" onClick={() => edit(params.row.id)}>
            <Lucide icon="Edit" className="w-4 h-4" />
          </button>
          <button className="btn btn-danger mr-1 mb-1" onClick={() => { setId(params.row.id), setDeleteConfirmationModal(true)}}>
            <Lucide icon="Trash" className="w-4 h-4" />
          </button>
        </>
      );
    },
  };

  columns.push(actions)
  return (
    <>
      <Header title={component.toUpperCase()} url={url} action="Adicionar" />
      <Box style={{ height: "auto", overflow: "auto" }} className="table mt-6">
        <DataGrid
          autoHeight
          autoPageSize={true}
          density="standard"
          rows={records}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          showColumnRightBorder={false}
          showCellRightBorder={false}
          pagination
          components={{ Toolbar: GridToolbar }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>

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
            <button type="button" className="btn btn-danger w-24" onClick={() => remove(id)}>
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DataTable;
