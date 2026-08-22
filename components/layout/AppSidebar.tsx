import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppLayout } from './AppLayout';
import { useAuth } from '@/context/AuthContext';
import { useLifeXP } from '@/context/LifeXPContext';
import { CyberTheme } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 300);

type NavSection = {
  title: string;
  items: NavItem[];
};

type NavItem = {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  color: string;
};

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'COMBAT SYSTEM',
    items: [
      {
        id: 'quests',
        label: 'Quest Board',
        sublabel: 'Daily S–E rank objectives',
        icon: <MaterialCommunityIcons name="sword-cross" size={17} color={CyberTheme.cyan} />,
        color: CyberTheme.cyan,
      },
      {
        id: 'habits',
        label: 'Habit Forge',
        sublabel: 'Daily routines & streaks',
        icon: <MaterialCommunityIcons name="fire" size={17} color={CyberTheme.amber} />,
        color: CyberTheme.amber,
      },
    ],
  },
  {
    title: 'CHARACTER',
    items: [
      {
        id: 'stats',
        label: 'Attribute Matrix',
        sublabel: 'STR / INT / VIT / AGI / DIS',
        icon: <Ionicons name="trending-up" size={17} color={CyberTheme.purple} />,
        color: CyberTheme.purple,
      },
      {
        id: 'shop',
        label: 'Loot Shop',
        sublabel: 'Spend Gold & Crystals',
        icon: <FontAwesome5 name="shopping-bag" size={15} color={CyberTheme.emerald} />,
        color: CyberTheme.emerald,
      },
    ],
  },
  {
    title: 'RECORDS',
    items: [
      {
        id: 'activity',
        label: 'Activity Ledger',
        sublabel: 'XP & reward history',
        icon: <MaterialCommunityIcons name="pulse" size={17} color={CyberTheme.rose} />,
        color: CyberTheme.rose,
      },
    ],
  },
];

