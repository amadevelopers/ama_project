// TableHead.jsx
import React from 'react';
import './table.css'
const TableHead = ({ tableHead }) => {
  return (
    <thead className='table-head'>
      <tr className='table-head-row'>
        {tableHead.map((column, index) => (
          <th key={index} className='table-head-cell'>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// TableBody.jsx

const TableBody = ({ rowData }) => (
  <tbody>
    {rowData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {Object.values(row).map((cell, cellIndex) => (
          <td key={cellIndex}>
            {/* Handle nested objects */}
            {typeof cell === 'object' ? (
              Object.values(cell).map((nestedValue, nestedIndex) => (
                <div key={nestedIndex}>{nestedValue}</div>
              ))
            ) : (
              cell
            )}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);


export { TableBody, TableHead };















