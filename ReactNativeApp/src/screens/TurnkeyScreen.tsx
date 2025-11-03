import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

type TurnkeyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Turnkey'
>;

interface Props {
  navigation: TurnkeyScreenNavigationProp;
}

const HERO_STATS = [
  { value: '45+', label: 'Turnkey homes delivered' },
  { value: '90 days', label: 'Average project timeline' },
  { value: '35+', label: 'Certified trade partners' },
];

const TESTIMONIALS = [
  {
    quote:
      'We moved into a fully finished apartment exactly on schedule. Weekly progress decks kept every decision transparent.',
    name: 'Aditi & Rohan Sharma',
    location: 'Bengaluru',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&auto=format&fit=crop',
    role: '3BHK remodel',
  },
  {
    quote:
      'Their vendors, carpenter crew and styling team worked like clockwork. We simply approved designs and handed over the keys.',
    name: 'Priya Menon',
    location: 'Hyderabad',
    avatar:
      'https://images.unsplash.com/photo-1524635962361-d7f8ae9c79b1?w=200&h=200&auto=format&fit=crop',
    role: 'Penthouse turnkey',
  },
  {
    quote:
      'Budget tracking, quality control and handover were exceptional. The snag list was closed within 48 hours.',
    name: 'Rahul Bhandari',
    location: 'Pune',
    avatar:
      'https://images.unsplash.com/photo-1504595403659-9088ce801e29?w=200&h=200&auto=format&fit=crop',
    role: 'Villa interiors',
  },
];

