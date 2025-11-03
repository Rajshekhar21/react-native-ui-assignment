import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

const { width } = Dimensions.get('window');

type AboutUsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AboutUs'
>;

interface Props {
  navigation: AboutUsScreenNavigationProp;
}

const AboutUsScreen: React.FC<Props> = ({ navigation }) => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  
  const teamMembers = [
    {
      id: 1,
      name: 'Amanda Fisher',
      title: 'Insert your title here',
      description: 'There are many variations of passages of Lorem Ipsum available',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'John Doe',
      title: 'Design Director',
      description: 'There are many variations of passages of Lorem Ipsum available',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'Jane Smith',
      title: 'Creative Lead',
      description: 'There are many variations of passages of Lorem Ipsum available',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
  ];

  const handlePreviousTeam = () => {
    setCurrentTeamIndex((prev) => 
      prev === 0 ? teamMembers.length - 1 : prev - 1
    );
  };

  const handleNextTeam = () => {
    setCurrentTeamIndex((prev) => 
      prev === teamMembers.length - 1 ? 0 : prev + 1
    );
  };

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop' }}
        style={styles.heroImage}
      />
      <View style={styles.heroOverlay}>
        <Text style={styles.heroTitle}>About Us</Text>
      </View>
    </View>
  );

  const renderMissionSection = () => (
    <View style={styles.missionSection}>
      <Text style={styles.missionSubtitle}>How It Started</Text>
      <Text style={styles.missionTitle}>
        Our Mission is to Connect You with Your Dream Designer
      </Text>
      <Text style={styles.missionDescription}>
        A marketplace built to make interiors personal, effortless, and truly reflective of your vision.
      </Text>
    </View>
  );

  const renderInteriorShowcase = () => (
    <View style={styles.showcaseSection}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop' }}
        style={styles.showcaseImage}
      />
    </View>
  );

  const renderStatistics = () => (
    <View style={styles.statisticsSection}>
      <View style={styles.statisticsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>6000+</Text>
          <Text style={styles.statLabel}>Projects Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>30,000+</Text>
          <Text style={styles.statLabel}>Verified Professionals</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5000+</Text>
          <Text style={styles.statLabel}>Exclusive Designs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>10,000+</Text>
          <Text style={styles.statLabel}>Happy Clients</Text>
        </View>
      </View>
    </View>
  );

  const renderFounders = () => (
    <View style={styles.foundersSection}>
      <Text style={styles.foundersTitle}>Meet our Founders</Text>
      <Text style={styles.foundersDescription}>
        Every milestone has a story—and it all started with our founders, whose dedication and vision guide us forward each day.
      </Text>
      <View style={styles.foundersGrid}>
        <View style={styles.founderCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=500&fit=crop' }}
            style={styles.founderImage}
          />
          <Text style={styles.founderName}>Akash Sharma</Text>
          <Text style={styles.founderTitle}>Co-founder and Chairman</Text>
        </View>
        <View style={styles.founderCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=500&fit=crop' }}
            style={styles.founderImage}
          />
          <Text style={styles.founderName}>Akash Sharma</Text>
          <Text style={styles.founderTitle}>Co-founder and Chairman</Text>
        </View>
      </View>
    </View>
  );

  const renderOurTeam = () => (
    <View style={styles.teamSection}>
      <Text style={styles.teamSubtitle}>WHO WE ARE</Text>
      <Text style={styles.teamTitle}>Our Team</Text>
      <Text style={styles.teamDescription}>
        Just take a look – each member of the team is watching your every gesture and will hear your every whisper.
      </Text>
      <View style={styles.teamCarousel}>
        <TouchableOpacity
          style={styles.carouselArrow}
          onPress={handlePreviousTeam}
        >
          <Text style={styles.arrowIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.teamCard}>
          <Image
            source={{ uri: teamMembers[currentTeamIndex].image }}
            style={styles.teamMemberImage}
          />
          <Text style={styles.teamMemberName}>
            {teamMembers[currentTeamIndex].name}
          </Text>
          <Text style={styles.teamMemberTitle}>
            {teamMembers[currentTeamIndex].title}
          </Text>
          <Text style={styles.teamMemberDescription}>
            {teamMembers[currentTeamIndex].description}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.carouselArrow}
          onPress={handleNextTeam}
        >
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderHeroSection()}
      {renderMissionSection()}
      {renderInteriorShowcase()}
      {renderStatistics()}
      {renderFounders()}
      {renderOurTeam()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroTitle: {
    fontSize: 48,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    textAlign: 'center',
  },
  missionSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.background,
  },
  missionSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#FF6F61',
    marginBottom: 12,
  },
  missionTitle: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
    lineHeight: 40,
  },
  missionDescription: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  showcaseSection: {
    width: '100%',
    marginBottom: 40,
  },
  showcaseImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  statisticsSection: {
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  foundersSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.background,
  },
  foundersTitle: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  foundersDescription: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 32,
  },
  foundersGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  founderCard: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  founderImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  founderName: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 4,
  },
  founderTitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  teamSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
  },
  teamSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    letterSpacing: 2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  teamTitle: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  teamDescription: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  teamCarousel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  carouselArrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  arrowIcon: {
    fontSize: 20,
    color: Colors.textWhite,
    fontFamily: Fonts.bold,
  },
  teamCard: {
    width: width * 0.6,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamMemberImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  teamMemberName: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  teamMemberTitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  teamMemberDescription: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default AboutUsScreen;

