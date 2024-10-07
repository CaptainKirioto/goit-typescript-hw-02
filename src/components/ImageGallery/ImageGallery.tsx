import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { Image } from "../App/App.types";

type ImageGalleryProps = {
  images: Image[];
  openModal: (image: Image) => void;
};

const ImageGallery = ({ images, openModal }: ImageGalleryProps) => {
  return (
    <ul className={s.gallery}>
      {images.map((image) => (
        <li className={s.imgItem} key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
