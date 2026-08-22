import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { PhilosophySection } from './PhilosophySection';
import { PillarsSection } from './PillarsSection';
import { QuestEngineSection } from './QuestEngineSection';
import { LiveSpecimenSection } from './LiveSpecimenSection';
import { FieldReportsSection } from './FieldReportsSection';
import { ManifestoBanner } from './ManifestoBanner';
import { AccessTiersSection } from './AccessTiersSection';
import { LandingFooter } from './LandingFooter';
import { AuthModal } from '@/components/auth/AuthModal';
import { CyberTheme } from '@/constants/theme';

interface LandingPageProps {
  onLaunchConsole: () => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchConsole,
}) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const handleOpenAuth = (mode?: 'signin' | 'signup') => {
    setAuthModalMode(mode || 'signin');
    setAuthModalOpen(true);
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Navigation Bar */}
        <LandingNavbar
          onLaunchConsole={onLaunchConsole}
          onOpenAuth={handleOpenAuth}
        />

        {/* 1. Hero Section */}
        <HeroSection onLaunchConsole={onLaunchConsole} />

        {/* 2. Philosophy Section */}
        <PhilosophySection />

        {/* 3. Four Core Pillars */}
        <PillarsSection />

        {/* 4. Tactical Quest Engine */}
        <QuestEngineSection />

        {/* 5. Live Specimen Telemetry */}
        <LiveSpecimenSection onLaunchConsole={onLaunchConsole} />

        {/* 6. Field Reports & Case Studies */}
        <FieldReportsSection />

        {/* 7. Manifesto Banner */}
        <ManifestoBanner onLaunchConsole={onLaunchConsole} />

        {/* 8. Access Tiers */}
        <AccessTiersSection onLaunchConsole={onLaunchConsole} />

        {/* 9. Editorial Footer */}
        <LandingFooter
          onLaunchConsole={onLaunchConsole}
          onOpenAuth={handleOpenAuth}
        />
      </ScrollView>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccess={() => {
          setAuthModalOpen(false);
          onLaunchConsole();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: CyberTheme.bg,
  },
  scroll: {
    flex: 1,
  },
});
