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
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import FilterIcon from '../../assets/images/filter.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';
import { getFeaturedDesigners, getInspirationProjects, getRecentWork, getServices, FeaturedDesigner, InspirationProject, RecentWork, Service } from '../services/homeService';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [designers, setDesigners] = useState<FeaturedDesigner[]>([]);
  const [inspirationProjects, setInspirationProjects] = useState<InspirationProject[]>([]);
  const [recentWork, setRecentWork] = useState<RecentWork[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState('Bedroom Design');
  const [currentInspirationIndex, setCurrentInspirationIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const inspirationScrollRef = useRef<ScrollView>(null);
  const projectScrollRef = useRef<ScrollView>(null);

  const categories = ['Bedroom Design', 'Kitchen Design', 'Living Room', 'Office'];

  useEffect(() => {
    fetchHomeData();
  }, []);

  useEffect(() => {
    fetchInspirationProjects(activeCategory);
  }, [activeCategory]);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      
      // Fetch all homepage data
      const [designersData, projectsData, workData, servicesData] = await Promise.all([
        getFeaturedDesigners().catch(() => []),
        getInspirationProjects().catch(() => []),
        getRecentWork().catch(() => []),
        getServices().catch(() => []),
      ]);

      setDesigners(designersData);
      setInspirationProjects(projectsData);
      setRecentWork(workData);
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInspirationProjects = async (category: string) => {
    try {
      const data = await getInspirationProjects(category);
      setInspirationProjects(data);
    } catch (error) {
      console.error('Error fetching inspiration projects:', error);
    }
  };

  const scrollToInspiration = (index: number) => {
    if (inspirationScrollRef.current) {
      inspirationScrollRef.current.scrollTo({
        x: index * (width - 40),
        animated: true,
      });
    }
    setCurrentInspirationIndex(index);
  };

  const scrollToProject = (index: number) => {
    if (projectScrollRef.current) {
      projectScrollRef.current.scrollTo({
        x: index * (width - 80),
        animated: true,
      });
    }
    setCurrentProjectIndex(index);
  };

  const handleBookConsultation = () => {
    // Navigate to consultation booking screen
    navigation.navigate('CategoryList');
  };

  const handleDesignerProfile = (designerId: string) => {
    // Navigate to designer profile
    navigation.navigate('ProfileView');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop' }}
        style={styles.heroImage}
      />
      <View style={styles.heroContentOverlay}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Find the Right Interior Designer for Your Home</Text>
          <Text style={styles.heroSubtitle}>Your dream home starts with the right designer let's find yours</Text>
          <TouchableOpacity style={styles.consultationButton} onPress={handleBookConsultation}>
            <Text style={styles.consultationButtonText}>Book Your Consultation Now</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHowWeWorkSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>How we Work</Text>
      <Text style={styles.sectionSubtitle}>
        Creative solutions, delivered right, always with utmost care.
      </Text>
      <View style={styles.processGrid}>
        <View style={styles.processCard}>
          <View style={styles.processIconContainer}>
            <Image 
              source={require('../../assets/images/Document.png')} 
              style={styles.processIconImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.processCardContent}>
            <Text style={styles.processTitle}>Post Your Requirement</Text>
            <Text style={styles.processSubtitle}>Share your project details & budget</Text>
          </View>
        </View>
        <View style={styles.processCard}>
          <View style={styles.processIconContainer}>
            <Image 
              source={require('../../assets/images/puzzle.png')} 
              style={styles.processIconImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.processCardContent}>
            <Text style={styles.processTitle}>Get Matched</Text>
            <Text style={styles.processSubtitle}>Receive 2-3 verified professional matches</Text>
          </View>
        </View>
        <View style={styles.processCard}>
          <View style={styles.processIconContainer}>
            <Image 
              source={require('../../assets/images/link.png')} 
              style={styles.processIconImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.processCardContent}>
            <Text style={styles.processTitle}>Compare & Connect</Text>
            <Text style={styles.processSubtitle}>Review profiles, portfolios & quotes</Text>
          </View>
        </View>
        <View style={styles.processCard}>
          <View style={[styles.processIconContainer, styles.processIconContainerRed]}>
            <Image 
              source={require('../../assets/images/shuttle.png')} 
              style={styles.processIconImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.processCardContent}>
            <Text style={styles.processTitle}>Start Your Project</Text>
            <Text style={styles.processSubtitle}>Begin your dream transformation</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderInspirationDesignIdeasSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Inspiration Design Ideas</Text>
      <Text style={styles.sectionSubtitle}>
        Ideas that inspire your next creative project and elevate every design.
      </Text>
      
      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabsScroll}
        contentContainerStyle={styles.categoryTabsContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              activeCategory === category && styles.categoryTabActive,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryTabText,
                activeCategory === category && styles.categoryTabTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        ref={inspirationScrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleInspirationScroll}
        style={styles.carouselContainer}
        contentContainerStyle={styles.inspirationCarouselContent}
      >
        {inspirationProjects.map((project, index) => (
          <TouchableOpacity 
            key={project.id} 
            style={styles.inspirationCard}
            onPress={() => navigation.navigate('ProductDetail', { productId: project.id })}
          >
            <Image source={{ uri: project.imageUrl || project.image }} style={styles.inspirationImage} />
            <View style={styles.inspirationOverlay}>
              <Text style={styles.inspirationLabel}>{project.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderPaginationDots(currentInspirationIndex, inspirationProjects.length, scrollToInspiration)}
    </View>
  );

  const renderFeaturedDesignersSection = () => {
    const displayedDesigners = designers.slice(0, 5);
    const hasMoreDesigners = designers.length > 5;

    const getSurname = (fullName: string) => {
      const parts = fullName.trim().split(' ');
      return parts.length > 1 ? parts[parts.length - 1] : fullName;
    };

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Designers</Text>
        <Text style={styles.sectionSubtitle}>
          Meet the talented designers shaping trends and creating exceptional spaces.
        </Text>
        <View style={styles.designersContainer}>
          {displayedDesigners.map((designer) => (
            <View key={designer.id} style={styles.designerCardVertical}>
              <View style={styles.designerImageContainer}>
                {(designer.profileImage || designer.avatar) ? (
                  <Image 
                    source={{ uri: designer.profileImage || designer.avatar }} 
                    style={styles.designerImage}
                  />
                ) : (
                  <View style={styles.designerImagePlaceholder}>
                    <Text style={styles.designerImageInitials}>
                      {(designer.name || 'U').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.designerCardContent}>
                <Text style={styles.designerCardName}>{getSurname(designer.name)}</Text>
                <Text style={styles.designerCardExperience}>
                  {designer.profession || 'Interior Designer'} • {designer.experienceYears || designer.experience || 0} years exp.
                </Text>
                <Text style={styles.designerCardDescription} numberOfLines={2}>
                  {designer.shortDescription || designer.description || 'Blending creativity and practicality to design interiors that inspire.'}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.designerProfileButton}
                onPress={() => handleDesignerProfile(designer.id)}
              >
                <Text style={styles.designerProfileButtonText}>Profile →</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {hasMoreDesigners && (
          <TouchableOpacity 
            style={styles.seeMoreButton}
            onPress={() => navigation.navigate('Profiles')}
          >
            <Text style={styles.seeMoreButtonText}>See More</Text>
            <Text style={styles.seeMoreButtonArrow}>→</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderServicesSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Services</Text>
      <Text style={styles.sectionSubtitle}>
        Complete design solutions for every space.
      </Text>
      <View style={styles.servicesGrid}>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <Text style={styles.serviceIcon}>
              {service.icon === 'home' ? '🏠' : '🏢'}
            </Text>
            <Text style={styles.serviceTitle}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderRecentWorkSection = () => (
    <View style={styles.recentWorkSection}>
      <Text style={styles.recentWorkTitle}>Recent Work</Text>
      <Text style={styles.recentWorkSubtitle}>
        A showcase of our latest designs and creative solutions.
      </Text>
      <View style={styles.projectCarouselContainer}>
        <TouchableOpacity
          style={styles.navArrow}
          onPress={() => {
            const newIndex = currentProjectIndex > 0 ? currentProjectIndex - 1 : recentWork.length - 1;
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
          {recentWork.map((project, index) => (
            <View key={project.id} style={styles.projectCard}>
              <Image source={{ uri: project.imageUrl || project.image }} style={styles.projectImage} />
              <View style={styles.projectContent}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <View style={styles.projectLocation}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.projectLocationText}>{project.location}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.navArrow}
          onPress={() => {
            const newIndex = currentProjectIndex < recentWork.length - 1 ? currentProjectIndex + 1 : 0;
            scrollToProject(newIndex);
          }}
        >
          <Text style={styles.navArrowIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderExploreByLocationSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Explore by Location</Text>
      <Text style={styles.sectionSubtitle}>
        Complete design solutions for every space.
      </Text>
      <View style={styles.locationSearchContainer}>
        <View style={styles.searchField}>
          <Image 
            source={require('../../assets/images/locationicon.png')} 
            style={styles.fieldIconImage}
            resizeMode="contain"
          />
          <Text style={styles.fieldPlaceholder}>Location</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </View>
        <View style={styles.searchField}>
          <Image 
            source={require('../../assets/images/commercialicon.png')} 
            style={styles.fieldIconImage}
            resizeMode="contain"
          />
          <Text style={styles.fieldPlaceholder}>Service Name</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.searchButton}>
        <FilterIcon width={16} height={16} fill={Colors.textWhite} />
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );



  const handleInspirationScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width - 40));
    setCurrentInspirationIndex(index);
  };

  const handleProjectScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const cardWidth = width * 0.75;
    const index = Math.round(contentOffsetX / cardWidth);
    setCurrentProjectIndex(index);
  };




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
      {renderHeroSection()}
      {renderFeaturedDesignersSection()}
      {renderInspirationDesignIdeasSection()}
      {renderHowWeWorkSection()}
      {renderServicesSection()}
      {renderRecentWorkSection()}
      {renderExploreByLocationSection()}
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
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  heroContentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  heroTextContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 20,
    lineHeight: 22,
  },
  consultationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  consultationButtonText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginRight: 8,
  },
  arrowIcon: {
    fontSize: 20,
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  processCard: {
    width: '100%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  processIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  processIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#333333',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  processIconContainerRed: {
    backgroundColor: Colors.primary,
  },
  processIconImage: {
    width: 30,
    height: 30,
  },
  processCardContent: {
    alignItems: 'center',
  },
  redIcon: {
    color: Colors.primary,
  },
  processTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  processSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 16,
    textAlign: 'center',
  },
  carouselContainer: {
    marginBottom: 20,
    paddingVertical: 20,
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
  inspirationCarouselContent: {
    paddingRight: 20,
  },
  designersContainer: {
    flexDirection: 'column',
  },
  designerCardVertical: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  designerImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#20C997',
  },
  designerImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    resizeMode: 'cover',
  },
  designerImagePlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  designerImageInitials: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: '#333',
  },
  designerCardContent: {
    flex: 1,
  },
  designerCardName: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  designerCardExperience: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#20C997',
    marginBottom: 6,
  },
  designerCardDescription: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  designerProfileButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  designerProfileButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  seeMoreButtonText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginRight: 8,
  },
  seeMoreButtonArrow: {
    color: Colors.textWhite,
    fontSize: 18,
    fontFamily: Fonts.bold,
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
  projectLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  projectLocationText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
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
  categoryTabsScroll: {
    marginBottom: 20,
  },
  categoryTabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  categoryTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
  },
  categoryTabText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  categoryTabTextActive: {
    color: Colors.textWhite,
    fontFamily: Fonts.semiBold,
  },
  servicesGrid: {
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
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  locationSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginRight: 8,
  },
  fieldIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  fieldIconImage: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  fieldPlaceholder: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  dropdownIcon: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchButtonIconImage: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  searchButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
});

export default HomeScreen;

