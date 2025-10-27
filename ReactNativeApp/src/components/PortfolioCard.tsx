import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

interface PortfolioCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    location: string;
    rating: number;
    reviewCount: number;
    image: string;
  };
  onPress?: () => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: project.image }} style={styles.projectImage} />
      <View style={styles.content}>
        <Text style={styles.projectName} numberOfLines={2}>
          {project.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            {project.rating} ({project.reviewCount} reviews)
          </Text>
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.location} numberOfLines={1}>
            {project.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  projectImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  projectName: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    flex: 1,
  },
});

export default PortfolioCard;
