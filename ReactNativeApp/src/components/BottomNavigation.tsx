import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

interface BottomNavigationProps {
  activeTab: 'home' | 'design' | 'pros' | 'estimate' | 'profile' | null;
  onTabPress: (tab: 'home' | 'design' | 'pros' | 'estimate' | 'profile') => void;
}

// Home Icon
const HomeIcon = ({ active }: { active: boolean }) => (
  <Image 
    source={require('../../assets/images/homenavicon.png')} 
    style={[styles.icon, { tintColor: active ? '#007AFF' : '#333333' }]}
    resizeMode="contain"
  />
);

// Design Icon
const DesignIcon = ({ active }: { active: boolean }) => (
  <Image 
    source={require('../../assets/images/designnavicon.png')} 
    style={[styles.icon, { tintColor: active ? '#007AFF' : '#333333' }]}
    resizeMode="contain"
  />
);

// Pros Icon
const ProsIcon = ({ active }: { active: boolean }) => (
  <Image 
    source={require('../../assets/images/prosnavicon.png')} 
    style={[styles.icon, { tintColor: active ? '#007AFF' : '#333333' }]}
    resizeMode="contain"
  />
);

// Estimate Icon
const EstimateIcon = ({ active }: { active: boolean }) => (
  <Image 
    source={require('../../assets/images/estimatenavicon.png')} 
    style={[styles.icon, { tintColor: active ? '#007AFF' : '#333333' }]}
    resizeMode="contain"
  />
);

// Profile Icon
const ProfileIcon = ({ active }: { active: boolean }) => (
  <Image 
    source={require('../../assets/images/profilenavicon.png')} 
    style={[styles.icon, { tintColor: active ? '#007AFF' : '#333333' }]}
    resizeMode="contain"
  />
);

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'design', label: 'Design', icon: DesignIcon },
    { id: 'pros', label: 'Pros', icon: ProsIcon },
    // { id: 'estimate', label: 'Estimate', icon: EstimateIcon }, // temporarily hidden
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
  ] as const;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabPress(tab.id)}
            >
              <View style={styles.iconContainer}>
                <Icon active={isActive} />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.activeTabLabel,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#333333',
  },
  activeTabLabel: {
    color: '#007AFF',
    fontFamily: Fonts.semiBold,
  },
});

export default BottomNavigation;
