import React from 'react';
import { Container, Title } from '@mantine/core';
import './App.css';
import useFetchData from './hooks/useFetchData';
import { processYearlyData, processAverageData, CropData, YearlyData, AverageData } from './utils/dataProcessing';
import YearlyTable from './components/YearlyTable';
import AverageTable from './components/AverageTable';

const App: React.FC = () => {
  const { data, error } = useFetchData('/crops.json');

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const yearlyData: YearlyData[] = processYearlyData(data);
  const averageData: AverageData[] = processAverageData(data);

  return (
    <Container>
      <Title order={1} className="center-text" mt="md" mb="md">Crop Data</Title>
      <YearlyTable data={yearlyData} />

      <Title order={2} className="center-text" mt="md" mb="md">Average Crop Data (1950-2020)</Title>
      <AverageTable data={averageData} />
    </Container>
  );
};

export default App;
