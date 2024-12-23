import { ImageType } from "../../types/common.types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  cards: ImageType[]; // Массив объектов изображений
  openModal: (id: string) => void; // Функция для открытия модального окна
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  cards = [],
  openModal,
}) => {
  return (
    <ul className={css.ImageGalleryList}>
      {cards.map((card) => (
        <li className={css.galleryItem} key={card.id}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openModal(card.id);
            }}
          >
            <ImageCard
              gallerySize={card.urls.thumb}
              descr={card.alt_description || "No description"}
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
