import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { ShopItem, UserProfile } from '@/types/lifexp';
import { CyberTheme } from '@/constants/theme';

interface ShopViewProps {
  shop: ShopItem[];
  user: UserProfile;
  onBuyItem: (itemId: number) => { success: boolean; message: string };
}

const RARITY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  Common: { text: '#94A3B8', bg: 'rgba(148, 163, 184, 0.1)', border: 'rgba(148, 163, 184, 0.3)' },
  Rare: { text: '#38BDF8', bg: 'rgba(56, 189, 248, 0.1)', border: 'rgba(56, 189, 248, 0.3)' },
  Epic: { text: '#C084FC', bg: 'rgba(192, 132, 252, 0.15)', border: 'rgba(192, 132, 252, 0.4)' },
  Legendary: { text: '#FBBF24', bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.4)' },
};

const getItemIcon = (iconName: string, color: string) => {
  switch (iconName.toLowerCase()) {
    case 'flask':
      return <FontAwesome5 name="flask" size={16} color={color} />;
    case 'keyboard':
      return <MaterialCommunityIcons name="keyboard" size={18} color={color} />;
    case 'shield-alt':
    case 'shield':
      return <FontAwesome5 name="shield-alt" size={16} color={color} />;
    case 'heartbeat':
    case 'heart':
      return <FontAwesome5 name="heartbeat" size={16} color={color} />;
    case 'gem':
    case 'diamond':
      return <Ionicons name="diamond" size={16} color={color} />;
    default:
      return <FontAwesome5 name="cube" size={16} color={color} />;
  }
};

export const ShopView: React.FC<ShopViewProps> = ({ shop, user, onBuyItem }) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleBuy = (item: ShopItem) => {
    const result = onBuyItem(item.id);
    if (!result.success) {
      if (Platform.OS === 'web') {
        alert(result.message);
      } else {
        Alert.alert('Shop Matrix', result.message);
      }
    } else {
      setFeedback(result.message);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerGroup}>
        <View style={styles.titleRow}>
          <FontAwesome5 name="store" size={16} color={CyberTheme.amber} />
          <Text style={styles.sectionTitle}>LOOT & ARTIFACT SHOP</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Trade hard-earned Gold & Gems for powerful potions, gear and persistent buffs.
        </Text>
      </View>

      {/* Feedback Toast */}
      {feedback ? (
        <View style={styles.feedbackToast}>
          <Ionicons name="checkmark-circle" size={16} color={CyberTheme.emerald} />
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      ) : null}

      {/* Shop Grid */}
      <View style={styles.shopGrid}>
        {shop.map(item => {
          const rarity = RARITY_COLORS[item.rarity] || RARITY_COLORS.Common;
          const isPurchased = item.isPurchased === 1;
          const canAfford =
            item.currency === 'gold' ? user.gold >= item.price : user.gems >= item.price;

          return (
            <View
              key={item.id}
              style={[
                styles.itemCard,
                isPurchased && styles.itemCardPurchased,
                { borderColor: isPurchased ? CyberTheme.border : rarity.border },
              ]}
            >
              {/* Item Header */}
              <View style={styles.itemHeader}>
                <View style={[styles.iconCircle, { backgroundColor: rarity.bg }]}>
                  {getItemIcon(item.icon, rarity.text)}
                </View>

                <View style={styles.itemTitleGroup}>
                  <View style={styles.rarityRow}>
                    <View
                      style={[
                        styles.rarityBadge,
                        { backgroundColor: rarity.bg, borderColor: rarity.border },
                      ]}
                    >
                      <Text style={[styles.rarityText, { color: rarity.text }]}>
                        {item.rarity.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.itemType}>{item.type.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
              </View>

              {/* Description */}
              <Text style={styles.itemDesc}>{item.description}</Text>

              {/* Buff & Price / Buy Row */}
              <View style={styles.itemFooter}>
                <View style={styles.effectBadge}>
                  <Ionicons name="flash-outline" size={10} color={CyberTheme.cyan} />
                  <Text style={styles.effectText}>{item.effect}</Text>
                </View>

                {/* Price & Buy Button */}
                <Pressable
                  disabled={isPurchased}
                  onPress={() => handleBuy(item)}
                  style={({ pressed }) => [
                    styles.buyButton,
                    isPurchased
                      ? styles.buyButtonPurchased
                      : !canAfford
                      ? styles.buyButtonLocked
                      : pressed
                      ? styles.buyButtonPressed
                      : styles.buyButtonActive,
                  ]}
                >
                  {isPurchased ? (
                    <Text style={styles.buyTextPurchased}>EQUIPPED</Text>
                  ) : (
                    <View style={styles.priceRow}>
                      {item.currency === 'gold' ? (
                        <FontAwesome5 name="coins" size={11} color={canAfford ? '#000' : CyberTheme.amber} />
                      ) : (
                        <Ionicons name="diamond" size={11} color={canAfford ? '#000' : CyberTheme.purple} />
                      )}
                      <Text style={[styles.priceText, !canAfford && styles.priceTextLocked]}>
                        {item.price} {item.currency.toUpperCase()}
                      </Text>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 14,
  },
  headerGroup: {
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sectionSubtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
  },
  feedbackToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  feedbackText: {
    color: CyberTheme.emerald,
    fontSize: 11,
    fontWeight: '700',
  },
  shopGrid: {
    gap: 10,
  },
  itemCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  itemCardPurchased: {
    opacity: 0.6,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitleGroup: {
    flex: 1,
    gap: 2,
  },
  rarityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rarityBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
  },
  rarityText: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  itemType: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontWeight: '700',
  },
  itemName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  itemDesc: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 8,
  },
  effectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: CyberTheme.cyanGlow,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  effectText: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '700',
  },
  buyButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  buyButtonActive: {
    backgroundColor: CyberTheme.amber,
  },
  buyButtonPressed: {
    opacity: 0.8,
  },
  buyButtonLocked: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: CyberTheme.border,
  },
  buyButtonPurchased: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  buyTextPurchased: {
    color: CyberTheme.emerald,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
  },
  priceTextLocked: {
    color: CyberTheme.textMuted,
  },
});
