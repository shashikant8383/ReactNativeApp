import { useEffect, useMemo, useState } from 'react';

import { baseEnergyChartData, MetricRange } from '../data/monitoring';

function driftValue(previous: number, max: number, min = 0) {
  const drift = Math.random() * max * 0.08 - max * 0.035;
  return Math.max(min, Math.min(max, Number((previous + drift).toFixed(1))));
}

export function useLiveEnergyData(range: MetricRange, legend = ['Plant measurement', 'Digital twin']) {
  const rangeData = baseEnergyChartData[range];
  const max = range === 'Hour' ? 1.6 : range === 'Day' ? 12 : 140;
  const [plantData, setPlantData] = useState(rangeData.plant);
  const [twinData, setTwinData] = useState(rangeData.twin);

  useEffect(() => {
    setPlantData(rangeData.plant);
    setTwinData(rangeData.twin);
  }, [rangeData.plant, rangeData.twin]);

  useEffect(() => {
    if (range !== 'Hour') {
      return;
    }

    const timer = setInterval(() => {
      setPlantData((current) => [...current.slice(1), driftValue(current[current.length - 1], max)]);
      setTwinData((current) => [...current.slice(1), driftValue(current[current.length - 1], max)]);
    }, 3000);

    return () => clearInterval(timer);
  }, [max, range]);

  return useMemo(
    () => ({
      labels: rangeData.labels,
      plant: plantData,
      twin: twinData,
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
      //legend,
    }),
    [legend, plantData, rangeData.labels, twinData]
  );
}
