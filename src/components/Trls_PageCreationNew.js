import React, { useState } from 'react';
import "../assets/styles/trls_pageCreation_new.css";
import PreviewPage from './Trls_PreviewPage';
import ColumnLayout from './Trls_ColumnLayout';
import Properties from '../components/Trls_Properties';

const PageCreation = () => {
  const [rows, setRows] = useState([{ id: 1, dropdownValue: '0', properties: {} }]);
  const [nextId, setNextId] = useState(2);
  const [selectedColumnValues, setSelectedColumnValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(null);

  const handleAddRow = () => {
    const newRow = { id: nextId, dropdownValue: '0', properties: {} };
    setRows([...rows, newRow]);
    setNextId(nextId + 1);
  };

  const handleColumnSelectChange = (rowId, columnIndex, selectedValue) => {
    setSelectedColumnValues(prevValues => ({
      ...prevValues,
      [rowId]: {
        ...prevValues[rowId],
        [columnIndex]: selectedValue,
      },
    }));

    handleOpenPropertiesModal(rowId, columnIndex);
  };

  const handleRemoveRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handlePropertiesChange = (rowId, columnIndex, updatedProperties) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            properties: {
              ...row.properties,
              [columnIndex]: updatedProperties,
            },
          };
        }
        return row;
      })
    );
  };

  const handleCreate = () => {
    const dataToSave = rows.map((row) => ({
      id: row.id,
      controlType: row.dropdownValue,
      properties: row.properties,
    }));
    console.log(JSON.stringify(dataToSave, null, 2));
  };

  const handleOpenPropertiesModal = (rowId, columnIndex) => {
    setCurrentRowId(rowId);
    setCurrentColumnIndex(columnIndex);
    setIsModalOpen(true);
  };

  const handleClosePropertiesModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="gallery-mainpage">
      <div className="main-container">
        <div className="pcpheader">Project Creation Page</div>
        <div className="gallery-container">
          {rows.map((row, rowIndex) => (
            <div key={row.id} className="gallery-row">
              {isModalOpen && currentRowId === row.id && (
                <Properties
                  onClose={handleClosePropertiesModal}
                  label={selectedColumnValues[row.id]?.[currentColumnIndex] || '0'}
                  dspname={`Display Name (${row.id}, ${currentColumnIndex + 1})`}
                  onChange={(properties) => handlePropertiesChange(row.id, currentColumnIndex, properties)}
                  initialProperties={row.properties[currentColumnIndex] || {}}
                />
              )}

              <div className="gallery-layout">
                <select
                  value={row.dropdownValue}
                  onChange={(e) => setRows(rows.map((r) => (r.id === row.id ? { ...r, dropdownValue: e.target.value } : r)))}
                >
                  <option value="0">Select Layout</option>
                  <option value="1">Single Column</option>
                  <option value="2">Two Columns</option>
                  <option value="3">Three Columns</option>
                </select>
              </div>

              <div className="gallery-select">
                <ColumnLayout
                  ddsev={row.dropdownValue}
                  columnIndex={rowIndex}
                  onSelectChange={(columnIndex, selectedValue) => handleColumnSelectChange(row.id, columnIndex, selectedValue)}
                  handleOpenPropertiesModal={(columnIndex) => handleOpenPropertiesModal(row.id, columnIndex)}
                />
              </div>
              <div className="gallery-delete">
                <div className="pgcactdelete">
                  <button onClick={() => handleRemoveRow(row.id)}></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="buttonsdiv">
          <button onClick={handleAddRow}>Add New Parameter</button>
          <button onClick={handleCreate}>Create Project</button>
        </div>
      </div>

      <div className="previewpage-container">
        <div className="pcppheader">Preview</div>
        <div className='previewpage'>
        <PreviewPage rows={rows} selectedColumnValues={selectedColumnValues}
        onSubmit={handleCreate} 
        />
        </div>
      </div>
    </div>
  );
};

export default PageCreation;
