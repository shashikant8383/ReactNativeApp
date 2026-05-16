export type MetricRange = 'Hour' | 'Day' | 'Month';
export type KpiOption = 'AC Energy (kWh)' | 'DC Energy (kWh)' | 'Specific Energy' | 'Cap. Utilization Factor' | 'Revenue';
export type LanguageCode = 'EN' | 'DE' | 'PT' | 'FR' | 'IT';

export const metricRanges: MetricRange[] = ['Hour', 'Day', 'Month'];
export const kpiOptions: KpiOption[] = [
  'AC Energy (kWh)',
  'DC Energy (kWh)',
  'Specific Energy',
  'Cap. Utilization Factor',
  'Revenue',
];

export const languageOptions: Array<{
  code: LanguageCode;
  name: string;
  nativeName: string;
  color: string;
}> = [
  { code: 'EN', name: 'English', nativeName: 'English', color: '#294093' },
  { code: 'DE', name: 'Deutsch', nativeName: 'German', color: '#2f2f2f' },
  { code: 'PT', name: 'Português', nativeName: 'Portuguese', color: '#1f6b1e' },
  { code: 'FR', name: 'Français', nativeName: 'French', color: '#102b9b' },
  { code: 'IT', name: 'Italiano', nativeName: 'Italian', color: '#39944a' },
];

export const plantInfo = {
  name: 'Plant: 13 - IVAIR FRESCHI - 0220635-99',
  address: 'R. Luciane Simone Brando, 42 - Desvio Rizzo, Caxias do Sul - RS',
  power: '2.3 kW',
  installDate: '2022-04-23',
  status: 'Active',
};

export const userProfile = {
  initials: 'RF',
  name: 'Renato Fisico',
  email: 'renatofisico@solarprime.com',
};

export const baseEnergyChartData = {
  labels: ['14A', '17A', '20A', '23A', '26A', '01M', '04M', '07M', '12M'],
  plant: [8.7, 9.4, 8.1, 10.4, 5.8, 3.7, 8.6, 9.9, 10.7],
  twin: [10.0, 8.6, 11.3, 7.7, 9.4, 8.8, 10.4, 8.8, 9.1],
};

export const kpis = [
  { label: 'Power generated', value: '209.16', unit: 'kWh', period: '1 month' },
  { label: 'Financial savings', value: '209.16', unit: '$', period: '1 month' },
];

export const systemHealth = 95;