interface AppSidebarProps {
  activeModule: string;
  onSelectModule: (id: string) => void;
  onSignOut?: () => void;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeModule,
  onSelectModule,
  onSignOut,
  onOpenAuth,
}) => {
  const { sidebarOpen, closeSidebar } = useAppLayout();
  const { user: authUser, isAuthenticated, logout } = useAuth();
  const { user: lifexpUser } = useLifeXP();

  const activeUser = authUser || lifexpUser;

  const handleSelect = (id: string) => {
    onSelectModule(id);
    closeSidebar();
  };

  const handleSignOut = () => {
    logout();
    closeSidebar();
    onSignOut?.();
  };

  if (!sidebarOpen) return null;

  return (
    <Modal
      visible={sidebarOpen}
      transparent
      animationType="none"
      onRequestClose={closeSidebar}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={closeSidebar}>
        <View style={styles.backdropOverlay} />
      </Pressable>

      {/* Sidebar Panel */}
      <View style={styles.sidebar} pointerEvents="box-none">
        <View style={styles.sidebarPanel}>
          {/* ─── Header / Brand ─── */}
          <View style={styles.sidebarHeader}>
            <View style={styles.brandRow}>
              <View style={styles.brandBadge}>
                <Ionicons name="flash" size={14} color="#FFF" />
              </View>
              <Text style={styles.brandText}>
                LIFE<Text style={styles.brandAccent}>XP</Text>
              </Text>
            </View>
            <Pressable onPress={closeSidebar} style={({ pressed }) => [styles.closeBtn, pressed && styles.btnPressed]}>
              <Ionicons name="close" size={18} color={CyberTheme.textMuted} />
            </Pressable>
          </View>

          {/* ─── User Profile Card ─── */}
          <View style={styles.profileCard}>
            <View style={styles.avatarCircle}>
              <FontAwesome5 name="user-ninja" size={18} color={CyberTheme.cyan} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>
                {activeUser?.name ?? 'Shadow Monarch'}
              </Text>
              <Text style={styles.profileSub}>
                Lvl {activeUser?.level ?? 1} · {activeUser?.title ?? 'Hunter'}
              </Text>
            </View>
            <View style={styles.levelPill}>
              <Text style={styles.levelPillText}>LVL {activeUser?.level ?? 1}</Text>
            </View>
          </View>

          {/* ─── Navigation Sections ─── */}
          <ScrollView
            style={styles.navScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.navContent}
          >
            {NAV_SECTIONS.map(section => (
              <View key={section.title} style={styles.navSection}>
                <Text style={styles.sectionLabel}>{section.title}</Text>
                {section.items.map(item => {
                  const isActive = activeModule === item.id;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => handleSelect(item.id)}
                      style={({ pressed }) => [
                        styles.navItem,
                        isActive && styles.navItemActive,
                        pressed && styles.btnPressed,
                      ]}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <View style={[styles.activeBar, { backgroundColor: item.color }]} />
                      )}

                      <View style={[
                        styles.navIconBox,
                        isActive && { backgroundColor: `${item.color}20`, borderColor: `${item.color}50` },
                      ]}>
                        {item.icon}
                      </View>

                      <View style={styles.navTextGroup}>
                        <Text style={[
                          styles.navItemLabel,
                          isActive && { color: item.color },
                        ]}>
                          {item.label}
                        </Text>
                        {item.sublabel && (
                          <Text style={styles.navItemSub}>{item.sublabel}</Text>
                        )}
                      </View>

                      {isActive && (
                        <Ionicons name="chevron-forward" size={13} color={item.color} style={styles.navChevron} />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </ScrollView>

          {/* ─── Footer ─── */}
          <View style={styles.sidebarFooter}>
            <View style={styles.footerDivider} />
            {isAuthenticated ? (
              <Pressable
                onPress={handleSignOut}
                style={({ pressed }) => [styles.footerAction, pressed && styles.btnPressed]}
              >
                <Ionicons name="log-out-outline" size={16} color={CyberTheme.rose} />
                <Text style={styles.footerActionTextRose}>SIGN OUT</Text>
              </Pressable>
            ) : (
              <View style={styles.footerAuthRow}>
                <Pressable
                  onPress={() => { onOpenAuth?.('signin'); closeSidebar(); }}
                  style={({ pressed }) => [styles.footerAuthBtn, pressed && styles.btnPressed]}
                >
                  <Ionicons name="log-in-outline" size={15} color={CyberTheme.cyan} />
                  <Text style={styles.footerAuthBtnText}>SIGN IN</Text>
                </Pressable>
                <Pressable
                  onPress={() => { onOpenAuth?.('signup'); closeSidebar(); }}
                  style={({ pressed }) => [styles.footerAuthBtnAscend, pressed && styles.btnPressed]}
                >
                  <Text style={styles.footerAuthBtnAscendText}>ASCEND</Text>
                </Pressable>
              </View>
            )}
            <Text style={styles.footerVersion}>LIFEXP // V1.0.0 PROTOCOL ACTIVE</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  sidebar: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    pointerEvents: 'box-none',
  },
  sidebarPanel: {
    width: SIDEBAR_WIDTH,
    height: '100%',
    backgroundColor: '#070A10',
    borderRightWidth: 1,
    borderRightColor: CyberTheme.borderHighlight,
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 6, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    flexDirection: 'column',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: CyberTheme.border,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  brandAccent: {
    color: CyberTheme.cyan,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: CyberTheme.bgCard,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 10,
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CyberTheme.border,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: '#090D16',
    borderWidth: 1.5,
    borderColor: CyberTheme.cyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
  },
  profileSub: {
    color: CyberTheme.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  levelPill: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  levelPillText: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '900',
  },
  navScroll: {
    flex: 1,
  },
  navContent: {
    paddingBottom: 12,
    gap: 4,
  },
  navSection: {
    paddingTop: 14,
    paddingHorizontal: 12,
    gap: 2,
  },
  sectionLabel: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    paddingHorizontal: 4,
    paddingBottom: 6,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  navItemActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    width: 3,
    borderRadius: 3,
  },
  navIconBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: CyberTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTextGroup: {
    flex: 1,
    gap: 1,
  },
  navItemLabel: {
    color: CyberTheme.textSecondary,
    fontSize: 13,
    fontWeight: '800',
  },
  navItemSub: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontWeight: '600',
  },
  navChevron: {
    marginLeft: 'auto',
  },
  sidebarFooter: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 10,
  },
  footerDivider: {
    height: 1,
    backgroundColor: CyberTheme.border,
    marginBottom: 4,
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(244, 63, 94, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.2)',
  },
  footerActionTextRose: {
    color: CyberTheme.rose,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  footerAuthRow: {
    flexDirection: 'row',
    gap: 8,
  },
  footerAuthBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    backgroundColor: '#090D16',
  },
  footerAuthBtnText: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  footerAuthBtnAscend: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: CyberTheme.cyan,
  },
  footerAuthBtnAscendText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  footerVersion: {
    color: 'rgba(6, 182, 212, 0.5)',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },
  btnPressed: {
    opacity: 0.7,
  },
});
