import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface RejectModalComponentProps {
  isOpen: boolean;
  handleSave: () => void;
  handleClose: () => void;
}

const RejectModalComponent: React.FC<RejectModalComponentProps> = ({ isOpen, handleSave, handleClose }) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const onSave = () => {
    handleSave();
    setShow(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete this question?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onSave}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectModalComponent;
