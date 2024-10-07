import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { Image } from "../App/App.types";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d9c4a7",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

type ImageModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  image: Image | null;
};

const ImageModal = ({ isOpen, closeModal, image }: ImageModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className={s.modal}
    >
      {image && (
        <img
          src={image.urls.regular}
          alt={image.description}
          className={s.image}
        />
      )}
    </Modal>
  );
};

export default ImageModal;
