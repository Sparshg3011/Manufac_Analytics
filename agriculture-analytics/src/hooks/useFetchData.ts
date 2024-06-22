import { useEffect, useState } from 'react';

export interface CropData {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string;
  "Area Under Cultivation (UOM:Ha(Hectares))": string;
}

const useFetchData = (url: string) => {
  const [data, setData] = useState<CropData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => setError(error));
  }, [url]);

  return { data, error };
};

export default useFetchData;
