import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Quest, QuestRank } from '@/types/lifexp';
import { CyberTheme, RankColors } from '@/constants/theme';

interface ForgeQuestModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateQuest: (quest: Omit<Quest, 'id' | 'userId' | 'isCompleted' | 'completedAt'>) => void;
}

const RANK_PRESETS: Record<QuestRank, { xp: number; gold: number; statBonus: number }> = {
  S: { xp: 500, gold: 150, statBonus: 3 },
  A: { xp: 350, gold: 80, statBonus: 2 },
  B: { xp: 200, gold: 50, statBonus: 1 },
  C: { xp: 120, gold: 30, statBonus: 1 },
  D: { xp: 80, gold: 20, statBonus: 1 },
  E: { xp: 50, gold: 10, statBonus: 1 },
};

const CATEGORIES = ['Coding', 'Fitness', 'Study', 'Career', 'Mindset', 'Daily', 'Health'];
const STAT_TYPES: ('intellect' | 'strength' | 'vitality' | 'agility' | 'discipline')[] = [
  'intellect',
  'strength',
  'vitality',
  'agility',
  'discipline',
];

export const ForgeQuestModal: React.FC<ForgeQuestModalProps> = ({
  visible,
  onClose,
  onCreateQuest,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rank, setRank] = useState<QuestRank>('B');
  const [category, setCategory] = useState('Coding');
  const [statType, setStatType] = useState<'intellect' | 'strength' | 'vitality' | 'agility' | 'discipline'>('intellect');
  const [xpReward, setXpReward] = useState('200');
  const [goldReward, setGoldReward] = useState('50');
  const [dueDate, setDueDate] = useState('Today');

  const handleRankSelect = (selectedRank: QuestRank) => {
    setRank(selectedRank);
    const preset = RANK_PRESETS[selectedRank];
    setXpReward(preset.xp.toString());
    setGoldReward(preset.gold.toString());
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    const preset = RANK_PRESETS[rank];
    onCreateQuest({
      title: title.trim(),
      description: description.trim(),
      category,
      rank,
      xpReward: parseInt(xpReward, 10) || preset.xp,
      goldReward: parseInt(goldReward, 10) || preset.gold,
      statType,
      statReward: preset.statBonus,
      dueDate: dueDate.trim() || 'Today',
    });

    // Reset fields & close
    setTitle('');
    setDescription('');
    setRank('B');
    setCategory('Coding');
    setStatType('intellect');
    setXpReward('200');
    setGoldReward('50');
    setDueDate('Today');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerTitleGroup}>
              <MaterialCommunityIcons name="sword-cross" size={20} color={CyberTheme.cyan} />
              <Text style={styles.headerTitle}>FORGE NEW QUEST</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={CyberTheme.textSecondary} />
            </Pressable>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Quest Title *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Master Graph Algorithms"
                placeholderTextColor={CyberTheme.textMuted}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Key deliverables & acceptance criteria..."
                placeholderTextColor={CyberTheme.textMuted}
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {/* Rank Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Rank Tier</Text>
              <View style={styles.chipRow}>
                {(['S', 'A', 'B', 'C', 'D', 'E'] as QuestRank[]).map(r => {
                  const isSelected = rank === r;
                  const rankColor = RankColors[r];
                  return (
                    <Pressable
                      key={r}
                      onPress={() => handleRankSelect(r)}
                      style={[
                        styles.rankChip,
                        isSelected
                          ? { backgroundColor: rankColor.bg, borderColor: rankColor.border }
                          : styles.rankChipInactive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.rankChipText,
                          isSelected ? { color: rankColor.text, fontWeight: '900' } : styles.rankChipTextInactive,
                        ]}
                      >
                        Rank {r}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Category Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRowScroll}>
                {CATEGORIES.map(c => {
                  const isSelected = category === c;
                  return (
                    <Pressable
                      key={c}
                      onPress={() => setCategory(c)}
                      style={[
                        styles.categoryChip,
                        isSelected && styles.categoryChipSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryChipText,
                          isSelected && styles.categoryChipTextSelected,
                        ]}
                      >
                        {c}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Stat Reward Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Target Stat Boost</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRowScroll}>
                {STAT_TYPES.map(st => {
                  const isSelected = statType === st;
                  return (
                    <Pressable
                      key={st}
                      onPress={() => setStatType(st)}
                      style={[
                        styles.statChip,
                        isSelected && styles.statChipSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statChipText,
                          isSelected && styles.statChipTextSelected,
                        ]}
                      >
                        {st.toUpperCase()}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Rewards (XP & Gold) */}
            <View style={styles.dualInputsRow}>
              <View style={styles.dualInputCol}>
                <Text style={styles.inputLabel}>XP Reward</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={xpReward}
                  onChangeText={setXpReward}
                />
              </View>
              <View style={styles.dualInputCol}>
                <Text style={styles.inputLabel}>Gold Reward</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={goldReward}
                  onChangeText={setGoldReward}
                />
              </View>
            </View>

            {/* Due Date */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Deadline / Due Date</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Today, Tomorrow, Friday"
                placeholderTextColor={CyberTheme.textMuted}
                value={dueDate}
                onChangeText={setDueDate}
              />
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.modalFooter}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>CREATE QUEST</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: CyberTheme.borderHighlight,
    overflow: 'hidden',
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: CyberTheme.border,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: CyberTheme.cyan,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  closeBtn: {
    padding: 4,
  },
  modalBody: {
    padding: 18,
  },
  inputGroup: {
    marginBottom: 14,
    gap: 6,
  },
  inputLabel: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFF',
    fontSize: 13,
  },
  textArea: {
    minHeight: 64,
    textAlignVertical: 'top',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chipRowScroll: {
    gap: 6,
    paddingVertical: 2,
  },
  rankChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  rankChipInactive: {
    backgroundColor: '#090D16',
    borderColor: CyberTheme.border,
  },
  rankChipText: {
    fontSize: 11,
  },
  rankChipTextInactive: {
    color: CyberTheme.textMuted,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
  },
  categoryChipSelected: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderColor: CyberTheme.cyan,
  },
  categoryChipText: {
    color: CyberTheme.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  categoryChipTextSelected: {
    color: CyberTheme.cyan,
    fontWeight: '800',
  },
  statChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
  },
  statChipSelected: {
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    borderColor: CyberTheme.purple,
  },
  statChipText: {
    color: CyberTheme.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  statChipTextSelected: {
    color: CyberTheme.purple,
    fontWeight: '900',
  },
  dualInputsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  dualInputCol: {
    flex: 1,
    gap: 6,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: CyberTheme.border,
  },
  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#090D16',
  },
  cancelButtonText: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: CyberTheme.cyan,
  },
  submitButtonPressed: {
    opacity: 0.85,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
