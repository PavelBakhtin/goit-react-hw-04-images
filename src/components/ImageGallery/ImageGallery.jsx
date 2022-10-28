import { GalleryImageItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
export const ImageGallery = ({ galleryImages }) => {
  return (
    <ul className={css.ImageGallery}>
      {galleryImages.map(({ id, webformatURL, tags, largeImageURL }) => (
        <GalleryImageItem
          key={id}
          img={webformatURL}
          alt={tags}
          largeImg={largeImageURL}
        />
      ))}
    </ul>
  );
};
