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
  Hour: {
    labels: ['1A', '6A', '9A', '12P', '3P', '6P'],
    plant: [0, 0, 0.1, 0.4, 1.0, 1.4, 1.5, 1.6, 1.3, 1.5, 1.4, 1.3, 1.5, 1.6, 1.0, 0.3, 0],
    twin: [0, 0, 0.1, 0.5, 1.1, 1.3, 1.6, 1.5, 1.4, 1.4, 1.5, 1.4, 1.5, 1.5, 1.1, 0.4, 0],
  },
  Day: {
    labels: ['14A', '17A', '20A', '24A', '27A', '01M', '07M', '12M'],
    plant: [9, 8, 11, 6, 4, 10, 9, 2, 8, 9, 6, 10, 9, 7, 8, 4, 6, 3, 6, 5, 6, 9],
    twin: [10, 9, 12, 8, 9, 11, 10, 9, 9, 12, 8, 12, 11, 9, 10, 3, 7, 10, 9, 8, 3, 9],
  },
  Month: {
    labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
    plant: [45, 52, 78, 95, 110, 130, 120, 115, 98, 70, 50, 38],
    twin: [50, 55, 80, 100, 115, 135, 125, 120, 100, 75, 52, 40],
  },
};

export const kpis = [
  { label: 'Power generated', value: '209.16', unit: 'kWh', period: '1 month' },
  { label: 'Financial savings', value: '209.16', unit: '$', period: '1 month' },
];

export const systemHealth = 95;
