export type ApiDebugLog = {
  durationMs: number;
  error?: unknown;
  id: string;
  method: string;
  requestBody?: unknown;
  requestHeaders?: Record<string, string>;
  responseBody?: unknown;
  status?: number;
  timestamp: number;
  url: string;
};

type Listener = (logs: ApiDebugLog[]) => void;

const MAX_LOGS = 80;
const listeners = new Set<Listener>();
let logs: ApiDebugLog[] = [];

function notify() {
  listeners.forEach((listener) => listener(logs));
}

export function addApiDebugLog(log: Omit<ApiDebugLog, 'id' | 'timestamp'>) {
  logs = [
    {
      ...log,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      timestamp: Date.now(),
    },
    ...logs,
  ].slice(0, MAX_LOGS);

  notify();
}

export function clearApiDebugLogs() {
  logs = [];
  notify();
}

export function getApiDebugLogs() {
  return logs;
}

export function subscribeToApiDebugLogs(listener: Listener) {
  listeners.add(listener);
  listener(logs);

  return () => {
    listeners.delete(listener);
  };
}
