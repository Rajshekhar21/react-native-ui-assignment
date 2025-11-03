import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Fonts } from '../../styles/fonts';
import { Colors } from '../../styles/colors';
import ProfileHeader from '../../components/ProfileHeader';
import PortfolioCard from '../../components/PortfolioCard';
import ProfessionalTags from '../../components/ProfessionalTags';
import { useAuth } from '../../context/AuthContextSimple';

const { width } = Dimensions.get('window');

type ProfileViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileView'
>;

interface Props {
  navigation: ProfileViewScreenNavigationProp;
}

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  professionalProfile: {
    roles: ('interior' | 'architect' | 'contractor')[];
    rating: number;
    reviewCount: number;
    location: string;
    description: string;
  };
  portfolio: Array<{
    id: string;
    name: string;
    description: string;
    location: string;
    rating: number;
    reviewCount: number;
    image: string;
  }>;
}

const ProfileViewScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Mock data - using fixed data to match the UI design
  useEffect(() => {
    const mockProfile: UserProfile = {
      id: '1',
      fullName: 'Akash Sharma',
      email: 'akash@gmail.com',
      phone: '81265 28355',
      isVerified: true,
      professionalProfile: {
        roles: ['interior', 'architect', 'contractor'],
        rating: 4.8,
        reviewCount: 38,
        location: 'Dehradun, India',
        description: 'Our dream home was designed as beautifully as we pictured it - that\'s what\'s unique about Decor mate experience.',
      },
      portfolio: [
        {
          id: '1',
          name: 'Modern Open Kitchen Design with Granite Island',
          description: 'Contemporary kitchen with granite island and modern appliances',
          location: 'Dehradun, Uttarakhand',
          rating: 4.96,
          reviewCount: 672,
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        },
        {
          id: '2',
          name: 'Luxury Living Room Design',
          description: 'Elegant living room with premium finishes',
          location: 'Mumbai, Maharashtra',
          rating: 4.9,
          reviewCount: 89,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        },
        {
          id: '3',
          name: 'Master Bedroom Suite',
          description: 'Luxurious master bedroom with walk-in closet',
          location: 'Delhi, NCR',
          rating: 4.7,
          reviewCount: 156,
          image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
        },
        {
          id: '4',
          name: 'Contemporary Office Space',
          description: 'Modern office design with open workspace',
          location: 'Bangalore, Karnataka',
          rating: 4.8,
          reviewCount: 234,
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
        },
      ],
    };
    setProfile(mockProfile);
  }, []);

  const handleEditProfile = () => {
    navigation.navigate('ProfileEdit');
  };

  const handleAddProject = () => {
    navigation.navigate('ProjectAdd');
  };

  const handleProjectPress = (projectId: string) => {
    navigation.navigate('ProjectDetail', { projectId });
  };

  const handleWriteReview = () => {
    // Navigate to review screen
    console.log('Write a review');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // Navigation will be handled by AuthContext
              if (__DEV__) {
                console.log('✅ User logged out successfully');
              }
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        {/* <ProfileHeader
          userName={profile.fullName}
          userEmail={profile.email}
          onEdit={handleEditProfile}
          showEdit={false}
          showSave={false}
          showUserInfo={false}
        /> */}

        {/* Hero Image */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop' }}
            style={styles.heroImage}
          />
        </View>

        {/* User Info Card */}
        <View style={styles.userInfoCard}>
          <View style={styles.topRow}>
            <View style={styles.nameContainer}>
              <Text style={styles.userNameLarge}>{profile.fullName}</Text>
              {profile.isVerified && (
                <Text style={styles.verifiedIcon}>✓</Text>
              )}
            </View>
            <TouchableOpacity style={styles.smallLogoutButton} onPress={handleLogout}>
              <Text style={styles.smallLogoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.descriptionLarge}>
            {profile.professionalProfile.description}
          </Text>

          <ProfessionalTags roles={profile.professionalProfile.roles} />

          <View style={styles.ratingRow}>
            <Text style={styles.rowIcon}>🏆</Text>
            <Text style={styles.ratingText}>{profile.professionalProfile.reviewCount} Review</Text>
            <TouchableOpacity style={styles.writeReviewButton} onPress={handleWriteReview}>
              <Text style={styles.writeReviewText}>Write a Review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareIcon}>↗</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.locationRow}>
            <Text style={styles.rowIcon}>📍</Text>
            <Text style={styles.locationText}>{profile.professionalProfile.location}</Text>
          </View>
        </View>

        {/* Send Enquiry Button */}
        <View style={styles.enquiryContainer}>
          <TouchableOpacity style={styles.enquiryButton}>
            <Text style={styles.enquiryButtonText}>Send Enquiry</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About Us</Text>
          <Text style={styles.aboutText}>
            We create interiors that seamlessly blend functionality with elegance where every detail is thoughtfully
            designed to inspire, comfort, and elevate your lifestyle. Our approach goes beyond aesthetics; we craft
            spaces that are not only visually stunning but also practical, harmonious, and deeply personal, ensuring
            your home feels both inspiring and truly livable.
          </Text>
        </View>

        {/* Portfolio Section */}
        <View style={styles.portfolioSection}>
          <View style={styles.portfolioHeader}>
            <Text style={styles.portfolioTitle}>Portfolio</Text>
            <TouchableOpacity style={styles.addProjectButton} onPress={handleAddProject}>
              <Text style={styles.addProjectButtonText}>Add New Project</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.portfolioGrid}>
            {profile.portfolio.map((project) => (
              <View key={project.id} style={styles.portfolioItem}>
                <PortfolioCard
                  project={project}
                  onPress={() => handleProjectPress(project.id)}
                />
              </View>
            ))}
          </View>
        </View>

        {null}
      </ScrollView>
    </SafeAreaView>
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
  heroSection: {
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  userInfoCard: {
    backgroundColor: Colors.background,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  userNameLarge: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  verifiedIcon: {
    fontSize: 16,
    color: '#4CAF50',
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  descriptionLarge: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  rating: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  reviewButtonIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  reviewButtonText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  inlineActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  smallLogoutButton: {
    borderColor: '#FF3B30',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FFF5F4',
  },
  smallLogoutText: {
    color: '#FF3B30',
    fontSize: 12,
    fontFamily: Fonts.semiBold,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rowIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    marginRight: 12,
  },
  writeReviewButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  writeReviewText: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  shareButton: {
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  shareIcon: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  enquiryContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  enquiryButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 16,
  },
  enquiryButtonText: {
    color: Colors.textWhite,
    fontSize: 20,
    fontFamily: Fonts.semiBold,
  },
  aboutSection: {
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  aboutTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  portfolioSection: {
    paddingHorizontal: 20,
    marginBottom: 80, // Space for bottom navigation
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  portfolioTitle: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  addProjectButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addProjectButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  portfolioItem: {
    width: '48%',
    marginBottom: 16,
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});

export default ProfileViewScreen;
