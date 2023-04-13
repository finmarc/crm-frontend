import {
    Lucide,
    Modal,
    ModalBody,
} from "@/base-components";

interface Props {
    setConfirmationModal: Function,
    confirmationModal: boolean,
    children?: React.ReactNode,
}
export default function ModalBase({ setConfirmationModal, confirmationModal, ...rest }: Props) {
    <>
        <Modal
            show={confirmationModal}
            onHidden={() => {
                setConfirmationModal(false);
            }}
        >
            <ModalBody className="p-0">
                <div className="p-5">
                    {rest.children}
                </div>
                <div className="px-5 pb-8 text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setConfirmationModal(false);
                        }}
                        className="btn btn-outline-secondary w-24 mr-1"
                    >
                        Cancel
                    </button>
                    <button type="button" className="btn btn-danger w-24" onClick={() => setConfirmationModal(false)}>
                        Delete
                    </button>
                </div>
            </ModalBody>
        </Modal>
    </>

}