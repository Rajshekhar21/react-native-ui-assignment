import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

const { width } = Dimensions.get('window');

type CommercialScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Commercial'
>;

interface Props {
  navigation: CommercialScreenNavigationProp;
}

const CommercialScreen: React.FC<Props> = ({ navigation }) => {
  const handleSubmit = () => {
    console.log('Book consultation');
  };

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&auto=format&fit=crop' }}
        style={styles.heroImage}
        imageStyle={styles.heroImageStyle}
      >
        <View style={styles.heroContentBox}>
          <Text style={styles.heroTitle}>
            YOUR <Text style={styles.highlightText}>GATEWAY</Text> TO{'\n'}
            COMMERCIAL EXCELLENCE
          </Text>
          <Text style={styles.heroDescription}>
            we provide strategic solutions to help you acquire, develop, and manage properties for business growth.
          </Text>
          <TouchableOpacity style={styles.consultationButton} onPress={handleSubmit}>
            <Text style={styles.consultationButtonText}>Book Your Consultation Now</Text>
            <Text style={styles.consultationButtonArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );

  const renderGallerySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Gallery</Text>
      <Text style={styles.sectionSubtitle}>
        Discover the perfect piece for your home or office.
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryContainer}>
        <View style={styles.galleryItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop' }} 
            style={styles.galleryImage} 
          />
          <View style={styles.galleryOverlay}>
            <Text style={styles.galleryTitle}>The Serene Sanctuary</Text>
            <Text style={styles.gallerySubtitle}>A tranquil haven of timeless design</Text>
            <TouchableOpacity style={styles.moreDetailsButton}>
              <Text style={styles.moreDetailsText}>MORE DETAILS →</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.galleryItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop' }} 
            style={styles.galleryImage} 
          />
          <View style={styles.galleryOverlay}>
            <Text style={styles.galleryTitle}>The Timeless Oasis</Text>
            <TouchableOpacity style={styles.moreDetailsButton}>
              <Text style={styles.moreDetailsText}>MORE DETAILS →</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.galleryItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop' }} 
            style={styles.galleryImage} 
          />
          <View style={styles.galleryOverlay}>
            <Text style={styles.galleryTitle}>The Tian</Text>
            <TouchableOpacity style={styles.moreDetailsButton}>
              <Text style={styles.moreDetailsText}>MORE DETAILS →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
              <Text style={styles.serviceCardTitle}>Office Design & Fit-Outs</Text>
              <Text style={styles.serviceCardDescription}>
                Stylish, functional workspaces that boost productivity
              </Text>
              <View style={styles.serviceCardAction}>
                <Text style={styles.serviceNumberSmall}>01</Text>
                <Text style={styles.serviceCardArrow}>→</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Service Card 2 */}
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
              <View style={styles.serviceNumberBadge}>
                <Text style={styles.serviceNumber}>02</Text>
              </View>
              <Text style={styles.serviceCardTitle}>Furniture Procurement</Text>
              <Text style={styles.serviceCardDescription}>
                Layouts and displays that attract and engage customers.
              </Text>
              <View style={styles.serviceCardAction}>
                <Text style={styles.serviceNumberSmall}>02</Text>
                <Text style={styles.serviceCardArrow}>→</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Service Card 3 */}
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
              <View style={styles.serviceNumberBadge}>
                <Text style={styles.serviceNumber}>03</Text>
              </View>
              <Text style={styles.serviceCardTitle}>Corporate Branding Spaces</Text>
              <Text style={styles.serviceCardDescription}>
                Interiors reflecting your brand, leaving a lasting impact.
              </Text>
              <View style={styles.serviceCardAction}>
                <Text style={styles.serviceNumberSmall}>03</Text>
                <Text style={styles.serviceCardArrow}>→</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Service Card 4 */}
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
              <View style={styles.serviceNumberBadge}>
                <Text style={styles.serviceNumber}>04</Text>
              </View>
              <Text style={styles.serviceCardTitle}>Co-working & Shared Spaces</Text>
              <Text style={styles.serviceCardDescription}>
                Flexible designs for collaboration and comfort.
              </Text>
              <View style={styles.serviceCardAction}>
                <Text style={styles.serviceNumberSmall}>04</Text>
                <Text style={styles.serviceCardArrow}>→</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Service Card 5 */}
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
              <View style={styles.serviceNumberBadge}>
                <Text style={styles.serviceNumber}>05</Text>
              </View>
              <Text style={styles.serviceCardTitle}>Furniture Procurement</Text>
              <Text style={styles.serviceCardDescription}>
                Layouts and displays that attract and engage customers.
              </Text>
              <View style={styles.serviceCardAction}>
                <Text style={styles.serviceNumberSmall}>05</Text>
                <Text style={styles.serviceCardArrow}>→</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.servicesImageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop' }} 
          style={styles.servicesImage} 
        />
      </View>
    </View>
  );

  const renderDesignersSection = () => (
    <View style={styles.designersSection}>
      <Text style={styles.designersTitle}>Designers for the Future of Your Business</Text>
      <Text style={styles.designersDescription}>
        Transform your commercial space with expert designers who craft environments that attract and engage clients.
      </Text>
      <View style={styles.designersGrid}>
        <View style={styles.designerGridItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop' }} 
            style={styles.designerGridImage} 
          />
        </View>
        <View style={styles.designerGridItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop' }} 
            style={styles.designerGridImage} 
          />
        </View>
        <View style={styles.designerGridItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop' }} 
            style={styles.designerGridImage} 
          />
        </View>
        <View style={styles.designerGridItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop' }} 
            style={styles.designerGridImage} 
          />
        </View>
      </View>
    </View>
  );

  const renderVisionSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your Vision, Our Designers A Collaborative Approach to Luxury</Text>
      <Text style={styles.sectionSubtitle}>
        Designers craft spaces that anticipate our needs and appeal to our emotions while pulling from a broad set of skills and technical knowledge. Interior design has changed dramatically
      </Text>
      <View style={styles.visionImages}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop' }} 
          style={styles.visionImage1} 
        />
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop' }} 
          style={styles.visionImage2} 
        />
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop' }} 
          style={styles.visionImage3} 
        />
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop' }} 
          style={styles.visionImage4} 
        />
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5K+</Text>
          <Text style={styles.statLabel}>Designers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1000+</Text>
          <Text style={styles.statLabel}>Happy customers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>65+</Text>
          <Text style={styles.statLabel}>Award Winning</Text>
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
        contentContainerStyle={styles.testimonialsContainer}
      >
        <View style={styles.testimonialCard}>
          <Text style={styles.quoteIcon}>"</Text>
          <Text style={styles.testimonialText}>
            Working with your design team was an absolute pleasure. The attention to detail and creativity exceeded my expectations. Thank you for making my home beautiful!
          </Text>
          <View style={styles.clientInfo}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }} 
              style={styles.clientImage} 
            />
            <View style={styles.clientDetails}>
              <Text style={styles.clientName}>Sophie Carter</Text>
              <Text style={styles.clientLocation}>New York, USA</Text>
            </View>
          </View>
        </View>
        <View style={styles.testimonialCard}>
          <Text style={styles.quoteIcon}>"</Text>
          <Text style={styles.testimonialText}>
            The commercial space transformation was incredible. Professional, creative, and delivered exactly what we envisioned.
          </Text>
          <View style={styles.clientInfo}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }} 
              style={styles.clientImage} 
            />
            <View style={styles.clientDetails}>
              <Text style={styles.clientName}>Michael Johnson</Text>
              <Text style={styles.clientLocation}>Los Angeles, USA</Text>
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
      {renderGallerySection()}
      {renderServicesSection()}
      {renderDesignersSection()}
      {renderVisionSection()}
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
  },
  heroImageStyle: {
    resizeMode: 'cover',
  },
  heroContentBox: {
    position: 'absolute',
    left: 20,
    top: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 24,
    maxWidth: '75%',
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
    lineHeight: 32,
  },
  highlightText: {
    color: '#2E8B8B',
  },
  heroDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 20,
  },
  consultationButton: {
    backgroundColor: '#2E8B8B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  consultationButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    marginRight: 8,
  },
  consultationButtonArrow: {
    color: Colors.textWhite,
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 40,
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
  galleryContainer: {
    marginBottom: 20,
  },
  galleryItem: {
    width: 300,
    marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  galleryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
  },
  galleryTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 5,
    textAlign: 'left',
  },
  gallerySubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
    marginBottom: 10,
    textAlign: 'left',
  },
  moreDetailsButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.textWhite,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  moreDetailsText: {
    color: Colors.textWhite,
    fontSize: 12,
    fontFamily: Fonts.semiBold,
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
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  serviceNumberSmall: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  serviceCardArrow: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: '#FF6F61',
  },
  servicesImageContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  servicesImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  imageCard: {
    padding: 0,
    backgroundColor: '#000000',
  },
  serviceCardImage: {
    width: '100%',
    height: '100%',
    minHeight: 240,
    resizeMode: 'cover',
  },
  imageCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 24,
  },
  imageCardText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  designersSection: {
    backgroundColor: '#000000',
    paddingVertical: 60,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  designersTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 16,
    lineHeight: 36,
    textAlign: 'left',
  },
  designersDescription: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'left',
  },
  designersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  designerGridItem: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  designerGridImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  visionImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  visionImage1: {
    width: '48%',
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  visionImage2: {
    width: '48%',
    height: 115,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  visionImage3: {
    width: '48%',
    height: 115,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  visionImage4: {
    width: '48%',
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: 'cover',
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
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  testimonialsContainer: {
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
  quoteIcon: {
    fontSize: 48,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    lineHeight: 48,
    marginBottom: -10,
  },
  testimonialText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    lineHeight: 20,
    marginBottom: 18,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 4,
  },
  clientLocation: {
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
});

export default CommercialScreen;
