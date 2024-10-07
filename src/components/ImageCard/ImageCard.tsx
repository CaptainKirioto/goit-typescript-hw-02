import s from "./ImageCard.module.css";
import { Image } from "../App/App.types";

type ImageCardProps = {
  image: Image;
  openModal: (image: Image) => void;
};

const ImageCard = ({ image, openModal }: ImageCardProps) => {
  return (
    <div className={s.wrapper}>
      <img
        src={image.urls.small}
        alt={image.description || "Image description"}
        className={s.image}
        onClick={() => openModal(image)}
      />
      <div className={s.info}>
        <img src={image.user.profile_image.small} className={s.profileImg} />

        <p>{image.user.name}</p>
      </div>
    </div>
  );
};

export default ImageCard;
