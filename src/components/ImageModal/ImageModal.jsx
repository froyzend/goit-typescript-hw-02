import { CgCloseR } from "react-icons/cg";
import Modal from "react-modal";
Modal.setAppElement("#root");
import css from "./ImageModal.module.css";

const ImageModal = ({
  isOpen,
  onRequestClose,
  selectedImage,
  style,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={style}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <button onClick={onRequestClose}>
        <CgCloseR />
      </button>
      {selectedImage ? (
        <>
          <img
            src={selectedImage.urls.regular}
            alt={selectedImage.alt_description || ""}
            loading="lazy"
          />
          <span className={css.likes}>Likes: {selectedImage.likes}</span>
          <span className={css.author}>Author: {selectedImage.user.name}</span>
        </>
      ) : (
        ""
      )}
    </Modal>
  );
};

export default ImageModal;
