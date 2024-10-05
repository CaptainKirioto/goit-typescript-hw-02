import s from "./ImageCard.module.css";

const ImageCard = ({ image, openModal }) => {
  return (
    <div className={s.wrapper}>
      <img
        src={image.urls.small}
        alt={image.description}
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
