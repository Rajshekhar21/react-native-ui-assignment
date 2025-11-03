import React, { useState } from 'react';
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
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

const { width } = Dimensions.get('window');

type HospitalityScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Hospitality'
>;

interface Props {
  navigation: HospitalityScreenNavigationProp;
}

const TESTIMONIALS = [
  {
    quote:
      'Their team captured our brand story perfectly. Guests now walk in and immediately feel the upscale vibe we envisioned.',
    name: 'Kavya Desai',
    location: 'Mumbai',
    role: 'Boutique hotel owner',
    avatar:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&auto=format&fit=crop',
  },
  {
    quote:
      'The restaurant makeover doubled our reservations within weeks. Lighting, acoustics and flow are all on point.',
    name: 'Sameer Khanna',
    location: 'Delhi NCR',
    role: 'Restaurateur',
    avatar:
      'https://images.unsplash.com/photo-1542157585-ef20bfcce023?w=200&h=200&auto=format&fit=crop',
  },
  {
    quote:
      'From concept decks to handover, the process was collaborative and detail-oriented. Our spa now feels effortlessly luxurious.',
    name: 'Amanda Lewis',
    location: 'Goa',
    role: 'Resort director',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&auto=format&fit=crop',
  },
];

const HospitalityScreen: React.FC<Props> = ({ navigation }) => {
  const handleSubmit = () => {
    console.log('Book consultation');
  };

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&h=900&auto=format&fit=crop' }}
        style={styles.heroImage}
      />
      <View style={styles.heroOverlay}>
        <Text style={styles.heroTitleLine1}>Designing Spaces That</Text>
        <Text style={styles.heroTitleLine2}>Guests Remember</Text>
        <TouchableOpacity style={styles.consultationButton} onPress={handleSubmit}>
          <Text style={styles.consultationButtonText}>Book Your Consultation Now</Text>
          <Text style={styles.consultationButtonArrow}>↗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderExpertiseSection = () => (
    <View style={styles.expertiseSection}>
      <Text style={styles.sectionTitle}>Our Expertise</Text>
      <Text style={styles.sectionSubtitle}>
        Luxury, comfort, and functionality spaces your guests will always remember
      </Text>
      <View style={styles.expertiseGrid}>
        <View style={styles.expertiseItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop' }} 
            style={styles.expertiseImage} 
          />
          <View style={styles.expertiseBadge}>
            <Text style={styles.expertiseLabel}>Hotels</Text>
          </View>
        </View>
        <View style={styles.expertiseItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop' }} 
            style={styles.expertiseImage} 
          />
          <View style={styles.expertiseBadge}>
            <Text style={styles.expertiseLabel}>Restaurants & Cafés</Text>
          </View>
        </View>
        <View style={styles.expertiseItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop' }} 
            style={styles.expertiseImage} 
          />
          <View style={styles.expertiseBadge}>
            <Text style={styles.expertiseLabel}>Resorts</Text>
          </View>
        </View>
        <View style={styles.expertiseItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop' }} 
            style={styles.expertiseImage} 
          />
          <View style={styles.expertiseBadge}>
            <Text style={styles.expertiseLabel}>Event Spaces</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCreativeSolutionsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Creative Solutions by Professional</Text>
      <Text style={styles.sectionSubtitle}>
        We believe great design is a balance of creativity and expertise. Professional transforms ordinary spaces into extraordinary experiences functional, stylish, and tailored to your needs.
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>53k</Text>
          <Text style={styles.statLabel}>Happy Clients</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>10k</Text>
          <Text style={styles.statLabel}>Projects Done</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>120</Text>
          <Text style={styles.statLabel}>Get Award</Text>
        </View>
      </View>
    </View>
  );

  const renderServicesSection = () => (
    <View style={styles.servicesSection}>
      <View style={styles.servicesHeader}>
        <Text style={styles.servicesSectionTitle}>Our Services</Text>
        <Text style={styles.servicesSectionSubtitle}>
          Bridging you with talented interior designers for perfect spaces.
        </Text>
      </View>
      
      <View style={styles.servicesGridContainer}>
        {/* Services Grid - 2 columns, 4 boxes total */}
        <View style={styles.servicesGrid}>
          {/* Service Card 1 */}
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
              <View style={styles.serviceNumberBadge}>
                <Text style={styles.serviceNumber}>01</Text>
              </View>
              <Text style={styles.serviceCardTitle}>Hotel Design & Interiors</Text>
              <Text style={styles.serviceCardDescription}>
                Creating memorable experiences through elegant and functional hotel spaces
              </Text>
              <View style={styles.serviceCardAction}>
                <Text style={styles.serviceCardArrow}>Explore →</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Service Card 2 */}
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
              <View style={styles.serviceNumberBadge}>
                <Text style={styles.serviceNumber}>02</Text>
              </View>
              <Text style={styles.serviceCardTitle}>Restaurant & Café Design</Text>
              <Text style={styles.serviceCardDescription}>
                Designing dining spaces that enhance the culinary experience and ambiance.
              </Text>
              <View style={styles.serviceCardAction}>
                <Text style={styles.serviceCardArrow}>Explore →</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Service Card 3 */}
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
              <View style={styles.serviceNumberBadge}>
                <Text style={styles.serviceNumber}>03</Text>
              </View>
              <Text style={styles.serviceCardTitle}>Resort & Spa Design</Text>
              <Text style={styles.serviceCardDescription}>
                Tranquil and luxurious spaces that promote relaxation and wellness.
              </Text>
              <View style={styles.serviceCardAction}>
                <Text style={styles.serviceCardArrow}>Explore →</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Service Card 4 */}
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
              <View style={styles.serviceNumberBadge}>
                <Text style={styles.serviceNumber}>04</Text>
              </View>
              <Text style={styles.serviceCardTitle}>Event Space Design</Text>
              <Text style={styles.serviceCardDescription}>
                Versatile and stunning spaces for memorable events and gatherings.
              </Text>
              <View style={styles.serviceCardAction}>
                <Text style={styles.serviceCardArrow}>Explore →</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHowWeWorkSection = () => (
    <View style={styles.howWeWorkSection}>
      <Text style={styles.sectionTitle}>How we Work</Text>
      <View style={styles.stepsContainer}>
        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>01</Text>
          <Text style={styles.stepTitle}>Consultation</Text>
          <Text style={styles.stepDescription}>
            We understand your vision, goals, and brand to create a tailored concept.
          </Text>
        </View>
        <View style={[styles.stepCard, styles.stepCardActive]}>
          <Text style={styles.stepNumberActive}>02</Text>
          <Text style={styles.stepTitleActive}>Design & Planning</Text>
          <Text style={styles.stepDescriptionActive}>
            Layouts, material selection, and 3D visualizations to bring your concept to life.
          </Text>
        </View>
        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>03</Text>
          <Text style={styles.stepTitle}>Execution & Delivery</Text>
          <Text style={styles.stepDescription}>
            Our team ensures flawless implementation, on time and within budget.
          </Text>
        </View>
      </View>
    </View>
  );

  const renderTestimonialsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What Clients Say</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.testimonialCarousel}
      >
        <View style={styles.testimonialCard}>
          <Text style={styles.testimonialQuoteMark}>"</Text>
          <Text style={styles.testimonialQuote}>
            Working with your design team was an absolute pleasure. The attention to detail and creativity exceeded my expectations. Thank you for making my home beautiful!
          </Text>
          <View style={styles.testimonialClientRow}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }} 
              style={styles.testimonialAvatar} 
            />
            <View>
              <Text style={styles.testimonialName}>Sophie Carter</Text>
              <Text style={styles.testimonialLocation}>New York, USA</Text>
            </View>
          </View>
        </View>
        <View style={styles.testimonialCard}>
          <Text style={styles.testimonialQuoteMark}>"</Text>
          <Text style={styles.testimonialQuote}>
            Working with your design team was an absolute pleasure. The attention to detail and creativity exceeded my expectations. Thank you for making my home beautiful!
          </Text>
          <View style={styles.testimonialClientRow}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }} 
              style={styles.testimonialAvatar} 
            />
            <View>
              <Text style={styles.testimonialName}>Sophie Carter</Text>
              <Text style={styles.testimonialLocation}>New York, USA</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.testimonialNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderHeroSection()}
      {renderExpertiseSection()}
      {renderServicesSection()}
      {renderCreativeSolutionsSection()}
      {renderHowWeWorkSection()}
      {renderTestimonialsSection()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    height: 400,
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitleLine1: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    textAlign: 'center',
    lineHeight: 40,
  },
  heroTitleLine2: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 40,
  },
  consultationButton: {
    backgroundColor: '#FF6F61',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  consultationButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    marginRight: 8,
  },
  consultationButtonArrow: {
    color: Colors.textWhite,
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginBottom: 0,
    backgroundColor: Colors.background,
  },
  expertiseSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginBottom: 0,
    backgroundColor: Colors.backgroundSecondary,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'left',
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'left',
  },
  expertiseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  expertiseItem: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  expertiseImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  expertiseBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  expertiseLabel: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.textWhite,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: '#2E8B8B',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },
  howWeWorkSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginBottom: 0,
    backgroundColor: Colors.backgroundSecondary,
  },
  stepsContainer: {
    marginTop: 20,
  },
  stepCard: {
    width: '100%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 24,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  stepCardActive: {
    backgroundColor: '#2E8B8B',
  },
  stepNumber: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  stepNumberActive: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 10,
    textAlign: 'left',
  },
  stepTitleActive: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 10,
    textAlign: 'left',
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
    textAlign: 'left',
  },
  stepDescriptionActive: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    lineHeight: 20,
    textAlign: 'left',
  },
  testimonialCarousel: {
    paddingRight: 20,
    marginBottom: 20,
  },
  testimonialCard: {
    width: 300,
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 20,
    marginRight: 16,
  },
  testimonialQuoteMark: {
    fontSize: 48,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    lineHeight: 48,
    marginBottom: -10,
  },
  testimonialQuote: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    lineHeight: 20,
    marginBottom: 18,
  },
  testimonialClientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  testimonialName: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 4,
  },
  testimonialLocation: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
  },
  testimonialNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  navButtonText: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
  },
  servicesSection: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  servicesHeader: {
    marginBottom: 40,
  },
  servicesSectionTitle: {
    fontSize: 36,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'left',
    letterSpacing: -0.5,
  },
  servicesSectionSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 24,
    textAlign: 'left',
    maxWidth: '85%',
  },
  servicesGridContainer: {
    width: '100%',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  serviceCardContent: {
    padding: 20,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  serviceNumberBadge: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  serviceNumber: {
    fontSize: 48,
    fontFamily: Fonts.bold,
    color: '#F5F5F5',
    lineHeight: 56,
    letterSpacing: -2,
  },
  serviceCardTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
    lineHeight: 26,
    textAlign: 'left',
  },
  serviceCardDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'left',
  },
  serviceCardAction: {
    alignSelf: 'flex-start',
  },
  serviceCardArrow: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: '#FF6F61',
    textAlign: 'left',
  },
});

export default HospitalityScreen;
