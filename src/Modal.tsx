import React, {  useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = () => {
    onClose();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && isOpen) {
      if (!modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <div className="modal-content">{children}</div>
        <button className="modal-close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export default Modal;
