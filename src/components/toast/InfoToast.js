import { Toast, ToastContainer } from "react-bootstrap";

const InfoToast = ({ show, setShow, message, type }) => {
  return (
    <ToastContainer className="p-3" position="top-center">
      <Toast bg={type} onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">{type}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default InfoToast;
