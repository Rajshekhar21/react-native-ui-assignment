import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

type ResidentialScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Residential'
>;

interface Props {
  navigation: ResidentialScreenNavigationProp;
}

const HERO_STATS = [
  { value: '400+', label: 'Homes transformed' },
  { value: '4.9/5', label: 'Client satisfaction' },
  { value: '30+', label: 'Design specialists' },
];

const DESIGN_PILLARS = [
  {
    icon: '🧭',
    title: 'Space Planning',
    description: 'Optimised layouts that balance circulation, light, storage and aesthetics.',
  },
  {
    icon: '🎨',
    title: 'Material Library',
    description: 'Curated palettes of finishes, textures and statement accents for every room.',
  },
  {
    icon: '🗂️',
    title: 'Project Management',
    description: 'Dedicated experts managing vendors, timelines and budgets end to end.',
  },
];

const SIGNATURE_SERVICES = [
  {
    icon: '🏡',
    title: 'Full Home Makeover',
    description: 'Concept moodboards to final styling, executed with a single point of contact.',
  },
  {
    icon: '🍽️',
    title: 'Modular Kitchens',
    description: 'Ergonomic layouts, premium finishes and smart storage customised to your cooking style.',
  },
  {
    icon: '🪟',
    title: 'Wardrobes & Storage',
    description: 'Tailored storage solutions for bedrooms, foyers and utility spaces.',
  },
  {
    icon: '🛋️',
    title: 'Living Room Styling',
    description: 'Statement furniture, lighting and décor layered for daily living and entertaining.',
  },
  {
    icon: '🛠️',
    title: 'Renovation & Civil',
    description: 'False ceilings, flooring upgrades and civil works with technical supervision.',
  },
  {
    icon: '💡',
    title: 'Smart Lighting Plans',
    description: 'Layered lighting schemes with dimming and automation-ready fixtures.',
  },
];

const LOOKBOOK_ITEMS = [
  {
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&auto=format&fit=crop',
    label: 'Minimal luxe living',
  },
  {
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=800&auto=format&fit=crop',
    label: 'Warm neutral dining',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=800&auto=format&fit=crop',
    label: 'Serene master suite',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discover',
    description: 'In-home consultation to understand your lifestyle, floor plan and ambitions for the space.',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Interactive workshops, 3D renders and material sampling to refine every detail together.',
  },
  {
    step: '03',
    title: 'Deliver',
    description: 'On-site execution with weekly updates, quality checks and styling before the handover.',
  },
];

const TESTIMONIALS = [
  {
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&auto=format&fit=crop',
    name: 'Neha & Arjun',
    location: 'Bengaluru',
    quote:
      'They translated our Pinterest boards into a home that feels warm, organised and truly ours. The execution team was meticulous.',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1502767089025-6572583495b0?w=200&h=200&auto=format&fit=crop',
    name: 'Rishika Mehta',
    location: 'Mumbai',
    quote:
      'Loved the collaborative approach. Every design review felt thoughtful and the styling accents were the cherry on top.',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&auto=format&fit=crop',
    name: 'Anita Thomas',
    location: 'Delhi NCR',
    quote:
      'Transparent timelines, weekly updates and zero surprises on site. We recommend them to every friend renovating.',
  },
];

