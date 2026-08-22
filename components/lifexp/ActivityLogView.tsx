import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityLog } from '@/types/lifexp';
import { CyberTheme } from '@/constants/theme';

interface ActivityLogViewProps {
  activities: ActivityLog[];
}

const getActionIcon = (action: string) => {
  if (action.includes('Quest')) {
    return <MaterialCommunityIcons name="sword-cross" size={14} color={CyberTheme.cyan} />;
  } else if (action.includes('Habit')) {
    return <MaterialCommunityIcons name="fire" size={14} color={CyberTheme.amber} />;
  } else if (action.includes('Level')) {
    return <Ionicons name="trophy" size={14} color={CyberTheme.purple} />;
  } else if (action.includes('Loot') || action.includes('Purchased')) {
    return <FontAwesome5 name="shopping-bag" size={12} color={CyberTheme.emerald} />;
  }
  return <Ionicons name="flash" size={14} color={CyberTheme.cyan} />;
};

export const ActivityLogView: React.FC<ActivityLogViewProps> = ({ activities }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerGroup}>
        <View style={styles.titleRow}>
          <MaterialCommunityIcons name="pulse" size={18} color={CyberTheme.cyan} />
          <Text style={styles.sectionTitle}>SYSTEM ACTIVITY AUDIT</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Real-time ledger of completed achievements, habit logs and combat rewards.
        </Text>
      </View>

      {/* Activities List */}
      <View style={styles.logList}>
        {activities.map(act => {
          const dateObj = new Date(act.timestamp);
          const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <View key={act.id} style={styles.logCard}>
              <View style={styles.iconBox}>{getActionIcon(act.action)}</View>

              <View style={styles.logInfo}>
                <View style={styles.logMetaRow}>
                  <Text style={styles.actionName}>{act.action.toUpperCase()}</Text>
                  <Text style={styles.timestamp}>{timeStr}</Text>
                </View>
                <Text style={styles.detailsText}>{act.details}</Text>
              </View>

              {/* Gains */}
              {(act.xpGained > 0 || act.goldGained > 0) && (
                <View style={styles.gainsColumn}>
                  {act.xpGained > 0 && (
                    <Text style={styles.xpGainText}>+{act.xpGained} XP</Text>
                  )}
                  {act.goldGained > 0 && (
                    <Text style={styles.goldGainText}>+{act.goldGained} G</Text>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 14,
  },
  headerGroup: {
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sectionSubtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
  },
  logList: {
    gap: 8,
  },
  logCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInfo: {
    flex: 1,
    gap: 2,
  },
  logMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionName: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timestamp: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  detailsText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  gainsColumn: {
    alignItems: 'flex-end',
    gap: 2,
  },
  xpGainText: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '900',
  },
  goldGainText: {
    color: CyberTheme.amber,
    fontSize: 10,
    fontWeight: '900',
  },
});
