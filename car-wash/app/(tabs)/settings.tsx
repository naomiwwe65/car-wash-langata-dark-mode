import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={[styles.safeArea, colorScheme === 'dark' && styles.safeAreaDark]} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={[styles.container, colorScheme === 'dark' && styles.containerDark]}>
        <View style={styles.headerContainer}>
          <ImageBackground
            accessibilityLabel="Settings"
            source={require('@/assets/images/mintosko-V4b2j7f1dfc-unsplash (1).jpg')}
            style={styles.headerImage}
            imageStyle={styles.headerImageRadius}
          />
        </View>
        <Text style={[styles.title, colorScheme === 'dark' && styles.titleDark]}>Settings</Text>

        <View style={[styles.card, colorScheme === 'dark' && styles.cardDark]}>
          <Text style={[styles.cardTitle, colorScheme === 'dark' && styles.cardTitleDark]}>Integrations (placeholders)</Text>
          <Text style={[styles.label, colorScheme === 'dark' && styles.labelDark]}>M-Pesa API Key</Text>
          <TextInput placeholder="Enter Daraja key (later)" placeholderTextColor="#9CA3AF" style={[styles.input, colorScheme === 'dark' && styles.inputDark]} />
          <Text style={[styles.label, colorScheme === 'dark' && styles.labelDark]}>Stripe/Flutterwave Key</Text>
          <TextInput placeholder="Enter key (later)" placeholderTextColor="#9CA3AF" style={[styles.input, colorScheme === 'dark' && styles.inputDark]} />
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
  headerContainer: { height: 140, borderRadius: 16, overflow: 'hidden' },
  headerImage: { width: '100%', height: '100%' },
  headerImageRadius: { },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  titleDark: { color: '#E5E7EB' },
  card: { backgroundColor: '#f9fafb', padding: 16, borderRadius: 12 },
  cardDark: { backgroundColor: '#111827' },
  cardTitle: { fontWeight: '700', color: '#111827', marginBottom: 8 },
  cardTitleDark: { color: '#E5E7EB' },
  label: { fontWeight: '600', color: '#374151', marginTop: 8 },
  labelDark: { color: '#CBD5E1' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 12, marginTop: 6, color: '#111827' },
  inputDark: { borderColor: '#1F2937', color: '#E5E7EB' },
});


