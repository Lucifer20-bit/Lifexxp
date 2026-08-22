import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

export interface QuestionnaireItemDefinition {
  name: string;
  required?: boolean;
  multiple?: boolean;
  prompt?: string;
  description?: string;
  choices?: {
    value: string;
    label: string;
    description?: string;
  }[];
  input?: {
    label?: string;
    placeholder?: string;
  };
}

interface QuestionnaireContextValue {
  items: readonly (QuestionnaireItemDefinition | { name: string; required?: boolean })[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  answers: Record<string, any>;
  setAnswer: (name: string, value: any) => void;
  toggleMultipleAnswer: (name: string, value: string) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  next: () => boolean;
  previous: () => void;
  skip: () => void;
  submit: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentItem?: QuestionnaireItemDefinition | { name: string; required?: boolean };
}

const QuestionnaireContext = createContext<QuestionnaireContextValue | null>(null);

function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('Questionnaire compound components must be rendered inside <Questionnaire>.');
  }
  return context;
}

interface QuestionnaireItemContextValue {
  name: string;
  required?: boolean;
  multiple?: boolean;
  isActive: boolean;
}

const QuestionnaireItemContext = createContext<QuestionnaireItemContextValue | null>(null);

function useQuestionnaireItem() {
  const context = useContext(QuestionnaireItemContext);
  if (!context) {
    throw new Error('Questionnaire item children must be rendered inside <QuestionnaireItem>.');
  }
  return context;
}

// -------------------------------------------------------------
// 1. Root Questionnaire
// -------------------------------------------------------------
export interface QuestionnaireProps {
  items: readonly (QuestionnaireItemDefinition | { name: string; required?: boolean })[];
  defaultAnswers?: Record<string, any>;
  onSubmit?: (answers: Record<string, any>) => void;
  onStepChange?: (index: number, name: string) => void;
  children: ReactNode;
  style?: ViewStyle;
}