const ResidentialScreen: React.FC<Props> = ({ navigation }) => {
  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <View style={styles.heroImageWrapper}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=1400&h=900&auto=format&fit=crop',
          }}
          style={styles.heroImage}
          imageStyle={styles.heroImageStyle}
        >
          <LinearGradient
            colors={[
              'rgba(10, 10, 10, 0.78)',
              'rgba(10, 10, 10, 0.55)',
              'rgba(10, 10, 10, 0.25)',
            ]}
            style={styles.heroGradient}
          >
            <View>
              <Text style={styles.heroEyebrow}>Residential interiors</Text>
              <Text style={styles.heroTitle}>Elevated spaces tailored to how you live</Text>
              <Text style={styles.heroDescription}>
                Transform every corner of your home with curated design, smart planning and seamless execution by our in-house specialists.
              </Text>
              <TouchableOpacity
                style={styles.heroButton}
                onPress={() => navigation.navigate('CategoryList')}
              >
                <Text style={styles.heroButtonText}>Book your design consultation</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.heroStatsRow}>
              {HERO_STATS.map((stat, index) => (
                <View
                  key={stat.label}
                  style={[
                    styles.heroStatCard,
                    index === HERO_STATS.length - 1 && styles.heroStatCardLast,
                  ]}
                >
                  <Text style={styles.heroStatValue}>{stat.value}</Text>
                  <Text style={styles.heroStatLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );

  const renderDesignPillars = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What we perfect for every home</Text>
      <Text style={styles.sectionSubtitle}>
        From the first conversation to the final cushion fluff, every detail is designed around you.
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {DESIGN_PILLARS.map(pillar => (
          <View key={pillar.title} style={styles.pillarCard}>
            <LinearGradient
              colors={['#FFEFEA', '#FFFFFF']}
              style={styles.pillarBadge}
            >
              <Text style={styles.pillarIcon}>{pillar.icon}</Text>
            </LinearGradient>
            <Text style={styles.pillarTitle}>{pillar.title}</Text>
            <Text style={styles.pillarDescription}>{pillar.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderSignatureServices = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Signature services for every room</Text>
      <Text style={styles.sectionSubtitle}>
        A cohesive, end-to-end offering with specialists for kitchens, wardrobes, living spaces and turnkey renovations.
      </Text>
      <View style={styles.signatureServiceGrid}>
        {SIGNATURE_SERVICES.map(service => (
          <View key={service.title} style={styles.signatureServiceCard}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signatureServiceIconWrapper}
            >
              <Text style={styles.signatureServiceIcon}>{service.icon}</Text>
            </LinearGradient>
            <Text style={styles.signatureServiceTitle}>{service.title}</Text>
            <Text style={styles.signatureServiceDescription}>{service.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLookbook = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>A peek inside our latest homes</Text>
      <Text style={styles.sectionSubtitle}>
        Real projects, real families and layered interiors that balance functionality with beauty.
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {LOOKBOOK_ITEMS.map(item => (
          <View key={item.label} style={styles.lookbookCard}>
            <Image source={{ uri: item.image }} style={styles.lookbookImage} />
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
              style={styles.lookbookOverlay}
            >
              <Text style={styles.lookbookLabel}>{item.label}</Text>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderProcess = () => (
    <View style={styles.section}>
      <LinearGradient
        colors={['#1F1F1F', '#2C2C2C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.processContainer}
      >
        <Text style={styles.processTitle}>Design journey in three collaborative steps</Text>
        {PROCESS_STEPS.map(step => (
          <View key={step.step} style={styles.processRow}>
            <View style={styles.processStepBadge}>
              <Text style={styles.processStepText}>{step.step}</Text>
            </View>
            <View style={styles.processStepContent}>
              <Text style={styles.processStepTitle}>{step.title}</Text>
              <Text style={styles.processStepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </LinearGradient>
    </View>
  );

  const renderTestimonials = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Loved by homeowners across India</Text>
      <Text style={styles.sectionSubtitle}>
        Hear from families who trusted us with their dream home transformation.
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {TESTIMONIALS.map(testimonial => (
          <View key={testimonial.name} style={styles.testimonialCard}>
            <Text style={styles.testimonialQuote}>“{testimonial.quote}”</Text>
            <View style={styles.testimonialFooter}>
              <Image
                source={{ uri: testimonial.avatar }}
                style={styles.testimonialAvatar}
              />
              <View>
                <Text style={styles.testimonialName}>{testimonial.name}</Text>
                <Text style={styles.testimonialLocation}>{testimonial.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderCta = () => (
    <View style={styles.section}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ctaCard}
      >
        <Text style={styles.ctaTitle}>Ready to plan your home?</Text>
        <Text style={styles.ctaDescription}>
          Schedule a discovery call with our lead designer to review your floor plan, timelines and investment.
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('FindPros')}
        >
          <Text style={styles.ctaButtonText}>Connect with our team</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderHeroSection()}
      {renderDesignPillars()}
      {renderSignatureServices()}
      {renderLookbook()}
      {renderProcess()}
      {renderTestimonials()}
      {renderCta()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  heroImageWrapper: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  heroImage: {
    height: 360,
    justifyContent: 'flex-end',
  },
  heroImageStyle: {
    borderRadius: 32,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  heroEyebrow: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.textWhite,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    lineHeight: 34,
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 22,
    marginBottom: 20,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  heroButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  heroStatCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginRight: 12,
  },
  heroStatCardLast: {
    marginRight: 0,
  },
  heroStatValue: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: 'rgba(255,255,255,0.75)',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  horizontalScroll: {
    paddingRight: 20,
  },
  pillarCard: {
    width: 260,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  pillarBadge: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillarIcon: {
    fontSize: 24,
  },
  pillarTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  pillarDescription: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  signatureServiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  signatureServiceCard: {
    width: '48%',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  signatureServiceIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  signatureServiceIcon: {
    fontSize: 22,
    color: Colors.textWhite,
  },
  signatureServiceTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  signatureServiceDescription: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  lookbookCard: {
    width: 280,
    height: 200,
    borderRadius: 18,
    overflow: 'hidden',
    marginRight: 16,
  },
  lookbookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lookbookOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  lookbookLabel: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textWhite,
  },
  processContainer: {
    borderRadius: 24,
    padding: 24,
  },
  processTitle: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: Colors.textWhite,
    marginBottom: 20,
  },
  processRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  processStepBadge: {
    width: 48,
    height: 48,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  processStepText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
  },
  processStepContent: {
    flex: 1,
  },
  processStepTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textWhite,
    marginBottom: 6,
  },
  processStepDescription: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 18,
  },
  testimonialCard: {
    width: 260,
    padding: 20,
    borderRadius: 18,
    backgroundColor: Colors.background,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  testimonialQuote: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 18,
  },
  testimonialFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  testimonialName: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  testimonialLocation: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  ctaCard: {
    borderRadius: 24,
    padding: 24,
  },
  ctaTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 10,
  },
  ctaDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 20,
  },
  ctaButton: {
    marginTop: 18,
    backgroundColor: Colors.background,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
});

export default ResidentialScreen;
