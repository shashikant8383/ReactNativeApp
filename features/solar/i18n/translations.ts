import { KpiOption, LanguageCode, MetricRange } from '../data/monitoring';

type Translation = {
  plant: string;
  power: string;
  install: string;
  active: string;
  realTimeMetrics: string;
  plantMeasurement: string;
  digitalTwin: string;
  fullScreen: string;
  close: string;
  selectKpi: string;
  selectLanguage: string;
  dashboard: string;
  changePassword: string;
  logout: string;
  systemHealth: string;
  powerGenerated: string;
  financialSavings: string;
  periodMonth: string;
  ranges: Record<MetricRange, string>;
  kpis: Record<KpiOption, string>;
};

export const translations: Record<LanguageCode, Translation> = {
  EN: {
    plant: 'Plant',
    power: 'Power',
    install: 'Install',
    active: 'Active',
    realTimeMetrics: 'Real time metrics',
    plantMeasurement: 'Plant measurement',
    digitalTwin: 'Digital twin',
    fullScreen: 'Full screen',
    close: 'Close',
    selectKpi: 'Select KPI',
    selectLanguage: 'Select language',
    dashboard: 'Dashboard',
    changePassword: 'Change password',
    logout: 'Log out',
    systemHealth: 'System health',
    powerGenerated: 'Power generated',
    financialSavings: 'Financial savings',
    periodMonth: '1 month',
    ranges: { Hour: 'Hour', Day: 'Day', Month: 'Month' },
    kpis: {
      'AC Energy (kWh)': 'AC Energy (kWh)',
      'DC Energy (kWh)': 'DC Energy (kWh)',
      'Specific Energy': 'Specific Energy',
      'Cap. Utilization Factor': 'Cap. Utilization Factor',
      Revenue: 'Revenue',
    },
  },
  DE: {
    plant: 'Plant',
    power: 'Power',
    install: 'Install',
    active: 'Active',
    realTimeMetrics: 'Echtzeit-Metriken',
    plantMeasurement: 'Anlagenmessung',
    digitalTwin: 'Digitaler Zwilling',
    fullScreen: 'Vollbild',
    close: 'Schließen',
    selectKpi: 'KPI auswählen',
    selectLanguage: 'Sprache auswählen',
    dashboard: 'Dashboard',
    changePassword: 'Passwort ändern',
    logout: 'Abmelden',
    systemHealth: 'Systemgesundheit',
    powerGenerated: 'Erzeugte Leistung',
    financialSavings: 'Fin. Ersparnisse',
    periodMonth: '1 Monat',
    ranges: { Hour: 'Stunde', Day: 'Tag', Month: 'Monat' },
    kpis: {
      'AC Energy (kWh)': 'AC Energie (kWh)',
      'DC Energy (kWh)': 'DC Energie (kWh)',
      'Specific Energy': 'Spez. Energie',
      'Cap. Utilization Factor': 'Kap. Nutzungsfaktor',
      Revenue: 'Umsatz',
    },
  },
  PT: {
    plant: 'Planta',
    power: 'Potência',
    install: 'Instalação',
    active: 'Ativo',
    realTimeMetrics: 'Métricas em tempo real',
    plantMeasurement: 'Medição da planta',
    digitalTwin: 'Gêmeo digital',
    fullScreen: 'Tela cheia',
    close: 'Fechar',
    selectKpi: 'Selecionar KPI',
    selectLanguage: 'Selecionar idioma',
    dashboard: 'Painel',
    changePassword: 'Alterar senha',
    logout: 'Sair',
    systemHealth: 'Saúde do sistema',
    powerGenerated: 'Energia gerada',
    financialSavings: 'Economia financeira',
    periodMonth: '1 mês',
    ranges: { Hour: 'Hora', Day: 'Dia', Month: 'Mês' },
    kpis: {
      'AC Energy (kWh)': 'Energia AC (kWh)',
      'DC Energy (kWh)': 'Energia DC (kWh)',
      'Specific Energy': 'Energia específica',
      'Cap. Utilization Factor': 'Fator de utilização',
      Revenue: 'Receita',
    },
  },
  FR: {
    plant: 'Centrale',
    power: 'Puissance',
    install: 'Installation',
    active: 'Actif',
    realTimeMetrics: 'Mesures en temps réel',
    plantMeasurement: 'Mesure centrale',
    digitalTwin: 'Jumeau numérique',
    fullScreen: 'Plein écran',
    close: 'Fermer',
    selectKpi: 'Sélectionner KPI',
    selectLanguage: 'Sélectionner la langue',
    dashboard: 'Tableau de bord',
    changePassword: 'Changer le mot de passe',
    logout: 'Déconnexion',
    systemHealth: 'Santé du système',
    powerGenerated: 'Énergie produite',
    financialSavings: 'Économies financières',
    periodMonth: '1 mois',
    ranges: { Hour: 'Heure', Day: 'Jour', Month: 'Mois' },
    kpis: {
      'AC Energy (kWh)': 'Énergie AC (kWh)',
      'DC Energy (kWh)': 'Énergie DC (kWh)',
      'Specific Energy': 'Énergie spécifique',
      'Cap. Utilization Factor': "Facteur d'utilisation",
      Revenue: 'Revenu',
    },
  },
  IT: {
    plant: 'Impianto',
    power: 'Potenza',
    install: 'Installazione',
    active: 'Attivo',
    realTimeMetrics: 'Metriche in tempo reale',
    plantMeasurement: "Misura dell'impianto",
    digitalTwin: 'Gemello digitale',
    fullScreen: 'Schermo intero',
    close: 'Chiudi',
    selectKpi: 'Seleziona KPI',
    selectLanguage: 'Seleziona lingua',
    dashboard: 'Dashboard',
    changePassword: 'Cambia password',
    logout: 'Esci',
    systemHealth: 'Salute del sistema',
    powerGenerated: 'Energia prodotta',
    financialSavings: 'Risparmio finanziario',
    periodMonth: '1 mese',
    ranges: { Hour: 'Ora', Day: 'Giorno', Month: 'Mese' },
    kpis: {
      'AC Energy (kWh)': 'Energia AC (kWh)',
      'DC Energy (kWh)': 'Energia DC (kWh)',
      'Specific Energy': 'Energia specifica',
      'Cap. Utilization Factor': 'Fattore di utilizzo',
      Revenue: 'Ricavi',
    },
  },
};
