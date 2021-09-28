import css from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ gallery, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {gallery.map((image) => (
        <ImageGalleryItem image={image} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
