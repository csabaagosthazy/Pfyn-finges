import { Modal } from "react-bootstrap";

const PopUpModal = ({ title, show, handleHide, component }) => {
  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{component}</Modal.Body>
    </Modal>
  );
};

export default PopUpModal;
