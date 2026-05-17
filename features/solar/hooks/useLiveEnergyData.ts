import { useEffect, useMemo, useState } from 'react';

import { baseEnergyChartData } from '../data/monitoring';

function nextValue(previous: number) {
  const drift = Math.random() * 1.8 - 0.6;
  return Math.max(1, Math.min(12, Number((previous + drift).toFixed(1))));
}

export function useLiveEnergyData(legend = ['Plant measurement', 'Digital twin']) {
  const [plantData, setPlantData] = useState(baseEnergyChartData.plant);
  const [twinData, setTwinData] = useState(baseEnergyChartData.twin);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlantData((current) => [...current.slice(1), nextValue(current[current.length - 1])]);
      setTwinData((current) => [...current.slice(1), nextValue(current[current.length - 1])]);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return useMemo(
    () => ({
      labels: baseEnergyChartData.labels,
      datasets: [
        {
          data: plantData,
          color: (opacity = 1) => 'rgba(237, 132, 56, ' + opacity + ')',
          strokeWidth: 2,
        },
        {
          data: twinData,
          color: (opacity = 1) => 'rgba(78, 169, 234, ' + opacity + ')',
          strokeWidth: 2,
        },
      ],
      //egend,
    }),
    [legend, plantData, twinData]
  );
}
