import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Fonts } from '../../styles/fonts';
import { Colors } from '../../styles/colors';
import ProfileHeader from '../../components/ProfileHeader';

const { width } = Dimensions.get('window');

type ProjectDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProjectDetail'
>;

type ProjectDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProjectDetail'>;

interface Props {
  navigation: ProjectDetailScreenNavigationProp;
  route: ProjectDetailScreenRouteProp;
}

interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  type: string;
  rating: number;
  reviewCount: number;
  images: string[];
  designer: {
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
  };
  features: string[];
  completedDate: string;
  budget: string;
}

const ProjectDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { projectId } = route.params;
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockProject: Project = {
      id: projectId,
      name: 'Modern Open Kitchen Design with Granite Island',
      description: 'A contemporary kitchen design featuring a stunning granite island, modern appliances, and sleek cabinetry. This project showcases the perfect blend of functionality and aesthetics, creating a space that is both beautiful and practical for everyday living.',
      location: 'Dehradun, Uttarakhand',
      type: 'Residential',
      rating: 4.79,
      reviewCount: 172,
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
      ],
      designer: {
        name: 'Akash Sharma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        reviewCount: 38,
      },
      features: [
        'Granite Island Countertop',
        'Modern Appliances',
        'Soft-close Cabinets',
        'LED Under-cabinet Lighting',
        'Quartz Backsplash',
        'Pull-out Pantry',
      ],
      completedDate: 'March 2023',
      budget: '₹2,50,000 - ₹3,00,000',
    };
    setProject(mockProject);
  }, [projectId]);

  const handleContactDesigner = () => {
    // Navigate to contact/chat screen
    console.log('Contact designer');
  };

  const handleViewPortfolio = () => {
    // Navigate to designer's portfolio
    console.log('View portfolio');
  };

  if (!project) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProfileHeader
        userName={project.name}
        userEmail=""
        showEdit={false}
        showSave={false}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Project Images */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: project.images[0] }} style={styles.mainImage} />
        </View>

        {/* Project Info */}
        <View style={styles.content}>
          <Text style={styles.projectName}>{project.name}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              ⭐ {project.rating} ({project.reviewCount} reviews)
            </Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.location}>{project.location}</Text>
            </View>
          </View>

          <Text style={styles.description}>{project.description}</Text>

          {/* Project Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Project Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Type:</Text>
              <Text style={styles.detailValue}>{project.type}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Completed:</Text>
              <Text style={styles.detailValue}>{project.completedDate}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Budget:</Text>
              <Text style={styles.detailValue}>{project.budget}</Text>
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featuresGrid}>
              {project.features.map((feature, index) => (
                <View key={index} style={styles.featureTag}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Designer Info */}
          <View style={styles.designerSection}>
            <Text style={styles.sectionTitle}>Designed By</Text>
            
            <View style={styles.designerCard}>
              <Image source={{ uri: project.designer.avatar }} style={styles.designerAvatar} />
              <View style={styles.designerInfo}>
                <Text style={styles.designerName}>{project.designer.name}</Text>
                <Text style={styles.designerRating}>
                  ⭐ {project.designer.rating} ({project.designer.reviewCount} reviews)
                </Text>
              </View>
              <TouchableOpacity style={styles.contactButton} onPress={handleContactDesigner}>
                <Text style={styles.contactButtonText}>Contact</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.portfolioButton} onPress={handleViewPortfolio}>
              <Text style={styles.portfolioButtonText}>View Full Portfolio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    marginBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  projectName: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
    lineHeight: 30,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
  designerSection: {
    marginBottom: 24,
  },
  designerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  designerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  designerInfo: {
    flex: 1,
  },
  designerName: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  designerRating: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  contactButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  contactButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  portfolioButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  portfolioButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});

export default ProjectDetailScreen;
