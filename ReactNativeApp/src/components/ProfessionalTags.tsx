import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

interface ProfessionalTagsProps {
  roles: ('interior' | 'architect' | 'contractor')[];
}

const ProfessionalTags: React.FC<ProfessionalTagsProps> = ({ roles }) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'interior':
        return '🏠';
      case 'architect':
        return '📐';
      case 'contractor':
        return '🔨';
      default:
        return '👷';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'interior':
        return 'Interior';
      case 'architect':
        return 'Architect';
      case 'contractor':
        return 'Contractor';
      default:
        return role;
    }
  };

  return (
    <View style={styles.container}>
      {roles.map((role, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagIcon}>{getRoleIcon(role)}</Text>
          <Text style={styles.tagText}>{getRoleLabel(role)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  tagIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
});

export default ProfessionalTags;
