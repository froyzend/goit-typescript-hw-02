import css from "./ImageCard.module.css";
const ImageCard = ({ gallerySize, descr }) => {
  return (
    <div>
      <img className={css.image} src={gallerySize} alt={descr} loading="lazy" />
    </div>
  );
};

export default ImageCard;
