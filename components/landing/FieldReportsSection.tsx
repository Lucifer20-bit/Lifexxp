import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

const REPORTS = [
  {
    role: 'Staff Distributed Systems Engineer',
    rank: 'Level 12 Adept',
    quote:
      'Replaced 4 fragmented tracking apps with LifeXP’s single character loop. Completed two major infrastructure migrations with uncompromising focus.',
    operative: 'K. Vance // Silicon Valley',
  },
  {
    role: 'Solo Founder & Fullstack Architect',
    rank: 'Level 9 Hunter',
    quote:
      'The S-Rank quest mechanics and habit multipliers turned shipping production features into an addictive, self-reinforcing daily standard.',
    operative: 'E. Chen // London',
  },
  {
    role: 'Marathoner & Algorithm Specialist',
    rank: 'Level 15 Monarch',
    quote:
      'Connecting physical vitality directly to cognitive performance metrics tripled my deep work capacity without exhausting baseline reserves.',
    operative: 'M. Satoru // Tokyo',
  },
];

export const FieldReportsSection: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerGroup}>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionBadgeText}>OPERATIVE CASE STUDIES</Text>
        </View>
        <Text style={styles.title}>Field Reports & Case Evidence</Text>
        <Text style={styles.subtitle}>
          Real transformation logs from engineers, founders, and specialists operating under the LifeXP protocol.
        </Text>
      </View>

      {/* Reports Grid */}
      <View style={styles.grid}>
        {REPORTS.map((report, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.roleGroup}>
                <Text style={styles.roleText}>{report.role}</Text>
                <Text style={styles.operativeText}>{report.operative}</Text>
              </View>
              <View style={styles.rankPill}>
                <Text style={styles.rankPillText}>{report.rank}</Text>
              </View>
            </View>

            <Text style={styles.quoteText}>"{report.quote}"</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  headerGroup: {
    alignItems: 'center',
    gap: 8,
  },
  sectionBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sectionBadgeText: {
    color: CyberTheme.emerald,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 26,
  },
  subtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 550,
  },
  grid: {
    gap: 10,
  },
  card: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 14,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 8,
    gap: 8,
  },
  roleGroup: {
    flex: 1,
    gap: 2,
  },
  roleText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  operativeText: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '600',
  },
  rankPill: {
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.35)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rankPillText: {
    color: CyberTheme.purple,
    fontSize: 9,
    fontWeight: '800',
  },
  quoteText: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    fontStyle: 'italic',
  },
});
