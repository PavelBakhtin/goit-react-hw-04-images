import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackDropClick}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
