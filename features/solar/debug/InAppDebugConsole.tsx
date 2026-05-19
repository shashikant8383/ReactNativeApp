import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ApiDebugLog, clearApiDebugLogs, getApiDebugLogs, subscribeToApiDebugLogs } from './debugLogger';
import { solarColors } from '../theme/colors';

type InAppDebugConsoleProps = {
  enabled: boolean;
};

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString();
}

function formatPayload(payload: unknown) {
  if (!payload) {
    return '';
  }

  try {
    return JSON.stringify(payload, null, 2);
  } catch {
    return String(payload);
  }
}

function DebugLogItem({ log }: { log: ApiDebugLog }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isError = Boolean(log.error) || (log.status ? log.status >= 400 : false);

  return (
    <Pressable onPress={() => setIsExpanded((value) => !value)} style={styles.logItem}>
      <View style={styles.logHeader}>
        <Text style={[styles.method, isError && styles.errorText]}>{log.method}</Text>
        <Text style={styles.status}>{log.status ?? 'ERR'}</Text>
        <Text style={styles.duration}>{log.durationMs}ms</Text>
      </View>
      <Text numberOfLines={isExpanded ? undefined : 1} style={styles.url}>
        {log.url}
      </Text>
      <Text style={styles.time}>{formatTime(log.timestamp)}</Text>
      {isExpanded ? (
        <View style={styles.payloadWrap}>
          {log.requestBody ? (
            <>
              <Text style={styles.payloadTitle}>Request</Text>
              <Text style={styles.payloadText}>{formatPayload(log.requestBody)}</Text>
            </>
          ) : null}
          {log.responseBody ? (
            <>
              <Text style={styles.payloadTitle}>Response</Text>
              <Text style={styles.payloadText}>{formatPayload(log.responseBody)}</Text>
            </>
          ) : null}
          {log.error ? (
            <>
              <Text style={styles.payloadTitle}>Error</Text>
              <Text style={styles.payloadText}>{formatPayload(log.error)}</Text>
            </>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}

export function InAppDebugConsole({ enabled }: InAppDebugConsoleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<ApiDebugLog[]>(getApiDebugLogs());

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    return subscribeToApiDebugLogs(setLogs);
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <Pressable onPress={() => setIsOpen(true)} style={styles.fab}>
        <Text style={styles.fabText}>API</Text>
        {logs.length ? <View style={styles.badge}><Text style={styles.badgeText}>{logs.length}</Text></View> : null}
      </Pressable>
      {isOpen ? (
        <View style={styles.overlay}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <View>
                <Text style={styles.title}>API Debug Console</Text>
                <Text style={styles.subtitle}>{logs.length} request logs</Text>
              </View>
              <View style={styles.headerActions}>
                <Pressable onPress={clearApiDebugLogs} style={styles.headerButton}>
                  <Text style={styles.headerButtonText}>Clear</Text>
                </Pressable>
                <Pressable onPress={() => setIsOpen(false)} style={styles.headerButton}>
                  <Text style={styles.headerButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
            <ScrollView contentContainerStyle={styles.logsContent}>
              {logs.length ? (
                logs.map((log) => <DebugLogItem key={log.id} log={log} />)
              ) : (
                <Text style={styles.empty}>No API logs yet. Login or trigger an API call to see it here.</Text>
              )}
            </ScrollView>
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    alignItems: 'center',
    backgroundColor: solarColors.accent,
    borderRadius: 24,
    bottom: 18,
    height: 48,
    justifyContent: 'center',
    position: 'absolute',
    right: 18,
    width: 58,
    zIndex: 40,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#d94d32',
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: -4,
    top: -4,
    minWidth: 20,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 10, 20, 0.62)',
    justifyContent: 'flex-end',
    zIndex: 50,
  },
  panel: {
    backgroundColor: '#0d1a2b',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: '82%',
    minHeight: '62%',
    overflow: 'hidden',
  },
  panelHeader: {
    alignItems: 'center',
    borderBottomColor: '#20324d',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '900',
  },
  subtitle: {
    color: '#9badc9',
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    backgroundColor: '#20375f',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  headerButtonText: {
    color: '#dbe6fb',
    fontSize: 12,
    fontWeight: '900',
  },
  logsContent: {
    padding: 12,
    paddingBottom: 24,
  },
  logItem: {
    backgroundColor: '#12223a',
    borderColor: '#263a5d',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  logHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  method: {
    color: '#50bf6f',
    fontSize: 12,
    fontWeight: '900',
  },
  errorText: {
    color: '#ff7b64',
  },
  status: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  duration: {
    color: '#9badc9',
    fontSize: 12,
    marginLeft: 'auto',
  },
  url: {
    color: '#c7d4ee',
    fontSize: 11,
    marginTop: 6,
  },
  time: {
    color: '#7589ad',
    fontSize: 10,
    marginTop: 4,
  },
  payloadWrap: {
    marginTop: 10,
  },
  payloadTitle: {
    color: solarColors.accent,
    fontSize: 11,
    fontWeight: '900',
    marginTop: 8,
  },
  payloadText: {
    color: '#dbe6fb',
    fontFamily: 'monospace',
    fontSize: 10,
    marginTop: 4,
  },
  empty: {
    color: '#9badc9',
    fontSize: 14,
    padding: 20,
    textAlign: 'center',
  },
});
