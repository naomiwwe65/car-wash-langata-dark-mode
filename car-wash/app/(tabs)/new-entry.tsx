import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { PaymentMethod, ServiceType, useAppData } from '@/context/AppDataContext';

export default function NewEntryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const services = useMemo<ServiceType[]>(() => ['Exterior Wash', 'Interior Cleaning', 'Full Wash', 'Wax'], []);
  const paymentMethods = useMemo<PaymentMethod[]>(() => ['M-Pesa', 'Card'], []);

  const { addEntry } = useAppData();
  const params = useLocalSearchParams<{ service?: string; coupon?: string }>();
  const [numberPlate, setNumberPlate] = useState('');
  const [carModel, setCarModel] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('Exterior Wash');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('M-Pesa');
  const [appliedCoupon, setAppliedCoupon] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (params.service) {
      // Map incoming friendly names to our service set
      const map: Record<string, ServiceType | undefined> = {
        'Car Wash': 'Exterior Wash',
        'Car Polish': 'Wax',
        'Interior Wash': 'Interior Cleaning',
        'Engine Wash': 'Full Wash',
      };
      const mapped = map[String(params.service)];
      if (mapped) setServiceType(mapped);
    }
    if (params.coupon) setAppliedCoupon(String(params.coupon));
  }, [params.service, params.coupon]);

  const onSubmit = () => {
    if (!numberPlate.trim() || !carModel.trim()) {
      Alert.alert('Missing info', 'Please enter both number plate and car model');
      return;
    }
    let total = serviceType === 'Full Wash' ? 800 : serviceType === 'Wax' ? 1200 : 500;
    if (appliedCoupon === 'Wash120') total = Math.round(total * 0.7);
    if (appliedCoupon === 'New') total = Math.round(total * 0.9);
    const created = addEntry({ numberPlate, carModel, serviceType, paymentMethod, total });
    Alert.alert('Submitted', 'Entry saved (mock). You can preview a receipt next.', [
      { text: 'OK', onPress: () => router.push({ pathname: '/receipt-preview', params: { id: created.id } }) },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, colorScheme === 'dark' && styles.safeAreaDark]} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={[styles.container, colorScheme === 'dark' && styles.containerDark]}>
          <View style={styles.headerContainer}>
            <ImageBackground
              accessibilityLabel="New entry"
              source={require('@/assets/images/Screenshot 2025-08-16 215639.png')}
              style={styles.headerImage}
              imageStyle={styles.headerImageRadius}
            />
          </View>
          <Text style={[styles.title, colorScheme === 'dark' && styles.titleDark]}>New Car Intake</Text>

          <View style={styles.field}>
            <Text style={[styles.label, colorScheme === 'dark' && styles.labelDark]}>Number plate</Text>
            <TextInput
              value={numberPlate}
              onChangeText={setNumberPlate}
              placeholder="KCA 123A"
              autoCapitalize="characters"
              placeholderTextColor={colorScheme === 'dark' ? '#9CA3AF' : undefined}
              style={[styles.input, colorScheme === 'dark' && styles.inputDark]}
            />
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, colorScheme === 'dark' && styles.labelDark]}>Car model</Text>
            <TextInput
              value={carModel}
              onChangeText={setCarModel}
              placeholder="Toyota Premio"
              placeholderTextColor={colorScheme === 'dark' ? '#9CA3AF' : undefined}
              style={[styles.input, colorScheme === 'dark' && styles.inputDark]}
            />
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, colorScheme === 'dark' && styles.labelDark]}>Service type</Text>
            <View style={styles.segmentRow}>
              {services.map(svc => (
                <Pressable
                  key={svc}
                  onPress={() => setServiceType(svc)}
                  style={[styles.segment, colorScheme === 'dark' && styles.segmentDark, serviceType === svc && (colorScheme === 'dark' ? styles.segmentActiveDark : styles.segmentActive)]}
                >
                  <Text style={[styles.segmentText, colorScheme === 'dark' && styles.segmentTextDark, serviceType === svc && (colorScheme === 'dark' ? styles.segmentTextActiveDark : styles.segmentTextActive)]}>{svc}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, colorScheme === 'dark' && styles.labelDark]}>Payment method</Text>
            <View style={styles.segmentRow}>
              {paymentMethods.map(pm => (
                <Pressable key={pm} onPress={() => setPaymentMethod(pm)} style={[styles.segment, colorScheme === 'dark' && styles.segmentDark, paymentMethod === pm && (colorScheme === 'dark' ? styles.segmentActiveDark : styles.segmentActive)]}>
                  <Text style={[styles.segmentText, colorScheme === 'dark' && styles.segmentTextDark, paymentMethod === pm && (colorScheme === 'dark' ? styles.segmentTextActiveDark : styles.segmentTextActive)]}>{pm}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {appliedCoupon ? (
            <View style={styles.banner}>
              <Text style={styles.bannerText}>Coupon applied: {appliedCoupon}</Text>
            </View>
          ) : null}

          <Pressable onPress={onSubmit} style={({ pressed }) => [styles.submitButton, pressed && styles.submitPressed]}>
            <MaterialIcons name="check" size={18} color="#fff" />
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>

          <View style={styles.helperRow}>
            <Link href="/receipt-preview">Preview a sample receipt</Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  safeAreaDark: { backgroundColor: '#0b0f12' },
  container: { padding: 24 },
  containerDark: { },
  headerContainer: { height: 180, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  headerImage: { width: '100%', height: '100%' },
  headerImageRadius: { },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 16 },
  titleDark: { color: '#E5E7EB' },
  field: { marginBottom: 16 },
  label: { fontWeight: '600', color: '#374151', marginBottom: 8 },
  labelDark: { color: '#CBD5E1' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 12, color: '#111827' },
  inputDark: { borderColor: '#1F2937', color: '#E5E7EB' },
  segmentRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  segment: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#f3f4f6', borderRadius: 999 },
  segmentDark: { backgroundColor: '#0f1418', borderWidth: 1, borderColor: '#1f2937' },
  segmentActive: { backgroundColor: '#dbeafe', borderWidth: 1, borderColor: '#93c5fd' },
  segmentActiveDark: { backgroundColor: '#1f2937', borderWidth: 1, borderColor: '#374151' },
  segmentText: { color: '#374151', fontWeight: '600' },
  segmentTextDark: { color: '#CBD5E1' },
  segmentTextActive: { color: '#1e40af' },
  segmentTextActiveDark: { color: '#E5E7EB' },
  submitButton: { marginTop: 8, backgroundColor: '#2563eb', paddingVertical: 14, borderRadius: 9999, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  submitPressed: { opacity: 0.95 },
  submitText: { color: '#fff', fontWeight: '700' },
  helperRow: { alignItems: 'center', marginTop: 12 },
  banner: { backgroundColor: '#dcfce7', padding: 10, borderRadius: 8 },
  bannerText: { color: '#166534', fontWeight: '600' },
});


