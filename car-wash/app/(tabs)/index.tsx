import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function HomeScreen() {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'Description' | 'Service' | 'Location' | 'Reviews'>('Service');
  // Local image bundled to always render offline
  const colorScheme = useColorScheme();

  const tabs = useMemo(() => ['Description', 'Service', 'Location', 'Reviews'] as const, []);

  return (
    <SafeAreaView style={[styles.safeArea, colorScheme === 'dark' && styles.safeAreaDark]} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/adrian-dascal-Ce_gQ7Z0eAc-unsplash.jpg')}
            style={styles.headerImage}
            contentFit="cover"
            cachePolicy="disk"
            transition={200}
          />
          <View style={styles.topButtonsRow}>
            <Pressable
              onPress={() => (router.canGoBack() ? router.back() : null)}
              style={({ pressed }) => [styles.roundIconButton, pressed && styles.pressed]}
              android_ripple={{ color: 'rgba(0,0,0,0.1)', borderless: true }}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <MaterialIcons name="arrow-back" size={22} color="#111827" />
            </Pressable>
            <Pressable
              onPress={() => setIsFavorite((v) => !v)}
              style={({ pressed }) => [styles.roundIconButton, pressed && styles.pressed]}
              android_ripple={{ color: 'rgba(0,0,0,0.1)', borderless: true }}
              accessibilityRole="button"
              accessibilityLabel="Toggle favorite"
            >
              <MaterialIcons name="favorite" size={22} color={isFavorite ? '#ef4444' : '#9ca3af'} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.contentContainer, colorScheme === 'dark' && styles.contentContainerDark]}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>Auto Car Wash</Text>
            <View style={styles.ratingRow}>
              <MaterialIcons name="star" size={18} color="#fbbf24" />
              <Text style={styles.ratingText}>5.0 (134)</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={14} color="#6b7280" />
            <Text style={styles.locationText}>24 Green Street • 2km</Text>
          </View>

          <View style={styles.couponRow}>
            <Pressable
              onPress={() => router.push({ pathname: '/new-entry', params: { coupon: 'Wash120' } })}
              style={({ pressed }) => [styles.couponCard, pressed && styles.cardPressed]}
              android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
            >
              <View style={styles.couponIconBox}>
                <MaterialIcons name="sell" size={18} color="#ffffff" />
              </View>
              <View style={styles.couponTextBox}>
                <Text style={styles.couponTitle}>30% OFF</Text>
                <Text style={styles.couponSubtitle}>use code Wash120</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push({ pathname: '/new-entry', params: { coupon: 'New' } })}
              style={({ pressed }) => [styles.couponCard, pressed && styles.cardPressed]}
              android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
            >
              <View style={styles.couponIconBox}>
                <MaterialIcons name="sell" size={18} color="#ffffff" />
              </View>
              <View style={styles.couponTextBox}>
                <Text style={styles.couponTitle}>10% OFF</Text>
                <Text style={styles.couponSubtitle}>use code New</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.tabsRow}>
            {tabs.map(tab => {
              const isActive = tab === activeTab;
              return (
                <Pressable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                >
                  <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
                  {isActive ? <View style={styles.activeTabUnderline} /> : null}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.servicesGrid}>
            <Pressable style={styles.serviceItem} onPress={() => router.push({ pathname: '/new-entry', params: { service: 'Car Wash' } })}>
              <View style={styles.serviceIconCircle}>
                <MaterialIcons name="local-car-wash" size={20} color="#4b5563" />
              </View>
              <Text style={styles.serviceLabel}>Car Wash</Text>
            </Pressable>

            <Pressable style={styles.serviceItem} onPress={() => router.push({ pathname: '/new-entry', params: { service: 'Car Polish' } })}>
              <View style={styles.serviceIconCircle}>
                <MaterialIcons name="waves" size={20} color="#4b5563" />
              </View>
              <Text style={styles.serviceLabel}>Car Polish</Text>
            </Pressable>

            <Pressable style={styles.serviceItem} onPress={() => router.push({ pathname: '/new-entry', params: { service: 'Interior Wash' } })}>
              <View style={styles.serviceIconCircle}>
                <MaterialIcons name="airline-seat-recline-normal" size={20} color="#4b5563" />
              </View>
              <Text style={styles.serviceLabel}>Interior Wash</Text>
            </Pressable>

            <Pressable style={styles.serviceItem} onPress={() => router.push({ pathname: '/new-entry', params: { service: 'Engine Wash' } })}>
              <View style={styles.serviceIconCircle}>
                <MaterialIcons name="build" size={20} color="#4b5563" />
              </View>
              <Text style={styles.serviceLabel}>Engine Wash</Text>
            </Pressable>
          </View>

          <View style={styles.categoriesRow}>
            <Text style={styles.categoryText}>Car Wash</Text>
            <Text style={[styles.categoryText, styles.categoryActive]}>Car Polish</Text>
            <Text style={styles.categoryText}>Interior Wash</Text>
          </View>
        </View>

        <View style={[styles.footerContainer, colorScheme === 'dark' && styles.footerContainerDark]}>
          <Pressable
            onPress={() => router.push('/new-entry')}
            style={({ pressed }) => [styles.bookButton, pressed && styles.bookButtonPressed]}
            android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
            accessibilityRole="button"
            accessibilityLabel="Book now"
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e5e7eb',
  },
  safeAreaDark: {
    backgroundColor: '#0b0f12',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headerContainer: {
    width: '100%',
    height: 256,
    backgroundColor: '#ffffff',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  topButtonsRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundIconButton: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 9999,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.85,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: '#ffffff',
  },
  contentContainerDark: {
    backgroundColor: '#0f1418',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6b7280',
  },
  couponRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    columnGap: 12,
  },
  couponCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    padding: 12,
    borderRadius: 12,
  },
  cardPressed: {
    opacity: 0.9,
  },
  couponIconBox: {
    backgroundColor: '#3b82f6',
    padding: 8,
    borderRadius: 8,
  },
  couponTextBox: {
    marginLeft: 12,
  },
  couponTitle: {
    fontWeight: '700',
    color: '#1e3a8a',
  },
  couponSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#2563eb',
  },
  activeTabUnderline: {
    marginTop: 4,
    height: 2,
    backgroundColor: '#2563eb',
    width: '60%',
    borderRadius: 1,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 24,
  },
  serviceItem: {
    width: '22%'
    ,
    alignItems: 'center',
  },
  serviceIconCircle: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 9999,
  },
  serviceLabel: {
    fontSize: 12,
    marginTop: 8,
    color: '#374151',
    textAlign: 'center',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  categoryActive: {
    color: '#2563eb',
  },
  footerContainer: {
    padding: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  footerContainerDark: {
    borderTopColor: '#111827',
    backgroundColor: '#0f1418',
  },
  bookButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
  },
  bookButtonPressed: {
    opacity: 0.95,
  },
  bookButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
