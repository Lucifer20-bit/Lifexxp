import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/components/ui/questionnaire';
import { CyberTheme } from '@/constants/theme';

const items = [
  {
    name: 'direction',
    required: true,
    prompt: 'What should we prototype next?',
    description: 'Choose a direction or write your own.',
    choices: [
      {
        value: 'delegation',
        label: 'Delegation',
        description: 'Show how work moves to a specialist.',
      },
      {
        value: 'questions',
        label: 'Question prompts',
        description: 'Show choices while the interface waits.',
      },
      { value: 'both', label: 'Both together' },
    ],
    input: { label: 'Another answer', placeholder: 'Type another answer…' },
  },
  {
    name: 'detail',
    required: false,
    prompt: 'How much detail should it include?',
    description: 'Skip this if you are not sure yet.',
    choices: [
      { value: 'focused', label: 'Focused', description: 'Quick single-screen prototype' },
      { value: 'complete', label: 'Complete flow', description: 'End-to-end interactive journey' },
    ],
  },
] as const;

export function QuestionnaireDemo() {
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, any> | null>(null);

  const handleSubmit = (answers: Record<string, any>) => {
    setSubmittedAnswers(answers);
    const msg = `Responses received:\n${JSON.stringify(answers, null, 2)}`;
    if (Platform.OS === 'web') {
      alert(msg);
    } else {
      Alert.alert('Questionnaire Submitted', msg);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Questionnaire items={items} onSubmit={handleSubmit}>
        <QuestionnaireProgress />
        {items.map(question => (
          <QuestionnaireItem
            key={question.name}
            name={question.name}
            required={question.required}
          >
            <QuestionnaireTitle>{question.prompt}</QuestionnaireTitle>
            <QuestionnaireDescription>{question.description}</QuestionnaireDescription>
            <QuestionnaireChoices>
              {question.choices.map(choice => (
                <QuestionnaireChoice key={choice.value} value={choice.value}>
                  <Text style={styles.choiceLabel}>{choice.label}</Text>
                  {'description' in choice && choice.description ? (
                    <Text style={styles.choiceDescription}>{choice.description}</Text>
                  ) : null}
                </QuestionnaireChoice>
              ))}
              {'input' in question ? (
                <QuestionnaireInput
                  label={question.input.label}
                  placeholder={question.input.placeholder}
                />
              ) : null}
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
        ))}
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext />
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </Questionnaire>

      {submittedAnswers && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>SUBMISSION RECORDED</Text>
          <Text style={styles.summaryCode}>{JSON.stringify(submittedAnswers, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  choiceLabel: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  choiceDescription: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  summaryCard: {
    backgroundColor: '#090D16',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    padding: 12,
    gap: 4,
  },
  summaryTitle: {
    color: CyberTheme.emerald,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  summaryCode: {
    color: CyberTheme.textSecondary,
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
