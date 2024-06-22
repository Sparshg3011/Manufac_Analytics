export interface CropData {
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": string;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string;
    "Area Under Cultivation (UOM:Ha(Hectares))": string;
  }
  
  export interface YearlyData {
    year: string;
    maxCrop: string;
    minCrop: string;
  }
  
  export interface AverageData {
    cropName: string;
    avgYield: string;
    avgArea: string;
  }
  
  export const processYearlyData = (data: CropData[]): YearlyData[] => {
    const yearMap: { [year: string]: { max: { crop: string; production: number }; min: { crop: string; production: number } } } = {};
  
    data.forEach(item => {
      const year = item.Year;
      const cropName = item["Crop Name"];
      const production = parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0;
  
      if (!yearMap[year]) {
        yearMap[year] = { max: { crop: cropName, production }, min: { crop: cropName, production } };
      } else {
        if (production > yearMap[year].max.production) {
          yearMap[year].max = { crop: cropName, production };
        }
  
        if (production < yearMap[year].min.production) {
          yearMap[year].min = { crop: cropName, production };
        }
      }
    });
  
    return Object.keys(yearMap).map(year => ({
      year,
      maxCrop: yearMap[year].max.crop,
      minCrop: yearMap[year].min.crop,
    }));
  };
  
  export const processAverageData = (data: CropData[]): AverageData[] => {
    const cropMap: { [crop: string]: { totalYield: number; totalArea: number; count: number } } = {};
  
    data.forEach(item => {
      const cropName = item["Crop Name"];
      const yieldValue = parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
      const areaValue = parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;
  
      if (!cropMap[cropName]) {
        cropMap[cropName] = { totalYield: yieldValue, totalArea: areaValue, count: 1 };
      } else {
        cropMap[cropName].totalYield += yieldValue;
        cropMap[cropName].totalArea += areaValue;
        cropMap[cropName].count += 1;
      }
    });
  
    return Object.keys(cropMap).map(cropName => ({
      cropName,
      avgYield: (cropMap[cropName].totalYield / cropMap[cropName].count).toFixed(3),
      avgArea: (cropMap[cropName].totalArea / cropMap[cropName].count).toFixed(3),
    }));
  };
  