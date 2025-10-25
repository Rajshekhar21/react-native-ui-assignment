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
import { PanGestureHandler as RNGestureHandler, State } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

type ProductDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface Props {
  navigation: ProductDetailScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
}

interface ApiProductDetail {
  _id: string;
  name: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnailImage?: {
    url: string;
    public_id: string;
  };
  processedThumbnail?: string;
  gallery?: Array<{
    url: string;
    public_id: string;
    _id: string;
  }>;
  processedGallery?: Array<{
    url: string;
    public_id: string;
    _id: string;
  }>;
  priceRange?: {
    currency: string;
  };
  rating?: number;
  reviewCount?: number;
  category?: string;
  tags?: string[];
  features?: string[];
  vendorId?: {
    name: string;
    title: string;
    location: {
      city: string;
    };
  };
  reviews?: Array<{
    _id: string;
    rating: number;
    comment: string;
    user: {
      name: string;
      location: string;
    };
  }>;
}

const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { productId } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const testimonialScrollRef = useRef<ScrollView>(null);
  const imageScrollRef = useRef<ScrollView>(null);

  // Fallback demo data
  const fallbackProduct = {
    id: productId,
    name: 'Modern Open Kitchen Design with Granite Island and Mosaic Backsplash',
    rating: 5,
    reviewCount: 25,
    peopleCount: 352,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    ],
    features: {
      'Granite Island': [
        'Black Galaxy granite top (8 ft x 4 ft).',
        'Seating space for 4 with high chairs.',
        'Under-island cabinets for storage + built-in wine rack.',
      ],
      'Mosaic Backsplash': [
        'Hand-cut ceramic mosaic in teal & beige shades.',
        'Easy to clean, stain-resistant tiles.',
        'Extends from countertop to ceiling for a bold statement wall.',
      ],
      'Cabinetry': [
        'Matte white laminate finish with soft-close drawers.',
        'Overhead cabinets with frosted glass doors.',
        'Hidden pantry section with sliding door.',
      ],
    },
  };

  const fallbackTestimonials = [
    {
      id: 1,
      text: "Working with your design team was an absolute pleasure. The attention to detail and creativity exceeded my expectations. Thank you for making my home beautiful!",
      name: "Sophie Carter",
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      text: "Absolutely love the final result! The kitchen design transformed our entire home. Professional service and stunning work.",
      name: "Michael Johnson",
      location: "Los Angeles, CA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      text: "The team's creativity and attention to detail is unmatched. Our new kitchen is exactly what we dreamed of!",
      name: "Sarah Williams",
      location: "Chicago, IL",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://interiorbackend-a1kf.onrender.com/api/products/${productId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('product detail data', data);
      
      if (data && data.data) {
        const apiProduct: ApiProductDetail = data.data.product;
        
        // Transform API data to app format
        const transformedProduct = {
          id: apiProduct._id,
          name: apiProduct.name,
          rating: apiProduct.rating || 4.5,
          reviewCount: apiProduct.reviewCount || 0,
          peopleCount: apiProduct.reviewCount || 0,
          images: apiProduct.processedGallery?.map(img => img.url) || 
                 apiProduct.gallery?.map(img => img.url) || 
                 (apiProduct.processedThumbnail ? [apiProduct.processedThumbnail] : []) ||
                 (apiProduct.thumbnailImage ? [apiProduct.thumbnailImage.url] : []),
          features: apiProduct.features ? {
            'Key Features': apiProduct.features
          } : fallbackProduct.features,
        };
        
        setProduct(transformedProduct);
        
        // Transform reviews to testimonials
        const transformedTestimonials = apiProduct.reviews?.map(review => ({
          id: review._id,
          text: review.comment,
          name: review.user.name,
          location: review.user.location,
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        })) || fallbackTestimonials;
        
        setTestimonials(transformedTestimonials);
      } else {
        // Fallback to demo data if API returns empty
        setProduct(fallbackProduct);
        setTestimonials(fallbackTestimonials);
      }
    } catch (err) {
      console.log('Error fetching product detail:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch product details');
      // Fallback to demo data on error
      setProduct(fallbackProduct);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  // Initialize product detail from API
  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Text key={index} style={styles.star}>
        {index < rating ? '★' : '☆'}
      </Text>
    ));
  };

  const nextTestimonial = () => {
    const newIndex = currentTestimonialIndex === testimonials.length - 1 ? 0 : currentTestimonialIndex + 1;
    setCurrentTestimonialIndex(newIndex);
    testimonialScrollRef.current?.scrollTo({
      x: newIndex * (width * 0.35 + 10),
      animated: true,
    });
  };

  const prevTestimonial = () => {
    const newIndex = currentTestimonialIndex === 0 ? testimonials.length - 1 : currentTestimonialIndex - 1;
    setCurrentTestimonialIndex(newIndex);
    testimonialScrollRef.current?.scrollTo({
      x: newIndex * (width * 0.35 + 10),
      animated: true,
    });
  };

  const nextImage = () => {
    const newIndex = currentImageIndex === product.images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    imageScrollRef.current?.scrollTo({
      x: newIndex * width,
      animated: true,
    });
  };

  const prevImage = () => {
    const newIndex = currentImageIndex === 0 ? product.images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    imageScrollRef.current?.scrollTo({
      x: newIndex * width,
      animated: true,
    });
  };

  const onSwipeGesture = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      if (translationX > 50) {
        prevImage();
      } else if (translationX < -50) {
        nextImage();
      }
    }
  };

  const handleImageScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== currentImageIndex && index >= 0 && index < product.images.length) {
      setCurrentImageIndex(index);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Loading product details...</Text>
        </View>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Product not found</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Product Image Carousel */}
      <View style={styles.imageContainer}>
        <ScrollView
          ref={imageScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleImageScroll}
          style={styles.imageScrollView}
        >
          {product.images.map((image: string, index: number) => (
            <Image 
              key={index}
              source={{ uri: image }} 
              style={styles.productImage} 
            />
          ))}
        </ScrollView>
        
        {/* Carousel Indicators */}
        <View style={styles.carouselIndicators}>
          {product.images.map((_: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCurrentImageIndex(index);
                imageScrollRef.current?.scrollTo({
                  x: index * width,
                  animated: true,
                });
              }}
              style={[
                styles.indicator,
                index === currentImageIndex && styles.activeIndicator
              ]}
            />
          ))}
        </View>
      </View>

      {/* Product Information */}
      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        
        {/* Rating and Engagement */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(product.rating)}
            </View>
            <Text style={styles.reviewCount}>({product.reviewCount})</Text>
            <Text style={styles.peopleCount}>{product.peopleCount} People</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={toggleFavorite}
            >
              <Text style={[
                styles.actionIcon,
                isFavorite && styles.actionIconActive
              ]}>
                {isFavorite ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>↗</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Key Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {Object.entries(product.features).map(([category, features]) => (
            <View key={category} style={styles.featureCategory}>
              <Text style={styles.featureCategoryTitle}>{category}</Text>
              {(features as string[]).map((feature, index) => (
                <Text key={index} style={styles.featureItem}>
                  • {feature}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Client Testimonials - Only show if there are reviews */}
        {testimonials.length > 0 && (
          <View style={styles.testimonialsSection}>
            <Text style={styles.sectionTitle}>What Clients Say</Text>
            
            <View style={styles.testimonialsContainer}>
              {/* Background Product Image */}
              <View style={styles.backgroundImageContainer}>
                <Image 
                  source={{ uri: product.images[0] }} 
                  style={styles.backgroundImage}
                />
              </View>
              
              {/* Overlapping Reviews Area */}
              <View style={styles.reviewsOverlay}>
                <ScrollView 
                  ref={testimonialScrollRef}
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.testimonialsScrollView}
                  contentContainerStyle={styles.testimonialsScrollContent}
                  pagingEnabled={true}
                  snapToInterval={width * 0.35 + 10}
                  decelerationRate="fast"
                >
                  {testimonials.map((testimonial, index) => (
                    <View key={testimonial.id} style={styles.testimonialCard}>
                      <Text style={styles.quoteMark}>"</Text>
                      <Text style={styles.testimonialText}>
                        {testimonial.text}
                      </Text>
                      
                      <View style={styles.testimonialFooter}>
                        <Image 
                          source={{ uri: testimonial.avatar }} 
                          style={styles.avatar}
                        />
                        <View style={styles.clientInfo}>
                          <Text style={styles.clientName}>
                            {testimonial.name}
                          </Text>
                          <Text style={styles.clientLocation}>
                            {testimonial.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
              
              {/* Navigation Arrows - Bottom Left */}
              <View style={styles.testimonialNavigation}>
                <TouchableOpacity onPress={prevTestimonial} style={styles.navButton}>
                  <Text style={styles.navIcon}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextTestimonial} style={styles.navButton}>
                  <Text style={styles.navIcon}>›</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    position: 'relative',
  },
  imageScrollView: {
    height: 350,
  },
  productImage: {
    width: width,
    height: 350,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: 'cover',
  },
  carouselIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 0,
    lineHeight: 28,
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 16,
    color: '#FFD800',
    marginRight: 2,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666666',
    marginRight: 12,
  },
  peopleCount: {
    fontSize: 14,
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionIcon: {
    fontSize: 12,
    color: '#333333',
  },
  actionIconActive: {
    color: '#FF1744',
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  featureCategory: {
    marginBottom: 20,
  },
  featureCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 4,
    marginLeft: 8,
  },
  testimonialsSection: {
    marginBottom: 40,
  },
  testimonialsContainer: {
    position: 'relative',
    height: 300,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  reviewsOverlay: {
    position: 'absolute',
    borderRadius: 12,
    top: '40%',
    left: '30%',
    width: '80%',
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 8,
    justifyContent: 'space-between',
  },
  testimonialsScrollView: {
    flex: 1,
  },
  testimonialsScrollContent: {
    paddingRight: 16,
  },
  testimonialCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    marginRight: 10,
    width: width * 0.35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quoteMark: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 0,
  },
  testimonialText: {
    fontSize: 10,
    color: 'white',
    lineHeight: 18,
    marginBottom: 12,
  },
  testimonialFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 14,
    marginRight: 8,
  },
  clientInfo: {
    marginTop: 5,
    flex: 1,
  },
  clientName: {
    fontSize: 9,
    fontWeight: '600',
    color: '#666666',
  },
  clientLocation: {
    fontSize: 10,
    color: '#999999',
  },
  testimonialNavigation: {
    position: 'absolute',
    bottom: -30,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    width: 28,
    height: 28,
    borderRadius: 3,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  navIcon: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
  },
});

export default ProductDetailScreen;