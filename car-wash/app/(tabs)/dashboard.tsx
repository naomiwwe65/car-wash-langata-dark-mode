import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';

function Bar({ value, label, color = '#60a5fa' }: { value: number; label: string; color?: string }) {
  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${Math.min(100, value)}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  // Use user's local image for guaranteed display
  const carsPerDay = useMemo(() => [12, 18, 9, 15, 20, 14, 22], []);
  const paymentBreakdown = useMemo(() => ({ mpesa: 65, card: 35 }), []);
  const popularServices = useMemo(() => [
    { label: 'Exterior', value: 48 },
    { label: 'Interior', value: 26 },
    { label: 'Full Wash', value: 18 },
    { label: 'Wax', value: 8 },
  ], []);

  const totalToday = 22;
  const revenueToday = 8800; // mock
  const mostUsed = 'Exterior Wash';

  return (
    <SafeAreaView style={[styles.safeArea, colorScheme === 'dark' && styles.safeAreaDark]} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={[styles.container, colorScheme === 'dark' && styles.containerDark]}>
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/Screenshot 2025-08-16 213813.png')}
            style={styles.headerImage}
            contentFit="cover"
            cachePolicy="disk"
            transition={200}
          />
        </View>
        <Text style={[styles.title, colorScheme === 'dark' && styles.titleDark]}>Dashboard</Text>

        <View style={styles.cardRow}>
          <View style={[styles.statCard, colorScheme === 'dark' && styles.statCardDark]}>
            <Text style={[styles.statLabel, colorScheme === 'dark' && styles.statLabelDark]}>Cars today</Text>
            <Text style={[styles.statValue, colorScheme === 'dark' && styles.statValueDark]}>{totalToday}</Text>
          </View>
          <View style={[styles.statCard, colorScheme === 'dark' && styles.statCardDark]}>
            <Text style={[styles.statLabel, colorScheme === 'dark' && styles.statLabelDark]}>Revenue</Text>
            <Text style={[styles.statValue, colorScheme === 'dark' && styles.statValueDark]}>Ksh {revenueToday.toLocaleString()}</Text>
          </View>
        </View>

        <View style={[styles.statCard, colorScheme === 'dark' && styles.statCardDark]}>
          <Text style={[styles.statLabel, colorScheme === 'dark' && styles.statLabelDark]}>Most used service</Text>
          <Text style={[styles.statValue, colorScheme === 'dark' && styles.statValueDark]}>{mostUsed}</Text>
        </View>

        <View style={[styles.card, colorScheme === 'dark' && styles.cardDark]}>
          <Text style={[styles.cardTitle, colorScheme === 'dark' && styles.cardTitleDark]}>Cars washed (last 7 days)</Text>
          {carsPerDay.map((v, i) => (
            <Bar key={i} value={(v / 25) * 100} label={`Day ${i + 1}`} />
          ))}
        </View>

        <View style={[styles.card, colorScheme === 'dark' && styles.cardDark]}>
          <Text style={[styles.cardTitle, colorScheme === 'dark' && styles.cardTitleDark]}>Revenue by payment method</Text>
          <Bar value={paymentBreakdown.mpesa} label="M-Pesa" color="#22c55e" />
          <Bar value={paymentBreakdown.card} label="Card" color="#f59e0b" />
        </View>

        <View style={[styles.card, colorScheme === 'dark' && styles.cardDark]}>
          <Text style={[styles.cardTitle, colorScheme === 'dark' && styles.cardTitleDark]}>Popular service types</Text>
          {popularServices.map(s => (
            <Bar key={s.label} value={s.value} label={s.label} color="#93c5fd" />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  safeAreaDark: { backgroundColor: '#0b0f12' },
  container: { padding: 24, gap: 16 },
  containerDark: { },
  headerContainer: { width: '100%', height: 160, borderRadius: 16, overflow: 'hidden', backgroundColor: '#e5e7eb' },
  headerImage: { width: '100%', height: '100%', borderRadius: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  titleDark: { color: '#E5E7EB' },
  cardRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: '#f3f4f6', padding: 16, borderRadius: 12 },
  statCardDark: { backgroundColor: '#111827' },
  statLabel: { color: '#6b7280', fontWeight: '600' },
  statLabelDark: { color: '#CBD5E1' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 4 },
  statValueDark: { color: '#F8FAFC' },
  card: { backgroundColor: '#f9fafb', padding: 16, borderRadius: 12 },
  cardDark: { backgroundColor: '#111827' },
  cardTitle: { fontWeight: '700', color: '#111827', marginBottom: 8 },
  cardTitleDark: { color: '#E5E7EB' },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 4 },
  barLabel: { width: 88, color: '#374151' },
  barTrack: { flex: 1, backgroundColor: '#e5e7eb', height: 10, borderRadius: 6 },
  barFill: { height: 10, borderRadius: 6 },
});


