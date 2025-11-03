import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

const { width } = Dimensions.get('window');

type PortfolioScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Portfolio'
>;

interface Props {
  navigation: PortfolioScreenNavigationProp;
}

const PortfolioScreen: React.FC<Props> = ({ navigation }) => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const testimonials = [
    {
      id: 1,
      name: 'Alex D.',
      role: 'Creative Director',
      rating: '4.5/5',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      abstractImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=300&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Emma V.',
      role: 'Founder',
      quote: 'Working with IDaFin felt effortless. They have a rare ability to take complex ideas and distill them into something beautifully simple.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    },
  ];

  const projects = [
    {
      id: 1,
      name: 'Lune',
      subtitle: 'Villas',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    },
  ];

  const insightProjects = [
    {
      id: 1,
      date: 'May 30, 2025',
      location: 'House | Mumbai',
      description: 'A look at how simplicity can sharpen communication, increase impact, and build longer-lasting brands.',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      tag: 'Insights',
    },
    {
      id: 2,
      date: 'April 15, 2025',
      location: 'Apartment | Delhi',
      description: 'A look at how simplicity can sharpen communication, increase impact, and build longer-lasting brands.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      tag: 'Insights',
    },
    {
      id: 3,
      date: 'March 20, 2025',
      location: 'Villa | Bangalore',
      description: 'A look at how simplicity can sharpen communication, increase impact, and build longer-lasting brands.',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      tag: 'Insights',
    },
  ];

  const clientTestimonials = [
    {
      id: 1,
      name: 'Sukriti',
      testimonial: 'Our dream home was designed as beautifully as we pictured it - that\'s what\'s unique about Decor mate experience.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Priya',
      testimonial: 'The team understood our vision perfectly and delivered beyond our expectations.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    },
  ];

  const handleScrollDown = () => {
    scrollViewRef.current?.scrollTo({ y: 400, animated: true });
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const handlePreviousTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop' }}
        style={styles.heroBackgroundImage}
      />
      <View style={styles.heroOverlay}>
        <View style={styles.heroContentBox}>
          <Text style={styles.heroTitle}>Portfolio</Text>
          <Text style={styles.heroDescription}>
            A curated showcase of my designs and ideas reflecting skill and vision.
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>1000+</Text>
              <Text style={styles.heroStatLabel}>Project Complete</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>1500+</Text>
              <Text style={styles.heroStatLabel}>Satisfied Clients</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.scrollDownButton} onPress={handleScrollDown}>
          <Text style={styles.scrollDownIcon}>↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLatestProjects = () => (
    <View style={styles.latestProjectsSection}>
      <Text style={styles.sectionTitle}>Our Latest Projects</Text>
      <Text style={styles.sectionSubtitle}>Showcasing our recent creative work</Text>
      {projects.map((project) => (
        <View key={project.id} style={styles.featuredProjectCard}>
          <View style={styles.featuredProjectImageContainer}>
            <Image
              source={{ uri: project.image }}
              style={styles.featuredProjectImage}
            />
            <TouchableOpacity style={styles.projectNavButton}>
              <Text style={styles.projectNavIcon}>→</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuredProjectInfo}>
            <View style={styles.featuredProjectTitleRow}>
              <View>
                <Text style={styles.featuredProjectName}>{project.name}</Text>
                <Text style={styles.featuredProjectSubtitle}>{project.subtitle}</Text>
              </View>
              <Text style={styles.featuredProjectYear}>{project.year}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderInsightProjects = () => (
    <View style={styles.insightSection}>
      {insightProjects.map((project) => (
        <View key={project.id} style={styles.insightCard}>
          <View style={styles.insightImageContainer}>
            <Image
              source={{ uri: project.image }}
              style={styles.insightImage}
            />
            <View style={styles.insightTag}>
              <Text style={styles.insightTagText}>{project.tag}</Text>
            </View>
            <View style={styles.insightOverlay}>
              <Text style={styles.insightDate}>{project.date}</Text>
              <Text style={styles.insightLocation}>{project.location}</Text>
            </View>
          </View>
          <View style={styles.insightDescriptionBox}>
            <Text style={styles.insightDescription}>{project.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderClientTestimonials = () => (
    <View style={styles.clientTestimonialsSection}>
      {clientTestimonials.map((testimonial) => (
        <View key={testimonial.id} style={styles.clientTestimonialCard}>
          <Image
            source={{ uri: testimonial.image }}
            style={styles.clientTestimonialImage}
          />
          <View style={styles.clientTestimonialContent}>
            <Text style={styles.clientTestimonialName}>{testimonial.name}</Text>
            <Text style={styles.clientTestimonialText}>{testimonial.testimonial}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderCreativeShowcase = () => (
    <View style={styles.creativeShowcaseSection}>
      <View style={styles.creativeShowcaseBorder}>
        <Text style={styles.sectionTitle}>Creative Showcase</Text>
        <Text style={styles.sectionSubtitle}>
          Exploring unique ideas and transforming them into impactful real-world realities
        </Text>
        <TouchableOpacity style={styles.consultationButton}>
          <Text style={styles.consultationButtonText}>Book Your Consultation Now</Text>
          <Text style={styles.consultationArrow}>↗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSuccessStories = () => (
    <View style={styles.successStoriesSection}>
      <Text style={styles.successStoriesTitle}>Success stories from our clients.</Text>
      <View style={styles.successStoriesCarousel}>
        <View style={styles.testimonialCardsContainer}>
          {currentTestimonialIndex === 0 ? (
            <View style={styles.testimonialCardLeft}>
              <Image
                source={{ uri: testimonials[0].abstractImage }}
                style={styles.testimonialAbstractImage}
              />
              <Text style={styles.testimonialRating}>{testimonials[0].rating}</Text>
              <Text style={styles.testimonialName}>{testimonials[0].name}</Text>
              <Text style={styles.testimonialRole}>{testimonials[0].role}</Text>
            </View>
          ) : (
            <View style={styles.testimonialCardRight}>
              <Text style={styles.testimonialQuote}>{testimonials[1].quote}</Text>
              <View style={styles.testimonialFooter}>
                <Image
                  source={{ uri: testimonials[1].image }}
                  style={styles.testimonialProfileImage}
                />
                <View>
                  <Text style={styles.testimonialName}>{testimonials[1].name}</Text>
                  <Text style={styles.testimonialRole}>{testimonials[1].role}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={styles.carouselControls}>
          <TouchableOpacity
            style={styles.carouselButton}
            onPress={handlePreviousTestimonial}
          >
            <Text style={styles.carouselArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.carouselButton}
            onPress={handleNextTestimonial}
          >
            <Text style={styles.carouselArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {renderHeroSection()}
      {renderLatestProjects()}
      {renderInsightProjects()}
      {renderClientTestimonials()}
      {renderCreativeShowcase()}
      {renderSuccessStories()}
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
    height: 500,
    position: 'relative',
  },
  heroBackgroundImage: {
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
    backgroundColor: 'rgba(161, 207, 210, 0.7)',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 40,
  },
  heroContentBox: {
    backgroundColor: '#A1CFD2',
    borderRadius: 16,
    padding: 32,
    width: width * 0.7,
    marginRight: 20,
  },
  heroTitle: {
    fontSize: 48,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  heroDescription: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    lineHeight: 24,
    marginBottom: 24,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 24,
  },
  heroStatItem: {
    alignItems: 'flex-start',
  },
  heroStatNumber: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: '#1DA1A5',
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#1DA1A5',
  },
  scrollDownButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollDownIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
  },
  latestProjectsSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 24,
  },
  featuredProjectCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredProjectImageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  featuredProjectImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  projectNavButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1DA1A5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectNavIcon: {
    fontSize: 20,
    color: Colors.textWhite,
    fontFamily: Fonts.bold,
  },
  featuredProjectInfo: {
    padding: 20,
  },
  featuredProjectTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  featuredProjectName: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  featuredProjectSubtitle: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  featuredProjectYear: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  insightSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: Colors.background,
  },
  insightCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  insightImageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  insightImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  insightTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.8)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  insightTagText: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: Colors.textWhite,
  },
  insightOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  insightDate: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    marginBottom: 4,
  },
  insightLocation: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textWhite,
  },
  insightDescriptionBox: {
    backgroundColor: Colors.textPrimary,
    padding: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  insightDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    lineHeight: 20,
  },
  clientTestimonialsSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: Colors.background,
  },
  clientTestimonialCard: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  clientTestimonialImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  clientTestimonialContent: {
    flex: 1,
  },
  clientTestimonialName: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  clientTestimonialText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  creativeShowcaseSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.background,
  },
  creativeShowcaseBorder: {
    borderWidth: 3,
    borderColor: '#1DA1A5',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  consultationButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 24,
  },
  consultationButtonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textWhite,
    marginRight: 8,
  },
  consultationArrow: {
    fontSize: 18,
    color: Colors.textWhite,
    fontFamily: Fonts.bold,
  },
  successStoriesSection: {
    backgroundColor: Colors.textPrimary,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  successStoriesTitle: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 32,
  },
  successStoriesCarousel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialCardsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
  testimonialCardLeft: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  testimonialAbstractImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  testimonialRating: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 8,
  },
  testimonialName: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 4,
  },
  testimonialRole: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    opacity: 0.8,
  },
  testimonialCardRight: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  testimonialQuote: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    lineHeight: 24,
    marginBottom: 20,
  },
  testimonialFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  carouselControls: {
    flexDirection: 'row',
    gap: 12,
    marginLeft: 16,
  },
  carouselButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselArrow: {
    fontSize: 20,
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
  },
});

export default PortfolioScreen;

