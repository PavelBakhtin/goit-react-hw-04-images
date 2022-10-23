import { render } from '@testing-library/react';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export class GalleryImageItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { img, alt, largeImg } = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          src={img}
          alt={alt}
          className={css.ImageGalleryItemImg}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={largeImg}
              alt={alt}
              className={css.ImageGalleryLargeImg}
            />
          </Modal>
        )}
      </li>
    );
  }
}
GalleryImageItem.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
