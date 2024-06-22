import React from 'react';
import { Table } from '@mantine/core';
import { AverageData } from '../utils/dataProcessing';

interface AverageTableProps {
  data: AverageData[];
}

const AverageTable: React.FC<AverageTableProps> = ({ data }) => {
  const rows = data.map((item, index) => (
    <tr key={index}>
      <td>{item.cropName}</td>
      <td>{item.avgYield}</td>
      <td>{item.avgArea}</td>
    </tr>
  ));

  return (
    <Table striped highlightOnHover className="data-table">
      <thead>
        <tr>
          <th>Crop Name</th>
          <th>Average Yield of the Crop between 1950-2020 (Kg/Ha)</th>
          <th>Average Cultivation Area of the Crop between 1950-2020 (Ha)</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
};

export default AverageTable;
