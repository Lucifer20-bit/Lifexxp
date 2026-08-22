import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';
import { useLifeXP } from '@/context/LifeXPContext';
import { QuestionnaireDemo } from '@/components/ui/questionnaire-demo';

export default function OverviewScreen() {
  const { user, resetToDefaults } = useLifeXP();

  const handleReset = () => {
    if (Platform.OS === 'web') {
      if (confirm('Reset all Hunter data back to initial Level 4 Matrix defaults?')) {
        resetToDefaults();
      }
    } else {
      Alert.alert(
        'System Reset',
        'Reset all Hunter data back to initial Level 4 Matrix defaults?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Reset', style: 'destructive', onPress: resetToDefaults },
        ]
      );
    }
  };

  const PILLARS = [
    {
      title: 'PHYSICAL VITALITY',
      subtitle: 'Zone 2 Cardio, Heavy Compounds & Deep Sleep',
      icon: <FontAwesome5 name="heartbeat" size={18} color={CyberTheme.rose} />,
      color: CyberTheme.rose,
      desc: 'Build an unshakeable biological engine. Energy capacity dictates the ceiling of your daily output.',
    },
    {
      title: 'COGNITIVE INTELLECT',
      subtitle: 'Deep Work, Algorithm Drills & Continuous Study',
      icon: <MaterialCommunityIcons name="brain" size={20} color={CyberTheme.cyan} />,
      color: CyberTheme.cyan,
      desc: 'Sharpen your neural circuits with deliberate problem solving and high-retention architectural analysis.',
    },
    {
      title: 'EXECUTION AGILITY',
      subtitle: 'Rapid Iteration, Fast Feedback & Bias to Action',
      icon: <Ionicons name="flash" size={20} color={CyberTheme.amber} />,
      color: CyberTheme.amber,
      desc: 'Eliminate hesitation. Transform strategic plans into shipping software with relentless velocity.',
    },
    {
      title: 'SOVEREIGN DISCIPLINE',
      subtitle: 'Zero Distractions, Habit Streaks & Focus Blocks',
      icon: <Ionicons name="shield-checkmark" size={20} color={CyberTheme.purple} />,
      color: CyberTheme.purple,
      desc: 'Automate high-performance habits. Long streaks multiply your compound growth exponentially.',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.heroSection}>
          <View style={styles.badgeRow}>
            <View style={styles.systemBadge}>
              <Text style={styles.systemBadgeText}>SYSTEM ARCHITECTURE</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>THE HUNTER PROTOCOL</Text>
          <Text style={styles.heroSubtitle}>
            LifeXP is a gamified operating system engineered to transform human biology, focus, and career milestones into an immersive RPG progression.
          </Text>
        </View>

        {/* Current Operative Info */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <MaterialCommunityIcons name="shield-account" size={18} color={CyberTheme.cyan} />
            <Text style={styles.statusTitle}>OPERATIVE STATUS</Text>
          </View>
          <View style={styles.statusGrid}>
            <View style={styles.statusCol}>
              <Text style={styles.statusLabel}>HUNTER NAME</Text>
              <Text style={styles.statusValue}>{user.name}</Text>
            </View>
            <View style={styles.statusCol}>
              <Text style={styles.statusLabel}>RANK TITLE</Text>
              <Text style={styles.statusValueCyan}>{user.title}</Text>
            </View>
            <View style={styles.statusCol}>
              <Text style={styles.statusLabel}>CLEARANCE LEVEL</Text>
              <Text style={styles.statusValuePurple}>Level {user.level}</Text>
            </View>
          </View>
        </View>

        {/* Core Pillars */}
        <View style={styles.pillarsSection}>
          <Text style={styles.sectionHeading}>FOUR CORNERSTONES OF MASTERY</Text>

          <View style={styles.pillarsGrid}>
            {PILLARS.map(pillar => (
              <View key={pillar.title} style={styles.pillarCard}>
                <View style={styles.pillarHeader}>
                  <View style={[styles.pillarIconBox, { backgroundColor: `${pillar.color}15`, borderColor: `${pillar.color}40` }]}>
                    {pillar.icon}
                  </View>
                  <View style={styles.pillarTitleGroup}>
                    <Text style={[styles.pillarTitle, { color: pillar.color }]}>{pillar.title}</Text>
                    <Text style={styles.pillarSubtitle}>{pillar.subtitle}</Text>
                  </View>
                </View>
                <Text style={styles.pillarDesc}>{pillar.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Questionnaire Component Showcase */}
        <View style={styles.questionnaireSection}>
          <View style={styles.questionnaireHeader}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={18} color={CyberTheme.cyan} />
            <Text style={styles.sectionHeading}>HUNTER SURVEY & PROTOCOL QUESTIONNAIRE</Text>
          </View>
          <QuestionnaireDemo />
        </View>

        {/* System Administration & Reset */}
        <View style={styles.adminCard}>
          <View style={styles.adminHeader}>
            <Ionicons name="settings-outline" size={16} color={CyberTheme.textMuted} />
            <Text style={styles.adminTitle}>SYSTEM DIAGNOSTICS & RESET</Text>
          </View>
          <Text style={styles.adminDesc}>
            Need to refresh your trial or reset quest progressions back to the default demo state?
          </Text>
          <Pressable
            style={({ pressed }) => [styles.resetButton, pressed && styles.resetButtonPressed]}
            onPress={handleReset}
          >
            <Ionicons name="refresh" size={14} color={CyberTheme.rose} />
            <Text style={styles.resetButtonText}>RESET DATA TO DEFAULTS</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CyberTheme.bg,
  },
  container: {
    flex: 1,
    backgroundColor: CyberTheme.bg,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  heroSection: {
    gap: 8,
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CyberTheme.borderHighlight,
    padding: 18,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  systemBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  systemBadgeText: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroSubtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  statusCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 14,
    gap: 10,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 6,
  },
  statusTitle: {
    color: CyberTheme.cyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  statusCol: {
    flex: 1,
    minWidth: 90,
    gap: 2,
  },
  statusLabel: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontWeight: '700',
  },
  statusValue: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
  },
  statusValueCyan: {
    color: CyberTheme.cyan,
    fontSize: 13,
    fontWeight: '800',
  },
  statusValuePurple: {
    color: CyberTheme.purple,
    fontSize: 13,
    fontWeight: '800',
  },
  pillarsSection: {
    gap: 10,
  },
  sectionHeading: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  pillarsGrid: {
    gap: 10,
  },
  questionnaireSection: {
    gap: 10,
  },
  questionnaireHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pillarCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 14,
    gap: 8,
  },
  pillarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pillarIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarTitleGroup: {
    flex: 1,
    gap: 2,
  },
  pillarTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  pillarSubtitle: {
    color: CyberTheme.textMuted,
    fontSize: 10,
  },
  pillarDesc: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  adminCard: {
    backgroundColor: '#090D16',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 14,
    gap: 8,
  },
  adminHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  adminTitle: {
    color: CyberTheme.textMuted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  adminDesc: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.35)',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  resetButtonPressed: {
    opacity: 0.7,
  },
  resetButtonText: {
    color: CyberTheme.rose,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
