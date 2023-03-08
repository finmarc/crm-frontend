import { Lucide, Modal, ModalBody } from "@/base-components";

type PropsData = {
  setDeleteConfirmationModal: Function;
  deleteConfirmationModal: boolean;
};
export default function ModalDelete({
  setDeleteConfirmationModal,
  deleteConfirmationModal,
}: PropsData): void {
  <Modal
    show={deleteConfirmationModal}
    onHidden={() => {
      setDeleteConfirmationModal(deleteConfirmationModal);
    }}
  >
    <ModalBody className="p-0">
      <div className="p-5 text-center">
        <Lucide icon="XCircle" className="w-16 h-16 text-danger mx-auto mt-3" />
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
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn  w-24"
          onClick={() => setDeleteConfirmationModal(false)}
        >
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>;
}
