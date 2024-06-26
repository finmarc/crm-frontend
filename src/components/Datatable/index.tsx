import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Lucide, Modal, ModalBody } from "@/base-components";
import api from "../../services/apiClient";
import { Header } from "../Header";
import ModalBndes from "../modalBndes";
import ModalBase from "../modal";
import { BndesReport } from "../../pages/BNDESLeads/interface/leads";

type Props = {
  columns: any[];
  rows: any[];
  hideButtonView?: boolean;
  hideButtonEdit?: boolean;
  hideButtonDelete?: boolean;
  hideOrShowButtonSendProposal?: boolean;
  hideButtonModalViewProposal?: boolean;
  title?: string;
  component: string;
  url: string;
};
const DataTable = ({
  columns,
  rows,
  component,
  url,
  title,
  hideButtonDelete,
  hideButtonView,
  hideButtonEdit,
  hideOrShowButtonSendProposal = false,
  hideButtonModalViewProposal = false,
}: Props) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [showModalSendProposal, setShowModalSendProposal] = useState(false);
  const [showModalViewSendProposal, setShowModalViewProposal] = useState(false);
  const [records, setRecords] = useState<any[]>(rows);
  const [proposal, setProposal] = useState<any[]>([]);
  const [id, setId] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (rows.length > 0) {
      setRecords(rows);
    }
  }, [rows]);
  const show = useCallback((id: string) => {
    history.push(`${component}/${id}/visualizar`);
  }, []);

  const edit = useCallback((id: string) => {
    history.push(`${component}/${id}`);
  }, []);


  const remove = async (id: string) => {
    try {
      await api.delete(`${url}/${id}`);
      setDeleteConfirmationModal(false);
      toast.success("Cadastro excluido com sucesso!", {
        duration: 4000,
        position: "top-right",
      });
      listUpdate(id);
    } catch (error: any) {
      setDeleteConfirmationModal(false);
      if (error.hasOwnProperty("response")) {
        toast.error(error.response.data.message, {
          duration: 4000,
          position: "top-center",
        });
        return;
      }

      toast.error(
        "Sistema não conseguiu processar esta ação. Procure o administrador do sistema",
        {
          duration: 4000,
          position: "top-center",
        }
      );
    }
  };

  function showModal(show: boolean, id: string) {
    setId(id);
    setShowModalSendProposal(show);
  }

  function showModalView(show: boolean, id: string) {
    const proposal = rows?.filter((record) => record.id === id);
    if (proposal.length > 0) setProposal(proposal);
    setShowModalViewProposal(show);
  }

  function listUpdate(id: string) {
    const recordsList = rows?.filter((record) => record.id !== id);
    setRecords(recordsList);
  }

  const actions = {
    field: "action",
    headerName: "Ações",
    width: 200,
    sortable: false,
    disableClickEventBubbling: true,

    renderCell: (params: any) => {
      return (
        <>
          {!hideButtonView && (
            <button
              className="btn btn-primary mr-1 mb-1 mt-1"
              onClick={() => show(params.row.id)}
            >
              <Lucide icon="Eye" className="w-4 h-4" />
            </button>
          )}
          {!hideButtonModalViewProposal && (
            <button
              className="btn btn-primary mr-1 mb-1 mt-1"
              onClick={() => showModalView(true, params.row.id)}
            >
              <Lucide icon="Eye" className="w-4 h-4" />
            </button>
          )}
          {!hideButtonEdit && (
            <button
              className="btn btn-warning mr-1 mb-1 mt-1"
              onClick={() => edit(params.row.id)}
            >
              <Lucide icon="Edit" className="w-4 h-4" />
            </button>
          )}
          {hideOrShowButtonSendProposal && (
            <button
              className="btn btn-warning mr-1 mb-1 mt-1"
              onClick={() => showModal(true, params.row.id)}
            >
              <Lucide icon="Send" className="w-4 h-4" />
            </button>
          )}
          {!hideButtonDelete && (
            <button
              className="btn btn-danger mr-1 mb-1 mt-1"
              onClick={() => {
                setId(params.row.id), setDeleteConfirmationModal(true);
              }}
            >
              <Lucide icon="Trash" className="w-4 h-4" />
            </button>
          )}
        </>
      );
    },
  };

  columns.push(actions);
  return (
    <>
      <Header
        title={title ?? component.toUpperCase()}
        url={component}
        action="Adicionar"
      />
      <Box style={{ height: "auto", overflow: "auto" }} className="table mt-6">
        <DataGrid
          autoHeight
          autoPageSize={true}
          density="compact"
          rows={records}
          columns={columns}
          pageSize={50}
          checkboxSelection
          disableSelectionOnClick
          showColumnRightBorder={false}
          showCellRightBorder={false}
          pagination
          components={{ Toolbar: GridToolbar }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
      {showModalSendProposal && (
        <ModalBndes showModalSendProposal={showModalSendProposal}
          setShowModalSendProposal={() => setShowModalSendProposal(!showModalSendProposal)}
          proposals={rows}
          id={id}
        />
      )
      }
      {showModalViewSendProposal && (
        
        <Modal
          show={showModalViewSendProposal}
          onHidden={() => {
            setShowModalViewProposal(false);
          }}
          size="modal-lg"
        >

          <ModalBody className="p-0 modal-xl">
            <div className="p-5">
              <div className="text-2xl mb-5">{ `PROPOSTA - ${proposal[0]?.idProposta}`} </div>
             {
                proposal.map((item: any) => {
                  return (
                    <div className="mt-5">
                      <div className="text mt-2">Número da Proposta</div>
                      <div className="text-slate-500 mt-2">
                        {item.idProposta}
                      </div>
                      <div className="text mt-2">Situação da Proposta</div>
                      <div className="text-slate-500 mt-2">
                        {item.situacaoProposta}
                      </div>
                      <div className="text mt-2">Nome</div>
                      <div className="text-slate-500 mt-1">
                        {item.nome}
                      </div>
                      <div className="text mt-2">CNPJ</div>
                      <div className="text-slate-500 mt-1">
                        { item.cnpj ? item.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : "---"}
                      </div>
                      <div className="text mt-2">CPF</div>
                      <div className="text-slate-500 mt-1">
                        { item.cpf ? item.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : "---"}
                      </div>
                      <div className="text mt-2">Valor do Faturamento</div>
                      <div className="text-slate-500 mt-1">
                        {item.valorFaturamento ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorFaturamento) : "R$ 0,00"}
                      </div>
                      <div className="text mt-2">Valor do Financiamento</div>
                      <div className="text-slate-500 mt-1">
                        {item.valorFinanciamento ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorFinanciamento) : "R$ 0,00"}
                      </div>
                      <div className="text mt-2">Nome do Contato</div>
                      <div className="text-slate-500 mt-1">
                        {item.contatoNome}
                      </div>
                      <div className="text mt-2">Email</div>
                      <div className="text-slate-500 mt-1">
                        {item.contatoEmail}
                      </div>
                      <div className="text mt-2">Telefone</div>
                      <div className="text-slate-500 mt-1">
                        {item.contatoTelefone}
                      </div>
                    </div>
                  );
                })
             }
          
            </div>
            <div className="px-5 pb-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowModalViewProposal(false);
                }}
                className="btn btn-danger w-24"
              >
                Fechar
              </button>
            </div>
          </ModalBody>
        </Modal>
      )}

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
              Você realmente deseja excluir esse registro?
              <br />
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
            <button
              type="button"
              className="btn btn-danger w-24"
              onClick={() => remove(id)}
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DataTable;
