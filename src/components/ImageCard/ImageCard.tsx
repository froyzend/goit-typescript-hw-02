import css from "./ImageCard.module.css";
interface ImageCardProps {
  gallerySize: string;
  descr: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ gallerySize, descr }) => {
  return (
    <div>
      <img className={css.image} src={gallerySize} alt={descr} loading="lazy" />
    </div>
  );
};

export default ImageCard;