const TurnkeyScreen: React.FC<Props> = ({ navigation }) => {
  const handleSubmit = () => {
    console.log('Book consultation');
  };

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&h=900&auto=format&fit=crop',
        }}
        style={styles.heroImage}
        imageStyle={styles.heroImageStyle}
      >
        <View style={styles.heroContentBox}>
          <Text style={styles.heroTitle}>TURN THE KEY TO PERFECTION</Text>
          <Text style={styles.heroDescription}>
            from concept to completion, we deliver seamless turnkey interiors with precision and care.
          </Text>
          <TouchableOpacity style={styles.heroButton} onPress={handleSubmit}>
            <Text style={styles.heroButtonText}>Book Your Consultation Now</Text>
            <Text style={styles.heroButtonArrow}>↗</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );

  const renderHowWeWorkSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>How we Work</Text>
      <Text style={styles.sectionSubtitle}>
        Turning your ideas into flawless interiors.
      </Text>
      <View style={styles.stepsContainer}>
        <View style={styles.stepCard}>
          <Image 
            source={require('../../assets/images/consulation.png')} 
            style={styles.stepIconImage}
            resizeMode="contain"
          />
          <Text style={styles.stepTitle}>Consultation</Text>
          <Text style={styles.stepDescription}>
            We understand your vision, lifestyle, and needs.
          </Text>
        </View>
        <View style={styles.stepCard}>
          <Image 
            source={require('../../assets/images/concept&design.png')} 
            style={styles.stepIconImage}
            resizeMode="contain"
          />
          <Text style={styles.stepTitle}>Concept & Design</Text>
          <Text style={styles.stepDescription}>
            Layouts, mood boards, and 3D visuals to shape your ideas.
          </Text>
        </View>
        <View style={styles.stepCard}>
          <Image 
            source={require('../../assets/images/planning&approval.png')} 
            style={styles.stepIconImage}
            resizeMode="contain"
          />
          <Text style={styles.stepTitle}>Planning & Approval</Text>
          <Text style={styles.stepDescription}>
            Finalizing designs, materials, and timelines with your input.
          </Text>
        </View>
        <View style={styles.stepCard}>
          <Image 
            source={require('../../assets/images/execution&management.png')} 
            style={styles.stepIconImage}
            resizeMode="contain"
          />
          <Text style={styles.stepTitle}>Execution & Management</Text>
          <Text style={styles.stepDescription}>
            On-site supervision, vendor coordination, and quality checks.
          </Text>
        </View>
        <View style={styles.stepCard}>
          <Image 
            source={require('../../assets/images/planning&approval.png')} 
            style={styles.stepIconImage}
            resizeMode="contain"
          />
          <Text style={styles.stepTitle}>Planning & Approval</Text>
          <Text style={styles.stepDescription}>
            Finalizing designs, materials, and timelines with your input.
          </Text>
        </View>
        <View style={[styles.stepCard, styles.handoverCard]}>
          <Image 
            source={require('../../assets/images/planning&approval.png')} 
            style={styles.handoverIconImage}
            resizeMode="contain"
          />
          <Text style={styles.handoverTitle}>Handover</Text>
          <Text style={styles.handoverDescription}>
            Your fully finished, ready-to-use space delivered on time.
          </Text>
        </View>
      </View>
      <View style={styles.servicesInfo}>
        <Text style={styles.servicesTitle}>Services provided by us</Text>
        <Text style={styles.servicesDescription}>
          We have been providing great flooring solutions service.
        </Text>
      </View>
    </View>
  );

  const renderFeaturedProjectsSection = () => (
    <View style={styles.projectsSection}>
      <Text style={styles.projectsTitle}>Our Featured projects</Text>
      <Text style={styles.projectsSubtitle}>
        Discover our exceptional projects. Each one a testament to our commitment to excellence in interior design. Get inspired for your own space.
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.projectsContainer}>
        <View style={styles.projectCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' }} 
            style={styles.projectImage} 
          />
          <View style={styles.projectInfo}>
            <Text style={styles.projectTitle}>Resort</Text>
            <Text style={styles.projectSubtitle}>Furniture Selection • South Jakarta</Text>
          </View>
        </View>
        <View style={styles.projectCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' }} 
            style={styles.projectImage} 
          />
          <View style={styles.projectInfo}>
            <Text style={styles.projectTitle}>Luxury Villa</Text>
            <Text style={styles.projectSubtitle}>Complete Interior Design • Bali</Text>
          </View>
        </View>
        <View style={styles.projectCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' }} 
            style={styles.projectImage} 
          />
          <View style={styles.projectInfo}>
            <Text style={styles.projectTitle}>Modern Office</Text>
            <Text style={styles.projectSubtitle}>Corporate Design • Jakarta</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.projectNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTestimonialsSection = () => (
    <View style={styles.testimonialsSection}>
      <Text style={styles.sectionTitle}>What Clients Say</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.testimonialCarousel}
      >
        {TESTIMONIALS.map(testimonial => (
          <View key={testimonial.name} style={styles.testimonialCard}>
            <Text style={styles.testimonialQuoteMark}>"</Text>
            <Text style={styles.testimonialQuote}>{testimonial.quote}</Text>
            <View style={styles.testimonialClientRow}>
              <Image source={{ uri: testimonial.avatar }} style={styles.testimonialAvatar} />
              <View>
                <Text style={styles.testimonialName}>{testimonial.name}</Text>
                <Text style={styles.testimonialMeta}>{testimonial.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.testimonialNav}>
        <TouchableOpacity style={styles.testimonialNavButton}>
          <Text style={styles.testimonialNavButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.testimonialNavButton}>
          <Text style={styles.testimonialNavButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderHeroSection()}
      {renderHowWeWorkSection()}
      {renderFeaturedProjectsSection()}
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
    marginBottom: 0,
  },
  heroImage: {
    height: 400,
    width: '100%',
  },
  heroImageStyle: {
    resizeMode: 'cover',
  },
  heroContentBox: {
    position: 'absolute',
    left: 20,
    top: 60,
    backgroundColor: 'rgba(60, 60, 60, 0.85)',
    borderRadius: 16,
    padding: 24,
    maxWidth: '75%',
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    lineHeight: 32,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  heroDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    lineHeight: 20,
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  heroButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    marginRight: 8,
  },
  heroButtonArrow: {
    color: Colors.textWhite,
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.backgroundSecondary,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
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
  stepsContainer: {
    marginBottom: 30,
  },
  stepCard: {
    width: '100%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  stepIconImage: {
    width: 30,
    height: 30,
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 16,
    textAlign: 'center',
  },
  handoverCard: {
    backgroundColor: '#2E8B8B',
    marginTop: 8,
  },
  handoverIconImage: {
    width: 30,
    height: 30,
    marginBottom: 12,
    tintColor: Colors.textWhite,
  },
  handoverTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 6,
    textAlign: 'center',
  },
  handoverDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    lineHeight: 16,
    textAlign: 'center',
  },
  servicesInfo: {
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 20,
  },
  servicesTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  servicesDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  projectsSection: {
    backgroundColor: '#000000',
    paddingVertical: 60,
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  projectsTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 16,
    textAlign: 'left',
  },
  projectsSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'left',
  },
  projectsContainer: {
    marginBottom: 20,
  },
  projectCard: {
    width: 300,
    marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  projectInfo: {
    backgroundColor: '#333333',
    padding: 15,
  },
  projectTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 5,
  },
  projectSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
  },
  projectNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  navButtonText: {
    fontSize: 18,
    color: Colors.textWhite,
  },
  testimonialsSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.backgroundSecondary,
    marginBottom: 0,
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
  },
  testimonialMeta: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
    marginTop: 4,
  },
  testimonialNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  testimonialNavButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  testimonialNavButtonText: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
  },
});

export default TurnkeyScreen;
