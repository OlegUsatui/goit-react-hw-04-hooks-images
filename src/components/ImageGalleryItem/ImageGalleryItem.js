import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem ({image, openModal}) {
    return (
        <li className={css.ImageGalleryItem} onClick={() => openModal(image.largeImageURL)} key={image.id}>
            <img src={image.webformatURL} alt="" className={css.ImageGalleryItemImage} />
        </li>
    );
};

