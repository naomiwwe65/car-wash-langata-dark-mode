import React, { useMemo } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useAppData } from '@/context/AppDataContext';

export default function ReceiptPreviewScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { entries } = useAppData();
  const receipt = useMemo(() => entries.find(e => e.id === id) ?? entries[0], [entries, id]);
  const onShare = async () => {
    try {
      if (receipt) {
        await Share.share({
          message: `Receipt (mock) for ${receipt.numberPlate} - ${receipt.serviceType} - Ksh ${receipt.total}`,
        });
      }
    } catch {}
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Receipt Preview</Text>
        <View style={styles.card}>
          <Text style={styles.row}>Plate: {receipt?.numberPlate ?? '-'}</Text>
          <Text style={styles.row}>Model: {receipt?.carModel ?? '-'}</Text>
          <Text style={styles.row}>Service: {receipt?.serviceType ?? '-'}</Text>
          <Text style={styles.row}>Payment: {receipt?.paymentMethod ?? '-'}</Text>
          <Text style={styles.row}>Total: Ksh {receipt?.total ?? '-'}</Text>
          <Text style={styles.row}>Date: {receipt ? new Date(receipt.createdAt).toLocaleString() : '-'}</Text>
        </View>

        <Pressable onPress={onShare} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Download as PDF (mock)</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 24, gap: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  card: { backgroundColor: '#f9fafb', padding: 16, borderRadius: 12 },
  row: { color: '#374151', marginBottom: 6 },
  button: { backgroundColor: '#2563eb', paddingVertical: 14, borderRadius: 9999, alignItems: 'center' },
  buttonPressed: { opacity: 0.95 },
  buttonText: { color: '#fff', fontWeight: '700' },
});


