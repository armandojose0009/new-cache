import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecords } from '../features/records/recordsSlice';
import RecordForm from './RecordForm';

const RecordsList = () => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records.records);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    dispatch(fetchRecords());
  }, [dispatch]);

  const openModal = (record = null) => {
    setCurrentRecord(record);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentRecord(null);
    setModalOpen(false);
  };

  return (
    <div className="container mt-4">
      <h2>Records List</h2>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>
        Add New Record
      </button>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.name}</td>
              <td>{record.value}</td>
              <td>
                <button className="btn btn-warning" onClick={() => openModal(record)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <RecordForm record={currentRecord} closeModal={closeModal} />
      )}
    </div>
  );
};

export default RecordsList;