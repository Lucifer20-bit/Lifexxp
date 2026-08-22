import { Link } from 'expo-router';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="sparkles" size={28} color={CyberTheme.cyan} />
      </View>
      <Text style={styles.title}>LIFEXP HUNTER SYSTEM</Text>
      <Text style={styles.subtitle}>
        Solo Hunter operating system actively monitoring your quest achievements, vital health, mana reserves, and streak multipliers.
      </Text>

      <Link href="/" dismissTo asChild>
        <Pressable style={styles.returnButton}>
          <Text style={styles.returnButtonText}>RETURN TO HUD COMMAND</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: CyberTheme.bg,
    gap: 12,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderWidth: 1,
    borderColor: CyberTheme.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  subtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 320,
  },
  returnButton: {
    marginTop: 16,
    backgroundColor: CyberTheme.cyan,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  returnButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
});
