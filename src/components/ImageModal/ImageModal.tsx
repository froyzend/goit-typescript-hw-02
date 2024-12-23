import { CgCloseR } from "react-icons/cg";
import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { CSSProperties } from "react";
import { ImageType } from "../../types/common.types";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedImage: ImageType | null;
  style: {
    overlay: CSSProperties;
    content: CSSProperties;
  };
  shouldCloseOnEsc: boolean;
  shouldCloseOnOverlayClick: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
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
      <button
        aria-label="Close modal"
        onClick={onRequestClose}
        className={css.closeButton}
      >
        <CgCloseR />
      </button>
      {selectedImage ? (
        <>
          <img
            src={selectedImage.urls.regular}
            alt={selectedImage.alt_description || "No description"}
            loading="lazy"
            className={css.image}
          />
          <div className={css.info}>
            <span className={css.likes}>
              Likes: {selectedImage?.likes || 0}
            </span>
            <span className={css.author}>
              Author: {selectedImage?.user?.name || "Unknown"}
            </span>
          </div>
        </>
      ) : null}
    </Modal>
  );
};

export default ImageModal;
