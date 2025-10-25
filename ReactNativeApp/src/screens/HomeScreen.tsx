import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Designer {
  id: string;
  name: string;
  profession: string;
  experience: string;
  location: string;
  avatar: string;
  description: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentInspirationIndex, setCurrentInspirationIndex] = useState(0);
  const [currentDesignerIndex, setCurrentDesignerIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const inspirationScrollRef = useRef<ScrollView>(null);
  const designerScrollRef = useRef<ScrollView>(null);
  const projectScrollRef = useRef<ScrollView>(null);
  const testimonialScrollRef = useRef<ScrollView>(null);

  // Mock data for designers
  const designers: Designer[] = [
    {
      id: '1',
      name: 'Akash Sharma',
      profession: 'Interior Designer',
      experience: '10 years',
      location: 'Dehradun, Uttarakhand',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      description: 'Passionate about creating beautiful and functional spaces that reflect your personality and lifestyle. Specializing in modern and contemporary designs.',
    },
    {
      id: '2',
      name: 'Priya Patel',
      profession: 'Architect',
      experience: '8 years',
      location: 'Mumbai, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      description: 'Expert in residential and commercial architecture with a focus on sustainable design and innovative solutions.',
    },
    {
      id: '3',
      name: 'Rajesh Kumar',
      profession: 'Interior Designer',
      experience: '12 years',
      location: 'Delhi, NCR',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: 'Award-winning designer with expertise in luxury residential projects and hospitality design.',
    },
    {
      id: '4',
      name: 'Sneha Gupta',
      profession: 'Space Planner',
      experience: '6 years',
      location: 'Bangalore, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      description: 'Specializing in space optimization and functional design for small and medium-sized homes.',
    },
    {
      id: '5',
      name: 'Vikram Singh',
      profession: 'Interior Designer',
      experience: '15 years',
      location: 'Pune, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      description: 'Veteran designer with extensive experience in traditional and fusion interior design styles.',
    },
  ];

  // Mock data for testimonials
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Akash',
      role: 'UI/UX Designer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    },
    {
      id: '2',
      name: 'Priya',
      role: 'Product Manager',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    },
    {
      id: '3',
      name: 'Rajesh',
      role: 'Software Engineer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    },
    {
      id: '4',
      name: 'Sneha',
      role: 'Marketing Manager',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    },
    {
      id: '5',
      name: 'Vikram',
      role: 'Business Analyst',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    },
  ];

  // Mock data for recent projects
  const projects: Project[] = [
    {
      id: '1',
      title: 'Modern Open Kitchen',
      description: 'Design with Granite Island and Mosaic Backsplash',
      location: 'Dehradun, Uttrakhand',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      title: 'Contemporary Living Room',
      description: 'Minimalist design with premium finishes',
      location: 'Mumbai, Maharashtra',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      title: 'Luxury Master Bedroom',
      description: 'Elegant design with custom furniture',
      location: 'Delhi, NCR',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
    },
  ];

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://interiorbackend-a1kf.onrender.com/api/categories');
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.data.length > 0) {
          const transformedCategories: Category[] = data.data.map((category: any) => ({
            id: category._id,
            name: category.title,
            image: category.processedImageUrl || category.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
          }));
          setCategories(transformedCategories);
        } else {
          // Fallback data
          setCategories([
            {
              id: '1',
              name: 'Bedroom Design',
              image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
            },
            {
              id: '2',
              name: 'Living Room Design',
              image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
            },
            {
              id: '3',
              name: 'Kitchen Design',
              image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
            },
          ]);
        }
      } else {
        // Fallback data
        setCategories([
          {
            id: '1',
            name: 'Bedroom Design',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
          },
          {
            id: '2',
            name: 'Living Room Design',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
          },
          {
            id: '3',
            name: 'Kitchen Design',
            image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
          },
        ]);
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
      // Fallback data
      setCategories([
        {
          id: '1',
          name: 'Bedroom Design',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        },
        {
          id: '2',
          name: 'Living Room Design',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        },
        {
          id: '3',
          name: 'Kitchen Design',
          image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInspirationScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width - 40));
    setCurrentInspirationIndex(index);
  };

  const handleDesignerScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const cardWidth = width * 0.85;
    const index = Math.round(contentOffsetX / cardWidth);
    setCurrentDesignerIndex(index);
  };

  const handleProjectScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const cardWidth = width * 0.75;
    const index = Math.round(contentOffsetX / cardWidth);
    setCurrentProjectIndex(index);
  };

  const handleTestimonialScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const cardWidth = width * 0.85;
    const index = Math.round(contentOffsetX / cardWidth);
    setCurrentTestimonialIndex(index);
  };

  const scrollToInspiration = (index: number) => {
    setCurrentInspirationIndex(index);
    inspirationScrollRef.current?.scrollTo({
      x: index * (width - 40),
      animated: true,
    });
  };

  const scrollToDesigner = (index: number) => {
    setCurrentDesignerIndex(index);
    const cardWidth = width * 0.85;
    designerScrollRef.current?.scrollTo({
      x: index * cardWidth,
      animated: true,
    });
  };

  const scrollToProject = (index: number) => {
    setCurrentProjectIndex(index);
    const cardWidth = width * 0.75;
    projectScrollRef.current?.scrollTo({
      x: index * cardWidth,
      animated: true,
    });
  };

  const scrollToTestimonial = (index: number) => {
    setCurrentTestimonialIndex(index);
    const cardWidth = width * 0.85;
    testimonialScrollRef.current?.scrollTo({
      x: index * cardWidth,
      animated: true,
    });
  };

  const handleBrowseCategories = () => {
    navigation.navigate('CategoryList');
  };

  const renderInspirationCard = (category: Category, index: number) => (
    <TouchableOpacity 
      key={category.id} 
      style={styles.inspirationCard}
      onPress={handleBrowseCategories}
    >
      <Image source={{ uri: category.image }} style={styles.inspirationImage} />
      <View style={styles.inspirationOverlay}>
        <Text style={styles.inspirationLabel}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDesignerCard = (designer: Designer, index: number) => (
    <View key={designer.id} style={styles.designerCard}>
      <Image source={{ uri: designer.avatar }} style={styles.designerAvatar} />
      <Text style={styles.designerName}>{designer.name}</Text>
      <Text style={styles.designerProfession}>
        {designer.profession} | Exp. {designer.experience}
      </Text>
      <View style={styles.designerLocation}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.designerLocationText}>{designer.location}</Text>
      </View>
      <Text style={styles.designerDescription}>{designer.description}</Text>
      <TouchableOpacity style={styles.profileButton}>
        <Text style={styles.profileButtonText}>Profile →</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProjectCard = (project: Project, index: number) => (
    <View key={project.id} style={styles.projectCard}>
      <Image source={{ uri: project.image }} style={styles.projectImage} />
      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectDescription}>{project.description}</Text>
        <View style={styles.projectLocation}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.projectLocationText}>{project.location}</Text>
        </View>
      </View>
    </View>
  );

  const renderTestimonialCard = (testimonial: Testimonial, index: number) => (
    <View key={testimonial.id} style={styles.testimonialCard}>
      <Text style={styles.quoteIcon}>"</Text>
      <Text style={styles.testimonialName}>{testimonial.name}</Text>
      <Text style={styles.testimonialRole}>{testimonial.role}</Text>
      <Text style={styles.testimonialText}>{testimonial.text}</Text>
    </View>
  );

  const renderPaginationDots = (currentIndex: number, totalItems: number, onPress: (index: number) => void) => {
    // Limit to maximum 5 dots for better UX
    const maxDots = Math.min(totalItems, 5);
    const startIndex = Math.max(0, Math.min(currentIndex - 2, totalItems - maxDots));
    
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationWrapper}>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.paginationGradient}
          >
            <View style={styles.paginationDotsWrapper}>
              {Array.from({ length: maxDots }, (_, i) => {
                const actualIndex = startIndex + i;
                return (
                  <TouchableOpacity
                    key={actualIndex}
                    style={[
                      styles.paginationDot,
                      actualIndex === currentIndex && styles.activePaginationDot,
                    ]}
                    onPress={() => onPress(actualIndex)}
                  />
                );
              })}
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleBrowseCategories}
        >
          <Text style={styles.actionButtonIcon}>👷</Text>
          <Text style={styles.actionButtonText}>Find a Designer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonIcon}>🚀</Text>
          <Text style={styles.actionButtonText}>Post Your Project</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' }}
          style={styles.heroImage}
        />
      </View>

      {/* How We Work Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How we Work</Text>
        <Text style={styles.sectionSubtitle}>
          Creative solutions, delivered right, always with utmost care.
        </Text>
        <View style={styles.processGrid}>
          <View style={styles.processCard}>
            <Text style={styles.processIcon}>📄</Text>
            <Text style={styles.processTitle}>Post Your Requirement</Text>
            <Text style={styles.processSubtitle}>Share your project details & budget</Text>
          </View>
          <View style={styles.processCard}>
            <Text style={styles.processIcon}>👥</Text>
            <Text style={styles.processTitle}>Get Matched</Text>
            <Text style={styles.processSubtitle}>Receive 2-3 verified professional matches</Text>
          </View>
          <View style={styles.processCard}>
            <Text style={styles.processIcon}>🔗</Text>
            <Text style={styles.processTitle}>Compare & Connect</Text>
            <Text style={styles.processSubtitle}>Review profiles, portfolios & quotes</Text>
          </View>
          <View style={styles.processCard}>
            <Text style={[styles.processIcon, styles.redIcon]}>🚀</Text>
            <Text style={styles.processTitle}>Start Your Project</Text>
            <Text style={styles.processSubtitle}>Begin your dream transformation</Text>
          </View>
        </View>
      </View>

      {/* Inspiration Design Ideas Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inspiration Design Ideas</Text>
        <Text style={styles.sectionSubtitle}>
          Ideas that inspire your next creative project and elevate every design.
        </Text>
        <ScrollView
          ref={inspirationScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleInspirationScroll}
          style={styles.carouselContainer}
        >
          {categories.map((category, index) => renderInspirationCard(category, index))}
        </ScrollView>
        {renderPaginationDots(currentInspirationIndex, categories.length, scrollToInspiration)}
        
        <TouchableOpacity 
          style={styles.browseCategoriesButton}
          onPress={handleBrowseCategories}
        >
          <Text style={styles.browseCategoriesButtonText}>Browse All Categories</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Designers Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Designers</Text>
        <Text style={styles.sectionSubtitle}>
          Meet the talented designers shaping trends and creating exceptional spaces.
        </Text>
        <ScrollView
          ref={designerScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleDesignerScroll}
          style={styles.carouselContainer}
          contentContainerStyle={styles.designerCarouselContent}
        >
          {designers.map((designer, index) => renderDesignerCard(designer, index))}
        </ScrollView>
        {renderPaginationDots(currentDesignerIndex, designers.length, scrollToDesigner)}
      </View>

      {/* Spotlight Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spotlight</Text>
        <Text style={styles.sectionSubtitle}>
          Discover the ideas driving today's creative trends
        </Text>
        <View style={styles.spotlightCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop' }}
            style={styles.spotlightImage}
          />
          <TouchableOpacity style={styles.spotlightButton}>
            <Text style={styles.spotlightButtonIcon}>↗</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.spotlightTitle}>Purchase Securely</Text>
        <Text style={styles.spotlightDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>

      {/* Recent Work Section */}
      <View style={styles.recentWorkSection}>
        <Text style={styles.recentWorkTitle}>Recent Work</Text>
        <Text style={styles.recentWorkSubtitle}>
          A showcase of our latest designs and creative solutions.
        </Text>
        <View style={styles.projectCarouselContainer}>
          <TouchableOpacity
            style={styles.navArrow}
            onPress={() => {
              const newIndex = currentProjectIndex > 0 ? currentProjectIndex - 1 : projects.length - 1;
              scrollToProject(newIndex);
            }}
          >
            <Text style={styles.navArrowIcon}>←</Text>
          </TouchableOpacity>
          <ScrollView
            ref={projectScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleProjectScroll}
            style={styles.projectCarousel}
            contentContainerStyle={styles.projectCarouselContent}
          >
            {projects.map((project, index) => renderProjectCard(project, index))}
          </ScrollView>
          <TouchableOpacity
            style={styles.navArrow}
            onPress={() => {
              const newIndex = currentProjectIndex < projects.length - 1 ? currentProjectIndex + 1 : 0;
              scrollToProject(newIndex);
            }}
          >
            <Text style={styles.navArrowIcon}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* What People Thinks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What people thinks</Text>
        <Text style={styles.sectionSubtitle}>
          Real stories from clients who transformed their spaces with us.
        </Text>
        <ScrollView
          ref={testimonialScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleTestimonialScroll}
          style={styles.carouselContainer}
          contentContainerStyle={styles.testimonialCarouselContent}
        >
          {testimonials.map((testimonial, index) => renderTestimonialCard(testimonial, index))}
        </ScrollView>
        {renderPaginationDots(currentTestimonialIndex, testimonials.length, scrollToTestimonial)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#FF6F61',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
    fontFamily: Fonts.regular,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
  },
  heroSection: {
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
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
  processGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  processCard: {
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
  },
  processIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  redIcon: {
    color: Colors.primary,
  },
  processTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  processSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  inspirationCard: {
    width: width - 40,
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 20,
  },
  inspirationImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inspirationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
  },
  inspirationLabel: {
    color: Colors.textWhite,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  designerCarouselContent: {
    paddingRight: 20,
  },
  designerCard: {
    width: width * 0.85,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  designerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4CAF50',
    marginBottom: 15,
  },
  designerName: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  designerProfession: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  designerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  designerLocationText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  designerDescription: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 18,
    textAlign: 'left',
    marginBottom: 15,
  },
  profileButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  profileButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  spotlightCard: {
    position: 'relative',
    marginBottom: 15,
  },
  spotlightImage: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  spotlightButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotlightButtonIcon: {
    color: Colors.textWhite,
    fontSize: 20,
  },
  spotlightTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  spotlightDescription: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  recentWorkSection: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  recentWorkTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 8,
  },
  recentWorkSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: 20,
  },
  projectCarouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  navArrowIcon: {
    color: Colors.textWhite,
    fontSize: 18,
  },
  projectCarousel: {
    flex: 1,
  },
  projectCarouselContent: {
    paddingRight: 20,
  },
  projectCard: {
    width: width * 0.75,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  projectContent: {
    padding: 15,
    backgroundColor: 'transparent',
  },
  projectTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    marginBottom: 6,
  },
  projectDescription: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    lineHeight: 19,
    marginBottom: 10,
  },
  projectLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectLocationText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
  },
  testimonialCarouselContent: {
    paddingRight: 20,
  },
  testimonialCard: {
    width: width * 0.85,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteIcon: {
    fontSize: 36,
    color: '#FF9800',
    marginBottom: 15,
  },
  testimonialName: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  testimonialRole: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  testimonialText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  paginationContainer: {
    alignItems: 'center',
    marginTop: 12,
    overflow: 'hidden',
  },
  paginationWrapper: {
    position: 'relative',
    width: 200,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  paginationDotsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: '#666666',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  browseCategoriesButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  browseCategoriesButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
});

export default HomeScreen;