export function Questionnaire({
  items,
  defaultAnswers = {},
  onSubmit,
  onStepChange,
  children,
  style,
}: QuestionnaireProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>(defaultAnswers);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentItem = items[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === items.length - 1;

  const setAnswer = useCallback((name: string, value: any) => {
    setAnswers(prev => ({ ...prev, [name]: value }));
    setErrors(prev => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  const toggleMultipleAnswer = useCallback((name: string, value: string) => {
    setAnswers(prev => {
      const currentList: string[] = Array.isArray(prev[name]) ? prev[name] : [];
      const updated = currentList.includes(value)
        ? currentList.filter(v => v !== value)
        : [...currentList, value];
      return { ...prev, [name]: updated };
    });
    setErrors(prev => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  const validateCurrent = useCallback((): boolean => {
    if (!currentItem) return true;
    if (currentItem.required) {
      const answer = answers[currentItem.name];
      const isEmpty =
        answer === undefined ||
        answer === null ||
        answer === '' ||
        (Array.isArray(answer) && answer.length === 0);
      if (isEmpty) {
        setErrors(prev => ({
          ...prev,
          [currentItem.name]: 'This question is required.',
        }));
        return false;
      }
    }
    return true;
  }, [currentItem, answers]);

  const next = useCallback(() => {
    if (!validateCurrent()) return false;
    if (activeIndex < items.length - 1) {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      onStepChange?.(nextIndex, items[nextIndex].name);
      return true;
    }
    return false;
  }, [activeIndex, items, validateCurrent, onStepChange]);

  const previous = useCallback(() => {
    if (activeIndex > 0) {
      const prevIndex = activeIndex - 1;
      setActiveIndex(prevIndex);
      onStepChange?.(prevIndex, items[prevIndex].name);
    }
  }, [activeIndex, items, onStepChange]);

  const skip = useCallback(() => {
    if (activeIndex < items.length - 1) {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      onStepChange?.(nextIndex, items[nextIndex].name);
    }
  }, [activeIndex, items, onStepChange]);

  const submit = useCallback(() => {
    if (!validateCurrent()) return;
    onSubmit?.(answers);
  }, [validateCurrent, onSubmit, answers]);

  const contextValue = useMemo<QuestionnaireContextValue>(
    () => ({
      items,
      activeIndex,
      setActiveIndex,
      answers,
      setAnswer,
      toggleMultipleAnswer,
      errors,
      setErrors,
      next,
      previous,
      skip,
      submit,
      isFirst,
      isLast,
      currentItem,
    }),
    [
      items,
      activeIndex,
      answers,
      setAnswer,
      toggleMultipleAnswer,
      errors,
      next,
      previous,
      skip,
      submit,
      isFirst,
      isLast,
      currentItem,
    ]
  );

  return (
    <QuestionnaireContext.Provider value={contextValue}>
      <View style={[styles.root, style]}>{children}</View>
    </QuestionnaireContext.Provider>
  );
}

// -------------------------------------------------------------
// 2. Progress Indicator
// -------------------------------------------------------------
export interface QuestionnaireProgressProps {
  style?: ViewStyle;
}

export function QuestionnaireProgress({ style }: QuestionnaireProgressProps) {
  const { items, activeIndex } = useQuestionnaire();
  const total = items.length;
  const current = activeIndex + 1;
  const progressPercent = total > 0 ? (current / total) * 100 : 0;

  return (
    <View style={[styles.progressContainer, style]}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressStepText}>
          Step <Text style={styles.progressStepCurrent}>{current}</Text> of {total}
        </Text>
        <Text style={styles.progressPercentText}>{Math.round(progressPercent)}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>
    </View>
  );
}

// -------------------------------------------------------------
// 3. Question Item Container
// -------------------------------------------------------------
export interface QuestionnaireItemProps {
  name: string;
  required?: boolean;
  multiple?: boolean;
  children: ReactNode;
  style?: ViewStyle;
}

export function QuestionnaireItem({
  name,
  required = false,
  multiple = false,
  children,
  style,
}: QuestionnaireItemProps) {
  const { currentItem } = useQuestionnaire();
  const isActive = currentItem?.name === name;

  if (!isActive) return null;

  return (
    <QuestionnaireItemContext.Provider value={{ name, required, multiple, isActive }}>
      <View style={[styles.itemContainer, style]}>{children}</View>
    </QuestionnaireItemContext.Provider>
  );
}

// -------------------------------------------------------------
// 4. Title & Description
// -------------------------------------------------------------
export interface QuestionnaireTitleProps {
  children: ReactNode;
  style?: TextStyle;
}

export function QuestionnaireTitle({ children, style }: QuestionnaireTitleProps) {
  const { required } = useQuestionnaireItem();
  return (
    <View style={styles.titleWrapper}>
      <Text style={[styles.title, style]}>
        {children}
        {required ? <Text style={styles.requiredAsterisk}> *</Text> : null}
      </Text>
    </View>
  );
}

export interface QuestionnaireDescriptionProps {
  children: ReactNode;
  style?: TextStyle;
}

export function QuestionnaireDescription({ children, style }: QuestionnaireDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

// -------------------------------------------------------------
// 5. Choices Container & Choice Item
// -------------------------------------------------------------
export interface QuestionnaireChoicesProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function QuestionnaireChoices({ children, style }: QuestionnaireChoicesProps) {
  return <View style={[styles.choicesContainer, style]}>{children}</View>;
}

export interface QuestionnaireChoiceProps {
  value: string;
  children: ReactNode;
  style?: ViewStyle;
}

export function QuestionnaireChoice({ value, children, style }: QuestionnaireChoiceProps) {
  const { name, multiple } = useQuestionnaireItem();
  const { answers, setAnswer, toggleMultipleAnswer } = useQuestionnaire();

  const isSelected = useMemo(() => {
    const currentAnswer = answers[name];
    if (multiple) {
      return Array.isArray(currentAnswer) && currentAnswer.includes(value);
    }
    return currentAnswer === value;
  }, [answers, name, multiple, value]);

  const handlePress = () => {
    if (multiple) {
      toggleMultipleAnswer(name, value);
    } else {
      setAnswer(name, value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole={multiple ? 'checkbox' : 'radio'}
      accessibilityState={{ checked: isSelected }}
      style={({ pressed }) => [
        styles.choiceCard,
        isSelected ? styles.choiceCardSelected : styles.choiceCardUnselected,
        pressed && styles.choiceCardPressed,
        style,
      ]}
    >
      <View style={styles.choiceIndicator}>
        {multiple ? (
          <Ionicons
            name={isSelected ? 'checkbox' : 'square-outline'}
            size={18}
            color={isSelected ? CyberTheme.cyan : CyberTheme.textMuted}
          />
        ) : (
          <Ionicons
            name={isSelected ? 'radio-button-on' : 'radio-button-off'}
            size={18}
            color={isSelected ? CyberTheme.cyan : CyberTheme.textMuted}
          />
        )}
      </View>
      <View style={styles.choiceBody}>{children}</View>
    </Pressable>
  );
}

// -------------------------------------------------------------
// 6. Freeform Input
// -------------------------------------------------------------
export interface QuestionnaireInputProps {
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export function QuestionnaireInput({
  placeholder = 'Type your answer…',
  label,
  style,
  inputStyle,
}: QuestionnaireInputProps) {
  const { name } = useQuestionnaireItem();
  const { answers, setAnswer } = useQuestionnaire();
  const value = typeof answers[name] === 'string' ? answers[name] : '';

  return (
    <View style={[styles.inputContainer, style]}>
      {label ? <Text style={styles.inputLabel}>{label}</Text> : null}
      <TextInput
        style={[styles.textInput, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={CyberTheme.textMuted}
        value={value}
        onChangeText={text => setAnswer(name, text)}
      />
    </View>
  );
}

// -------------------------------------------------------------
// 7. Error Display
// -------------------------------------------------------------
export interface QuestionnaireErrorProps {
  style?: TextStyle;
}

export function QuestionnaireError({ style }: QuestionnaireErrorProps) {
  const { name } = useQuestionnaireItem();
  const { errors } = useQuestionnaire();
  const errorMsg = errors[name];

  if (!errorMsg) return null;

  return (
    <View style={styles.errorRow}>
      <Ionicons name="alert-circle" size={14} color={CyberTheme.rose} />
      <Text style={[styles.errorText, style]}>{errorMsg}</Text>
    </View>
  );
}

// -------------------------------------------------------------
// 8. Actions Container & Buttons
// -------------------------------------------------------------
export interface QuestionnaireActionsProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function QuestionnaireActions({ children, style }: QuestionnaireActionsProps) {
  return <View style={[styles.actionsContainer, style]}>{children}</View>;
}

export interface QuestionnaireButtonProps {
  label?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function QuestionnairePrevious({
  label = 'Previous',
  style,
  textStyle,
}: QuestionnaireButtonProps) {
  const { previous, isFirst } = useQuestionnaire();
  if (isFirst) return null;

  return (
    <Pressable
      onPress={previous}
      style={({ pressed }) => [styles.btnSecondary, pressed && styles.btnPressed, style]}
    >
      <Ionicons name="chevron-back" size={14} color={CyberTheme.textSecondary} />
      <Text style={[styles.btnSecondaryText, textStyle]}>{label}</Text>
    </Pressable>
  );
}

export function QuestionnaireSkip({
  label = 'Skip',
  style,
  textStyle,
}: QuestionnaireButtonProps) {
  const { skip, isLast, currentItem } = useQuestionnaire();
  if (isLast || currentItem?.required) return null;

  return (
    <Pressable
      onPress={skip}
      style={({ pressed }) => [styles.btnGhost, pressed && styles.btnPressed, style]}
    >
      <Text style={[styles.btnGhostText, textStyle]}>{label}</Text>
    </Pressable>
  );
}

export function QuestionnaireNext({
  label = 'Next',
  style,
  textStyle,
}: QuestionnaireButtonProps) {
  const { next, isLast } = useQuestionnaire();
  if (isLast) return null;

  return (
    <Pressable
      onPress={next}
      style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed, style]}
    >
      <Text style={[styles.btnPrimaryText, textStyle]}>{label}</Text>
      <Ionicons name="chevron-forward" size={14} color="#000" />
    </Pressable>
  );
}

export function QuestionnaireSubmit({
  label = 'Submit',
  style,
  textStyle,
}: QuestionnaireButtonProps) {
  const { submit, isLast } = useQuestionnaire();
  if (!isLast) return null;

  return (
    <Pressable
      onPress={submit}
      style={({ pressed }) => [styles.btnSubmit, pressed && styles.btnPressed, style]}
    >
      <Ionicons name="checkmark-done" size={14} color="#000" />
      <Text style={[styles.btnPrimaryText, textStyle]}>{label}</Text>
    </Pressable>
  );
}

// -------------------------------------------------------------
// Styles
// -------------------------------------------------------------
const styles = StyleSheet.create({
  root: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 16,
    gap: 16,
  },
  progressContainer: {
    gap: 6,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressStepText: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  progressStepCurrent: {
    color: CyberTheme.cyan,
    fontWeight: '900',
  },
  progressPercentText: {
    color: CyberTheme.cyan,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#090D16',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: CyberTheme.cyan,
    borderRadius: 3,
  },
  itemContainer: {
    gap: 12,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
    lineHeight: 22,
  },
  requiredAsterisk: {
    color: CyberTheme.rose,
  },
  description: {
    color: CyberTheme.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  choicesContainer: {
    gap: 8,
    marginTop: 4,
  },
  choiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
  },
  choiceCardUnselected: {
    backgroundColor: '#090D16',
    borderColor: CyberTheme.border,
  },
  choiceCardSelected: {
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    borderColor: CyberTheme.cyan,
  },
  choiceCardPressed: {
    opacity: 0.85,
  },
  choiceIndicator: {
    paddingTop: 1,
  },
  choiceBody: {
    flex: 1,
    gap: 2,
  },
  inputContainer: {
    marginTop: 4,
    gap: 4,
  },
  inputLabel: {
    color: CyberTheme.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFF',
    fontSize: 13,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  errorText: {
    color: CyberTheme.rose,
    fontSize: 11,
    fontWeight: '700',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: CyberTheme.border,
    gap: 8,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: CyberTheme.cyan,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  btnSubmit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: CyberTheme.emerald,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  btnPrimaryText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnSecondaryText: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  btnGhost: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  btnGhostText: {
    color: CyberTheme.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  btnPressed: {
    opacity: 0.75,
  },
});
