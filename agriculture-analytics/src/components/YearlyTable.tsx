import React from 'react';
import { Table } from '@mantine/core';
import { YearlyData } from '../utils/dataProcessing';

interface YearlyTableProps {
  data: YearlyData[];
}

const YearlyTable: React.FC<YearlyTableProps> = ({ data }) => {
  const rows = data.map((item, index) => (
    <tr key={index}>
      <td>{item.year}</td>
      <td>{item.maxCrop}</td>
      <td>{item.minCrop}</td>
    </tr>
  ));

  return (
    <Table striped highlightOnHover className="data-table">
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Maximum Production in that Year</th>
          <th>Crop with Minimum Production in that Year</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
};

export default YearlyTable;
