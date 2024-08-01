import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRecord, updateRecord } from '../features/records/recordsSlice';
import { Modal, Button } from 'react-bootstrap';

const RecordForm = ({ record = null, closeModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(record ? record.name : '');
  const [value, setValue] = useState(record ? record.value : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (record) {
      await dispatch(updateRecord({ id: record._id, updatedRecord: { name, value } }));
    } else {
      await dispatch(addRecord({ name, value }));
    }

    setName('');
    setValue('');
    closeModal();
  };

  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{record ? 'Edit Record' : 'Create Record'}</Modal.Title>
      </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Value:</label>
              <input
                type="text"
                className="form-control"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
              <Button type="submit" className="btn btn-primary">
                {record ? 'Update' : 'Create'}
              </Button>
          </Modal.Footer>
        </form>
    </Modal>
  );
};

export default RecordForm;