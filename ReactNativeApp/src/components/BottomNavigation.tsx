import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

interface BottomNavigationProps {
  activeTab: 'home' | 'design' | 'pros' | 'estimate' | 'profile';
  onTabPress: (tab: 'home' | 'design' | 'pros' | 'estimate' | 'profile') => void;
}

// Home Icon
const HomeIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      stroke={active ? '#007AFF' : '#333333'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Design/Search Icon
const DesignIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
      stroke={active ? '#007AFF' : '#333333'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Pros Icon (Clock with fill)
const ProsIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      stroke={active ? '#007AFF' : '#333333'}
      strokeWidth={2}
      fill={active ? 'rgba(0, 122, 255, 0.2)' : 'none'}
    />
    <Path
      d="M12 6v6l4 2"
      stroke={active ? '#007AFF' : '#333333'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Estimate Icon (Clock)
const EstimateIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      stroke={active ? '#007AFF' : '#333333'}
      strokeWidth={2}
    />
    <Path
      d="M12 6v6l4 2"
      stroke={active ? '#007AFF' : '#333333'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Profile Icon
const ProfileIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke={active ? '#007AFF' : '#333333'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      stroke={active ? '#007AFF' : '#333333'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'design', label: 'Design', icon: DesignIcon },
    { id: 'pros', label: 'Pros', icon: ProsIcon },
    { id: 'estimate', label: 'Estimate', icon: EstimateIcon },
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
  ] as const;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
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
