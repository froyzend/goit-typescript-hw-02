import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ cards = [], openModal }) => {
  return (
    <>
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
                gallerySize={card.urls.small}
                descr={card.alt_description}
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ImageGallery;
