import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { CyberTheme } from '@/constants/theme';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Hero image for login-02 panel
const LOGIN_HERO = require('@/assets/images/login_hero.jpg');

// Avatar options (signup-04 picker)
const AVATARS = [
  { id: 'ninja', label: 'Shadow Monarch', icon: 'user-ninja', lib: 'fa5' },
  { id: 'robot', label: 'Cyber Sentinel', icon: 'robot', lib: 'fa5' },
  { id: 'hat-wizard', label: 'Aether Mage', icon: 'hat-wizard', lib: 'fa5' },
  { id: 'shield-alt', label: 'Valkyrie Blade', icon: 'shield-alt', lib: 'fa5' },
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onSuccess,
}) => {
  const { login, signup, demoLogin } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  // Sign In fields
  const [siEmail, setSiEmail] = useState('');
  const [siPassword, setSiPassword] = useState('');
  const [siShowPw, setSiShowPw] = useState(false);
  const [siLoading, setSiLoading] = useState(false);
  const [siError, setSiError] = useState('');

  // Sign Up fields
  const [suName, setSuName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suConfirm, setSuConfirm] = useState('');
  const [suAvatar, setSuAvatar] = useState('ninja');
  const [suShowPw, setSuShowPw] = useState(false);
  const [suLoading, setSuLoading] = useState(false);
  const [suError, setSuError] = useState('');

  const switchMode = (m: 'signin' | 'signup') => {
    setMode(m);
    setSiError('');
    setSuError('');
  };

  // ── Sign In handler ──────────────────────────────────────────────────────
  const handleSignIn = async () => {
    setSiError('');
    if (!siEmail.trim() || !siPassword.trim()) {
      setSiError('Email and password are required.');
      return;
    }
    setSiLoading(true);
    try {
      await login(siEmail.trim(), siPassword);
      onSuccess?.();
    } catch {
      setSiError('Invalid credentials. Try the Demo Hunter access below.');
    } finally {
      setSiLoading(false);
    }
  };

  // ── Demo Login ───────────────────────────────────────────────────────────
  const handleDemo = async () => {
    setSiLoading(true);
    try {
      await demoLogin();
      onSuccess?.();
    } finally {
      setSiLoading(false);
    }
  };

  // ── Sign Up handler ──────────────────────────────────────────────────────
  const handleSignUp = async () => {
    setSuError('');
    if (!suName.trim() || !suEmail.trim() || !suPassword.trim()) {
      setSuError('All fields are required.');
      return;
    }
    if (suPassword !== suConfirm) {
      setSuError('Passwords do not match.');
      return;
    }
    if (suPassword.length < 6) {
      setSuError('Password must be at least 6 characters.');
      return;
    }
    setSuLoading(true);
    try {
      await signup(suName.trim(), suEmail.trim(), suPassword, suAvatar);
      onSuccess?.();
    } catch {
      setSuError('Registration failed. Please try again.');
    } finally {
      setSuLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.root}>
        <KeyboardAvoidingView
          style={styles.kav}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* ════════════════════════════════════════════════════════════════
              SIGN IN — login-02 layout
          ════════════════════════════════════════════════════════════════ */}
          {mode === 'signin' && (
            <View style={styles.fullScreen}>
              {/* ── Image Panel (login-02 left/top panel) ── */}
              <View style={styles.heroPanel}>
                <Image
                  source={LOGIN_HERO}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
                {/* Gradient overlay */}
                <View style={styles.heroOverlay} />
                {/* Brand over image */}
                <View style={styles.heroBrand}>
                  <View style={styles.heroBrandBadge}>
                    <Ionicons name="flash" size={13} color="#FFF" />
                  </View>
                  <Text style={styles.heroBrandText}>
                    LIFE<Text style={styles.heroBrandAccent}>XP</Text>
                  </Text>
                </View>
                {/* Flavour tagline */}
                <View style={styles.heroTaglineGroup}>
                  <Text style={styles.heroTagline}>ASCEND // BEGIN YOUR PROTOCOL</Text>
                  <Text style={styles.heroSubTagline}>Character initialization required</Text>
                </View>
              </View>

              {/* ── Form Panel (login-02 right/bottom form) ── */}
              <ScrollView
                style={styles.formPanel}
                contentContainerStyle={styles.formPanelContent}
                keyboardShouldPersistTaps="handled"
              >
                {/* Close button */}
                <Pressable onPress={onClose} style={({ pressed }) => [styles.closeTopRight, pressed && styles.btnPressed]}>
                  <Ionicons name="close" size={18} color={CyberTheme.textMuted} />
                </Pressable>

                <Text style={styles.formTitle}>AUTHENTICATE</Text>
                <Text style={styles.formSubtitle}>Sign in to your operative account</Text>

                {/* Email */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={14} color={CyberTheme.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="operative@lifexp.io"
                      placeholderTextColor={CyberTheme.textMuted}
                      value={siEmail}
                      onChangeText={setSiEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Password */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>PASSWORD</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={14} color={CyberTheme.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={[styles.input, styles.inputFlex]}
                      placeholder="••••••••"
                      placeholderTextColor={CyberTheme.textMuted}
                      value={siPassword}
                      onChangeText={setSiPassword}
                      secureTextEntry={!siShowPw}
                    />
                    <Pressable onPress={() => setSiShowPw(v => !v)} style={styles.eyeBtn}>
                      <Ionicons
                        name={siShowPw ? 'eye-off-outline' : 'eye-outline'}
                        size={15}
                        color={CyberTheme.textMuted}
                      />
                    </Pressable>
                  </View>
                </View>

                {/* Error */}
                {siError ? (
                  <View style={styles.errorBanner}>
                    <Ionicons name="alert-circle" size={13} color={CyberTheme.rose} />
                    <Text style={styles.errorText}>{siError}</Text>
                  </View>
                ) : null}

                {/* Sign In CTA */}
                <Pressable
                  onPress={handleSignIn}
                  disabled={siLoading}
                  style={({ pressed }) => [styles.ctaBtn, pressed && styles.btnPressed, siLoading && styles.ctaBtnDisabled]}
                >
                  {siLoading ? (
                    <Text style={styles.ctaBtnText}>AUTHENTICATING...</Text>
                  ) : (
                    <>
                      <Ionicons name="flash" size={14} color="#000" />
                      <Text style={styles.ctaBtnText}>AUTHENTICATE // SIGN IN</Text>
                    </>
                  )}
                </Pressable>

                {/* Divider */}
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Demo Access */}
                <Pressable
                  onPress={handleDemo}
                  disabled={siLoading}
                  style={({ pressed }) => [styles.demoBtn, pressed && styles.btnPressed]}
                >
                  <FontAwesome5 name="user-ninja" size={13} color={CyberTheme.cyan} />
                  <Text style={styles.demoBtnText}>1-TAP DEMO HUNTER ACCESS</Text>
                </Pressable>

                {/* Switch to Sign Up */}
                <View style={styles.switchRow}>
                  <Text style={styles.switchText}>New Hunter?</Text>
                  <Pressable onPress={() => switchMode('signup')} style={({ pressed }) => [pressed && styles.btnPressed]}>
                    <Text style={styles.switchLink}> Ascend Here →</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </View>
          )}

          {/* ════════════════════════════════════════════════════════════════
              SIGN UP — signup-04 layout
          ════════════════════════════════════════════════════════════════ */}
          {mode === 'signup' && (
            <ScrollView
              style={styles.signupScreen}
              contentContainerStyle={styles.signupContent}
              keyboardShouldPersistTaps="handled"
            >
              {/* Top bar */}
              <View style={styles.signupTopBar}>
                <Pressable
                  onPress={() => switchMode('signin')}
                  style={({ pressed }) => [styles.backBtn, pressed && styles.btnPressed]}
                >
                  <Ionicons name="arrow-back" size={16} color={CyberTheme.textMuted} />
                </Pressable>
                <View style={styles.signupBrandRow}>
                  <View style={styles.heroBrandBadge}>
                    <Ionicons name="flash" size={12} color="#FFF" />
                  </View>
                  <Text style={styles.heroBrandText}>
                    LIFE<Text style={styles.heroBrandAccent}>XP</Text>
                  </Text>
                </View>
                <Pressable onPress={onClose} style={({ pressed }) => [styles.closeSmall, pressed && styles.btnPressed]}>
                  <Ionicons name="close" size={17} color={CyberTheme.textMuted} />
                </Pressable>
              </View>

              {/* Headline */}
              <View style={styles.signupHeader}>
                <Text style={styles.signupTitle}>ASCEND</Text>
                <Text style={styles.signupSubtitle}>Create your operative character profile</Text>
              </View>

              {/* ── Avatar Picker ── */}
              <View style={styles.avatarPickerSection}>
                <Text style={styles.fieldLabel}>SELECT OPERATIVE CLASS</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.avatarPickerRow}
                >
                  {AVATARS.map(av => {
                    const isSelected = suAvatar === av.id;
                    return (
                      <Pressable
                        key={av.id}
                        onPress={() => setSuAvatar(av.id)}
                        style={({ pressed }) => [
                          styles.avatarCard,
                          isSelected && styles.avatarCardSelected,
                          pressed && styles.btnPressed,
                        ]}
                      >
                        <View style={[
                          styles.avatarIconBox,
                          isSelected && styles.avatarIconBoxSelected,
                        ]}>
                          <FontAwesome5 name={av.icon} size={18} color={isSelected ? CyberTheme.cyan : CyberTheme.textMuted} />
                        </View>
                        <Text style={[
                          styles.avatarLabel,
                          isSelected && styles.avatarLabelSelected,
                        ]} numberOfLines={1}>
                          {av.label}
                        </Text>
                        {isSelected && (
                          <View style={styles.avatarCheckmark}>
                            <Ionicons name="checkmark-circle" size={14} color={CyberTheme.cyan} />
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Fields */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>HUNTER ALIAS</Text>
                <View style={styles.inputWrapper}>
                  <FontAwesome5 name="user-ninja" size={13} color={CyberTheme.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Jin-Woo Sung"
                    placeholderTextColor={CyberTheme.textMuted}
                    value={suName}
                    onChangeText={setSuName}
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={14} color={CyberTheme.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="operative@lifexp.io"
                    placeholderTextColor={CyberTheme.textMuted}
                    value={suEmail}
                    onChangeText={setSuEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={14} color={CyberTheme.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.inputFlex]}
                    placeholder="Min 6 characters"
                    placeholderTextColor={CyberTheme.textMuted}
                    value={suPassword}
                    onChangeText={setSuPassword}
                    secureTextEntry={!suShowPw}
                  />
                  <Pressable onPress={() => setSuShowPw(v => !v)} style={styles.eyeBtn}>
                    <Ionicons name={suShowPw ? 'eye-off-outline' : 'eye-outline'} size={15} color={CyberTheme.textMuted} />
                  </Pressable>
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>CONFIRM PASSWORD</Text>
                <View style={[
                  styles.inputWrapper,
                  suConfirm.length > 0 && suConfirm !== suPassword && styles.inputWrapperError,
                ]}>
                  <Ionicons name="shield-checkmark-outline" size={14} color={CyberTheme.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Repeat password"
                    placeholderTextColor={CyberTheme.textMuted}
                    value={suConfirm}
                    onChangeText={setSuConfirm}
                    secureTextEntry={!suShowPw}
                  />
                </View>
              </View>

              {/* Error */}
              {suError ? (
                <View style={styles.errorBanner}>
                  <Ionicons name="alert-circle" size={13} color={CyberTheme.rose} />
                  <Text style={styles.errorText}>{suError}</Text>
                </View>
              ) : null}

              {/* Sign Up CTA */}
              <Pressable
                onPress={handleSignUp}
                disabled={suLoading}
                style={({ pressed }) => [styles.ctaBtn, pressed && styles.btnPressed, suLoading && styles.ctaBtnDisabled]}
              >
                {suLoading ? (
                  <Text style={styles.ctaBtnText}>FORGING CHARACTER...</Text>
                ) : (
                  <>
                    <MaterialCommunityIcons name="sword-cross" size={14} color="#000" />
                    <Text style={styles.ctaBtnText}>FORGE CHARACTER // ASCEND</Text>
                  </>
                )}
              </Pressable>

              {/* Switch to Sign In */}
              <View style={[styles.switchRow, { marginBottom: 32 }]}>
                <Text style={styles.switchText}>Already initialized?</Text>
                <Pressable onPress={() => switchMode('signin')} style={({ pressed }) => [pressed && styles.btnPressed]}>
                  <Text style={styles.switchLink}> Sign In →</Text>
                </Pressable>
              </View>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: CyberTheme.bg,
  },
  kav: {
    flex: 1,
  },

  // ── Sign In (login-02) ──────────────────────────────────────────
  fullScreen: {
    flex: 1,
    flexDirection: 'column',
  },
  heroPanel: {
    height: SCREEN_HEIGHT * 0.38,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 8, 18, 0.55)',
  },
  heroBrand: {
    position: 'absolute',
    top: 44,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  heroBrandBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBrandText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  heroBrandAccent: {
    color: CyberTheme.cyan,
  },
  heroTaglineGroup: {
    position: 'absolute',
    bottom: 18,
    left: 20,
    right: 20,
  },
  heroTagline: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroSubTagline: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    marginTop: 3,
  },
  formPanel: {
    flex: 1,
    backgroundColor: CyberTheme.bg,
  },
  formPanelContent: {
    padding: 22,
    gap: 14,
    paddingBottom: 40,
  },
  closeTopRight: {
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: CyberTheme.bgCard,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  formTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
  formSubtitle: {
    color: CyberTheme.textMuted,
    fontSize: 11,
    marginTop: -8,
  },

  // ── Sign Up (signup-04) ─────────────────────────────────────────
  signupScreen: {
    flex: 1,
    backgroundColor: CyberTheme.bg,
  },
  signupContent: {
    padding: 20,
    gap: 14,
    paddingBottom: 40,
  },
  signupTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 36,
    marginBottom: 4,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: CyberTheme.bgCard,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  signupBrandRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  closeSmall: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: CyberTheme.bgCard,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupHeader: {
    gap: 4,
  },
  signupTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
  signupSubtitle: {
    color: CyberTheme.textMuted,
    fontSize: 11,
  },

  // ── Avatar Picker ───────────────────────────────────────────────
  avatarPickerSection: {
    gap: 8,
  },
  avatarPickerRow: {
    gap: 10,
    paddingVertical: 4,
  },
  avatarCard: {
    width: 88,
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: CyberTheme.border,
    backgroundColor: CyberTheme.bgCard,
    gap: 6,
    position: 'relative',
  },
  avatarCardSelected: {
    borderColor: CyberTheme.cyan,
    backgroundColor: 'rgba(6, 182, 212, 0.08)',
  },
  avatarIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#090D16',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: CyberTheme.border,
  },
  avatarIconBoxSelected: {
    borderColor: CyberTheme.cyan,
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
  },
  avatarLabel: {
    color: CyberTheme.textMuted,
    fontSize: 8,
    fontWeight: '800',
    textAlign: 'center',
  },
  avatarLabelSelected: {
    color: CyberTheme.cyan,
  },
  avatarCheckmark: {
    position: 'absolute',
    top: 6,
    right: 6,
  },

  // ── Shared Field Styles ─────────────────────────────────────────
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CyberTheme.bgCard,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  inputWrapperError: {
    borderColor: CyberTheme.rose,
  },
  inputIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    padding: 0,
    margin: 0,
  },
  inputFlex: {
    flex: 1,
  },
  eyeBtn: {
    padding: 2,
  },

  // ── Error Banner ────────────────────────────────────────────────
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
  },
  errorText: {
    color: CyberTheme.rose,
    fontSize: 11,
    flex: 1,
  },

  // ── CTA Button ──────────────────────────────────────────────────
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: CyberTheme.cyan,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 4,
  },
  ctaBtnDisabled: {
    opacity: 0.6,
  },
  ctaBtnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  // ── Divider ─────────────────────────────────────────────────────
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: CyberTheme.border,
  },
  dividerText: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  // ── Demo Button ─────────────────────────────────────────────────
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: CyberTheme.borderHighlight,
    paddingVertical: 13,
    borderRadius: 12,
  },
  demoBtnText: {
    color: CyberTheme.cyan,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  // ── Switch Row ──────────────────────────────────────────────────
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    color: CyberTheme.textMuted,
    fontSize: 12,
  },
  switchLink: {
    color: CyberTheme.cyan,
    fontSize: 12,
    fontWeight: '800',
  },
  btnPressed: {
    opacity: 0.7,
  },
});
