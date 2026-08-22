import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { CyberTheme } from '@/constants/theme';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onSuccess?: () => void;
}

const PRESET_AVATARS = [
  {
    name: 'Shadow Monarch',
    url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Cyber Sentinel',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Aether Mage',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Valkyrie Blade',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onSuccess,
}) => {
  const { login, signup, demoLogin } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  // Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0].url);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      if (mode === 'signin') {
        const res = await login(email, password);
        if (res.success) {
          onClose();
          onSuccess?.();
        } else {
          setError(res.error || 'Invalid credentials');
        }
      } else {
        if (!name.trim()) {
          setError('Please specify your Hunter Alias (Name)');
          setLoading(false);
          return;
        }
        const res = await signup(name, email, password, selectedAvatar);
        if (res.success) {
          onClose();
          onSuccess?.();
        } else {
          setError(res.error || 'Character creation failed');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await demoLogin();
      if (res.success) {
        onClose();
        onSuccess?.();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          {/* Top Decorative Line */}
          <View style={styles.topGlowLine} />

          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.brandGroup}>
              <View style={styles.logoBadge}>
                <Ionicons name="flash" size={16} color="#FFF" />
              </View>
              <View>
                <Text style={styles.brandTitle}>
                  LIFE<Text style={styles.brandHighlight}>XP</Text>
                </Text>
                <Text style={styles.brandSubtitle}>SYSTEM AUTHENTICATION</Text>
              </View>
            </View>

            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={CyberTheme.textSecondary} />
            </Pressable>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Mode Switcher */}
            <View style={styles.modeSwitcher}>
              <Pressable
                onPress={() => {
                  setMode('signin');
                  setError(null);
                }}
                style={[styles.modeTab, mode === 'signin' && styles.modeTabActive]}
              >
                <Text
                  style={[styles.modeTabText, mode === 'signin' && styles.modeTabTextActive]}
                >
                  SIGN IN
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setMode('signup');
                  setError(null);
                }}
                style={[styles.modeTab, mode === 'signup' && styles.modeTabActive]}
              >
                <Text
                  style={[styles.modeTabText, mode === 'signup' && styles.modeTabTextActive]}
                >
                  ASCEND (SIGN UP)
                </Text>
              </Pressable>
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle" size={14} color={CyberTheme.rose} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Signup: Avatar Selection */}
            {mode === 'signup' && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CHOOSE OPERATIVE AVATAR</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.avatarRow}
                >
                  {PRESET_AVATARS.map(avatar => {
                    const isSelected = selectedAvatar === avatar.url;
                    return (
                      <Pressable
                        key={avatar.name}
                        onPress={() => setSelectedAvatar(avatar.url)}
                        style={[
                          styles.avatarItem,
                          isSelected && styles.avatarItemSelected,
                        ]}
                      >
                        <Image source={{ uri: avatar.url }} style={styles.avatarThumb} />
                        <Text
                          style={[
                            styles.avatarLabel,
                            isSelected && styles.avatarLabelSelected,
                          ]}
                          numberOfLines={1}
                        >
                          {avatar.name}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {/* Signup: Alias */}
            {mode === 'signup' && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>HUNTER ALIAS *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Jin-Woo / Shadow Monarch"
                  placeholderTextColor={CyberTheme.textMuted}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>NEURAL ID (EMAIL) *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="operative@lifexp.system"
                placeholderTextColor={CyberTheme.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>SECURITY CIPHER (PASSWORD) *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="••••••••••••"
                placeholderTextColor={CyberTheme.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Main Submit Button */}
            <Pressable
              disabled={loading}
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
                loading && styles.submitButtonDisabled,
              ]}
            >
              <Ionicons
                name={mode === 'signin' ? 'log-in-outline' : 'shield-checkmark-outline'}
                size={16}
                color="#000"
              />
              <Text style={styles.submitButtonText}>
                {loading
                  ? 'SYNCHRONIZING...'
                  : mode === 'signin'
                  ? 'INITIALIZE SESSION'
                  : 'ASCEND CHARACTER'}
              </Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR QUICK DEMO</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Demo Hunter Quick Access Button */}
            <Pressable
              onPress={handleDemoAccess}
              style={({ pressed }) => [styles.demoButton, pressed && styles.demoButtonPressed]}
            >
              <FontAwesome5 name="user-astronaut" size={14} color={CyberTheme.cyan} />
              <Text style={styles.demoButtonText}>ONE-TAP ACCESS: DEMO HUNTER (LVL 4)</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 440,
    maxHeight: '90%',
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CyberTheme.borderHighlight,
    overflow: 'hidden',
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  topGlowLine: {
    height: 3,
    backgroundColor: CyberTheme.cyan,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: CyberTheme.border,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandHighlight: {
    color: CyberTheme.cyan,
  },
  brandSubtitle: {
    color: 'rgba(6, 182, 212, 0.7)',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  closeBtn: {
    padding: 4,
  },
  modalBody: {
    padding: 18,
  },
  modeSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#090D16',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 3,
    marginBottom: 16,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 7,
  },
  modeTabActive: {
    backgroundColor: CyberTheme.bgCardElevated,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.4)',
  },
  modeTabText: {
    color: CyberTheme.textMuted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  modeTabTextActive: {
    color: CyberTheme.cyan,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: CyberTheme.rose,
    fontSize: 11,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 14,
    gap: 6,
  },
  inputLabel: {
    color: CyberTheme.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
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
  avatarRow: {
    gap: 8,
    paddingVertical: 4,
  },
  avatarItem: {
    alignItems: 'center',
    gap: 4,
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    backgroundColor: '#090D16',
    width: 80,
  },
  avatarItemSelected: {
    borderColor: CyberTheme.cyan,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
  },
  avatarThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  avatarLabel: {
    color: CyberTheme.textMuted,
    fontSize: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
  avatarLabelSelected: {
    color: CyberTheme.cyan,
    fontWeight: '900',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: CyberTheme.cyan,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 6,
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonPressed: {
    opacity: 0.85,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: CyberTheme.border,
  },
  dividerText: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.35)',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  demoButtonPressed: {
    opacity: 0.75,
  },
  demoButtonText: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
});
