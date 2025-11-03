import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Fonts } from '../../styles/fonts';
import { Colors } from '../../styles/colors';

type ServiceType = 'Residential' | 'Commercial' | 'Hospitality' | 'Turnkey';

const Stepper = ({ step }: { step: number }) => {
  const total = 5; // Service, Rooms, Floor, Package, Get Quote
  return (
    <View style={styles.stepper}>
      {Array.from({ length: total }).map((_, idx) => (
        <View key={idx} style={styles.stepItem}>
          <View style={[styles.stepDot, idx <= step && styles.stepDotActive]} />
          {idx < total - 1 && <View style={[styles.stepBar, idx < step && styles.stepBarActive]} />}
        </View>
      ))}
    </View>
  );
};

const Radio = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
  <TouchableOpacity style={styles.radioRow} onPress={onPress}>
    <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

const PackageCard = ({ title, onSelect }: { title: string; onSelect: () => void }) => (
  <View style={styles.packageCard}>
    <Image
      source={{ uri: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600' }}
      style={styles.packageImage}
    />
    <View style={styles.packageContent}>
      <Text style={styles.packageTitle}>{title}</Text>
      <Text style={styles.packagePoint}>• Affordable Pricing</Text>
      <Text style={styles.packagePoint}>• Flexible Options</Text>
      <Text style={styles.packagePoint}>• Quality Assured</Text>
      <TouchableOpacity style={styles.packageSelect} onPress={onSelect}>
        <Text style={styles.packageSelectText}>Next</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const EstimateWizardScreen: React.FC = () => {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceType>('Residential');
  const [bhk, setBhk] = useState<'1' | '2' | '3' | '4' | '5'>('2');
  const [floors, setFloors] = useState('1');
  const [cabins, setCabins] = useState('2');
  const [pkg, setPkg] = useState<'Essential' | 'Premium' | 'Luxury' | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      {step === 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select your Service Type</Text>
          {(['Residential', 'Commercial', 'Hospitality', 'Turnkey'] as ServiceType[]).map((s) => (
            <Radio key={s} label={s} selected={service === s} onPress={() => setService(s)} />
          ))}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnGhost} onPress={back}><Text style={styles.btnGhostText}>Back</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnPrimary} onPress={next}><Text style={styles.btnPrimaryText}>Next</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select The Rooms</Text>
          {(['1', '2', '3', '4', '5'] as const).map((n) => (
            <Radio key={n} label={`${n} BHK`} selected={bhk === n} onPress={() => setBhk(n)} />
          ))}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnGhost} onPress={back}><Text style={styles.btnGhostText}>Back</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnPrimary} onPress={next}><Text style={styles.btnPrimaryText}>Next</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select The Floor</Text>
          <TextInput style={styles.input} placeholder="Number of Floor" keyboardType="numeric" value={floors} onChangeText={setFloors} />
          <TextInput style={styles.input} placeholder="Number of Cabins" keyboardType="numeric" value={cabins} onChangeText={setCabins} />
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnGhost} onPress={back}><Text style={styles.btnGhostText}>Back</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnPrimary} onPress={next}><Text style={styles.btnPrimaryText}>Next</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pick Your Package</Text>
          {(['Essential', 'Premium', 'Luxury'] as const).map((t) => (
            <PackageCard key={t} title={t} onSelect={() => { setPkg(t); next(); }} />
          ))}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnGhost} onPress={back}><Text style={styles.btnGhostText}>Back</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {step === 4 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Let's connect</Text>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=600' }} style={styles.contactImage} />
          <TextInput style={styles.input} placeholder="Name" value={form.name} onChangeText={(t) => setForm({ ...form, name: t })} />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={form.email} onChangeText={(t) => setForm({ ...form, email: t })} />
          <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={form.phone} onChangeText={(t) => setForm({ ...form, phone: t })} />
          <TextInput style={[styles.input, { height: 100 }]} placeholder="Message" multiline value={form.message} onChangeText={(t) => setForm({ ...form, message: t })} />
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnGhost} onPress={back}><Text style={styles.btnGhostText}>Back</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnPrimary}><Text style={styles.btnPrimaryText}>Submit</Text></TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  logo: { fontSize: 16, fontFamily: Fonts.semiBold, color: Colors.textPrimary, marginBottom: 8 },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepItem: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  stepDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#E0E0E0' },
  stepDotActive: { backgroundColor: '#FF6F61' },
  stepBar: { flex: 1, height: 2, backgroundColor: '#E0E0E0' },
  stepBarActive: { backgroundColor: '#FF6F61' },
  card: { backgroundColor: '#FFFFFF', margin: 16, borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  sectionTitle: { fontSize: 14, fontFamily: Fonts.semiBold, color: Colors.textPrimary, marginBottom: 12 },
  radioRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F7F7', paddingHorizontal: 12, paddingVertical: 12, borderRadius: 8, marginBottom: 10 },
  radioOuter: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#CFCFCF', marginRight: 10, alignItems: 'center', justifyContent: 'center' },
  radioOuterActive: { borderColor: '#FF6F61' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF6F61' },
  radioLabel: { fontSize: 13, color: Colors.textPrimary, fontFamily: Fonts.regular },
  input: { backgroundColor: '#F7F7F7', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 12, fontFamily: Fonts.regular, color: Colors.textPrimary },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  btnGhost: { backgroundColor: '#F2F2F2', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8 },
  btnGhostText: { color: Colors.textPrimary, fontFamily: Fonts.semiBold },
  btnPrimary: { backgroundColor: '#FF6F61', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8 },
  btnPrimaryText: { color: '#FFFFFF', fontFamily: Fonts.semiBold },
  packageCard: { backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: '#EFEFEF' },
  packageImage: { width: '100%', height: 140 },
  packageContent: { padding: 12 },
  packageTitle: { fontSize: 14, fontFamily: Fonts.semiBold, color: Colors.textPrimary, marginBottom: 6 },
  packagePoint: { fontSize: 12, color: Colors.textSecondary, marginBottom: 2 },
  packageSelect: { backgroundColor: '#FF6F61', alignSelf: 'flex-end', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, marginTop: 8 },
  packageSelectText: { color: '#FFFFFF', fontFamily: Fonts.semiBold },
  contactImage: { width: '100%', height: 120, borderRadius: 8, marginBottom: 12 },
});

export default EstimateWizardScreen;


