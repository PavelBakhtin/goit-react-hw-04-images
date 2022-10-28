import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const GalleryImageItem = ({ img, alt, largeImg }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={img}
        alt={alt}
        className={css.ImageGalleryItemImg}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImg} alt={alt} className={css.ImageGalleryLargeImg} />
        </Modal>
      )}
    </li>
  );
};

GalleryImageItem.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  largeImg: PropTypes.string,
};
