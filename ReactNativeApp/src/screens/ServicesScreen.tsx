import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

const { width } = Dimensions.get('window');

type ServicesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Services'
>;

interface Props {
  navigation: ServicesScreenNavigationProp;
}

const ServicesScreen: React.FC<Props> = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop' }}
        style={styles.heroImage}
      />
      <View style={styles.heroOverlay}>
        <TouchableOpacity style={styles.consultationButton}>
          <Text style={styles.consultationButtonText}>Book Your Consultation Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderServiceCategories = () => (
    <View style={styles.section}>
      <View style={styles.serviceGrid}>
        <TouchableOpacity 
          style={styles.serviceCard}
          onPress={() => navigation.navigate('Residential')}
        >
          <Image 
            source={require('../../assets/images/homenavicon.png')}
            style={styles.serviceIconImg}
            resizeMode="contain"
          />
          <Text style={styles.serviceTitle}>Residential</Text>
          <Text style={styles.serviceDescription}>
            Personalized home designs that bring comfort, style, and functionality together.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.serviceCard}
          onPress={() => navigation.navigate('Hospitality')}
        >
          <Image 
            source={require('../../assets/images/hospitalityicon.png')}
            style={styles.serviceIconImg}
            resizeMode="contain"
          />
          <Text style={styles.serviceTitle}>Hospitality</Text>
          <Text style={styles.serviceDescription}>
            Elegant, inviting spaces for hotels, resorts, and restaurants that create lasting impressions.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.serviceCard}
          onPress={() => navigation.navigate('Commercial')}
        >
          <Image 
            source={require('../../assets/images/commercialicon.png')}
            style={styles.serviceIconImg}
            resizeMode="contain"
          />
          <Text style={styles.serviceTitle}>Commercial</Text>
          <Text style={styles.serviceDescription}>
            Smart and efficient Interiors designed to enhance productivity and brand presence.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.serviceCard}
          onPress={() => navigation.navigate('Turnkey')}
        >
          <Image 
            source={require('../../assets/images/turnkeyicon.png')}
            style={styles.serviceIconImg}
            resizeMode="contain"
          />
          <Text style={styles.serviceTitle}>Turnkey</Text>
          <Text style={styles.serviceDescription}>
            Complete end-to-end solutions from concept to delivery stress-free and seamless.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRecentWork = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Work</Text>
      <Text style={styles.sectionSubtitle}>
        A showcase of our latest projects and creative designs.
      </Text>
      <View style={styles.workGrid}>
        {/* Top row: 3 equal cards */}
        <View style={styles.workRow}>
          <View style={styles.workItemSmall}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=400&h=400&fit=crop' }} 
              style={styles.workImageSmall} 
            />
            <View style={styles.workBadge}><Text style={styles.workBadgeText}>Civil Work</Text></View>
          </View>
          <View style={styles.workItemSmall}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop' }} 
              style={styles.workImageSmall} 
            />
            <View style={styles.workBadge}><Text style={styles.workBadgeText}>Smart Home Solutions</Text></View>
          </View>
          <View style={styles.workItemSmall}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop' }} 
              style={styles.workImageSmall} 
            />
            <View style={styles.workBadge}><Text style={styles.workBadgeText}>Flooring</Text></View>
          </View>
        </View>

        {/* Second row: large left + tall right */}
        <View style={styles.workRow}>
          <View style={styles.workItemLarge}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=800&h=600&fit=crop' }} 
              style={styles.workImageLarge} 
            />
            <View style={styles.workBadge}><Text style={styles.workBadgeText}>Countertop Solutions</Text></View>
          </View>
          <View style={styles.workItemTall}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=800&fit=crop' }} 
              style={styles.workImageTall} 
            />
            <View style={styles.workBadge}><Text style={styles.workBadgeText}>Demolition</Text></View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderGallerySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Gallery of Luxury Interior</Text>
      <Text style={styles.sectionSubtitle}>
        Interior design is the art and science of enhancing the interior spaces of buildings to achieve a more functional.
      </Text>
      <View style={styles.galleryContainer}>
        {/* Dynamic mosaic layout - Row 1 */}
        <View style={styles.galleryRow}>
          <View style={styles.galleryItemLarge}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=800&fit=crop' }} 
              style={[styles.galleryImage, styles.galleryImageTall]}
            />
          </View>
          <View style={styles.galleryItemMedium}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&h=600&fit=crop' }} 
              style={[styles.galleryImage, styles.galleryImageMedium]}
            />
          </View>
          <View style={styles.galleryItemSmall}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=800&fit=crop' }} 
              style={[styles.galleryImage, styles.galleryImageShort]}
            />
          </View>
        </View>
        
        {/* Row 2 - Mosaic */}
        <View style={styles.galleryRow}>
          <View style={styles.galleryItemMedium}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1582582494700-7b7a90bf34e6?w=800&h=800&fit=crop' }} 
              style={[styles.galleryImage, styles.galleryImageSquare]}
            />
          </View>
          <View style={styles.galleryItemLarge}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=1200&h=800&fit=crop' }} 
              style={[styles.galleryImage, styles.galleryImageMedium]}
            />
          </View>
          <View style={styles.galleryItemSmall}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop' }} 
              style={[styles.galleryImage, styles.galleryImageShort]}
            />
          </View>
        </View>
        
        {/* Row 3 - Mosaic */}
        <View style={styles.galleryRow}>
          <View style={styles.galleryItemSmall}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1600566753190-17f0baa2c5f3?w=600&h=800&fit=crop' }} 
              style={[styles.galleryImage, styles.galleryImageTall]}
            />
          </View>
          <View style={styles.galleryItemMedium}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&h=600&fit=crop' }} 
              style={[styles.galleryImage, styles.galleryImageMedium]}
            />
          </View>
          <View style={styles.galleryItemLarge}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1582582494700-7b7a90bf34e6?w=1200&h=1000&fit=crop' }} 
              style={[styles.galleryImage, styles.galleryImageTall]}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderAboutSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About Us</Text>
      <Text style={styles.sectionSubtitle}>
        Designing spaces that inspire, comfort, and reflect your style.
      </Text>
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' }} 
        style={styles.aboutImage} 
      />
      <View style={styles.accordionContainer}>
        {[0, 1, 2].map((index) => (
          <TouchableOpacity 
            key={index}
            style={styles.accordionItem}
            onPress={() => toggleSection(index)}
          >
            <Text style={styles.accordionTitle}>Crafting Timeless Spaces</Text>
            <Text style={styles.accordionArrow}>
              {expandedSections.includes(index) ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTestimonials = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What People Thinks</Text>
      <Text style={styles.sectionSubtitle}>
        Real stories from clients who transformed their spaces with us.
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.testimonialsCarousel}
        snapToAlignment="start"
        decelerationRate="fast"
      >
        <View style={[styles.testimonialCard, styles.testimonialCardWide]}>
          <View style={styles.testimonialHeader}>
            <Image
              source={require('../../assets/images/Group.png')}
              style={styles.quoteImg}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.testimonialName}>Akash</Text>
              <Text style={styles.testimonialTitle}>UI/UX Designer</Text>
            </View>
          </View>
          <Text style={styles.testimonialText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <View style={[styles.testimonialCard, styles.testimonialCardWide]}>
          <View style={styles.testimonialHeader}>
            <Image
              source={require('../../assets/images/Group.png')}
              style={styles.quoteImg}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.testimonialName}>Akash</Text>
              <Text style={styles.testimonialTitle}>UI/UX Designer</Text>
            </View>
          </View>
          <Text style={styles.testimonialText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </ScrollView>
    </View>
  );

  const renderContactSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Let's connect</Text>
      <Text style={styles.sectionSubtitle}>
        We connect you with top interior designers to create spaces that match your style, needs, and budget.
      </Text>
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' }} 
        style={styles.contactImage} 
      />
      <View style={styles.formContainer}>
        <View style={styles.formRow}>
          <TextInput
            style={[styles.formInput, styles.halfInput]}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />
          <TextInput
            style={[styles.formInput, styles.halfInput]}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />
        </View>
        <TextInput
          style={styles.formInput}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.formInput}
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.formInput, styles.messageInput]}
          placeholder="Message"
          value={formData.message}
          onChangeText={(value) => handleInputChange('message', value)}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send it to the moon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderHeroSection()}
      {renderServiceCategories()}
      {renderRecentWork()}
      {renderGallerySection()}
      {renderAboutSection()}
      {renderTestimonials()}
      {renderContactSection()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    padding: 20,
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 32,
  },
  heroOverlay: {
    position: 'absolute',
    margin: 10,
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
  },
  consultationButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    maxWidth: 250,
    alignSelf: 'center',
  },
  consultationButtonText: {
    color: Colors.textWhite,
    fontSize: 15,
    fontFamily: Fonts.bold,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'left',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'flex-start',
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  serviceIconImg: {
    width: 28,
    height: 28,
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'left',
  },
  serviceDescription: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 18,
    textAlign: 'left',
  },
  workGrid: {
    width: '100%',
  },
  workRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  workItemSmall: {
    width: '31%',
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  workImageSmall: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  workItemLarge: {
    width: '66%',
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  workImageLarge: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  workItemTall: {
    width: '31%',
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  workImageTall: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  workBadge: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  workBadgeText: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  galleryContainer: {
    width: '100%',
  },
  galleryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  galleryItemLarge: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryItemMedium: {
    width: '31%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryItemSmall: {
    width: '18%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  galleryImageTall: {
    height: 240,
  },
  galleryImageMedium: {
    height: 180,
  },
  galleryImageShort: {
    height: 140,
  },
  galleryImageSquare: {
    height: 200,
  },
  aboutImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  accordionContainer: {
    marginTop: 10,
  },
  accordionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  accordionTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  accordionArrow: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  testimonialsCarousel: {
    paddingVertical: 20,
    width: '100%',
  },
  testimonialCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testimonialCardWide: {
    width: '75%',
    marginRight: 16,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quoteImg: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  testimonialName: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  testimonialTitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  testimonialText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  contactImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  formContainer: {
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formInput: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  halfInput: {
    width: '48%',
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});

export default ServicesScreen;
