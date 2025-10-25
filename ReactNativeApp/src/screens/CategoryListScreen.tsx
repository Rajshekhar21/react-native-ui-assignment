import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';

type CategoryListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CategoryList'
>;

interface Props {
  navigation: CategoryListScreenNavigationProp;
}

interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
}

interface ApiCategory {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  processedImageUrl?: string;
  designs?: number;
  slug?: string;
  type?: string;
  isActive?: boolean;
}

const { width } = Dimensions.get('window');

const CategoryListScreen: React.FC<Props> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback demo data
  const fallbackCategories: Category[] = [
    {
      id: '1',
      name: 'Bedroom Designs',
      count: '455 Designs',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      name: 'Living Room Designs',
      count: '320 Designs',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      name: 'Kitchen Designs',
      count: '280 Designs',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    },
  ];

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://interiorbackend-a1kf.onrender.com/api/categories');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data && data.data.length > 0) {
        const transformedCategories: Category[] = data.data.map((category: any) => ({
          id: category._id,
          name: category.title,
          count: `${category.designs || 0} Designs`,
          image: category.processedImageUrl || category.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        }));
        setCategories(transformedCategories);
      } else {
        // Fallback to demo data if API returns empty
        setCategories(fallbackCategories);
      }
    } catch (err) {
      console.log('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      // Fallback to demo data on error
      setCategories(fallbackCategories);
    } finally {
      setLoading(false);
    }
  };

  // Initialize categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCategoryCard = (category: Category) => {
    return (
      <TouchableOpacity
        key={category.id}
        style={styles.categoryCard}
        onPress={() => navigation.navigate('ProductListing', { category: category.name })}
        activeOpacity={0.9}
      >
        <Image source={{ uri: category.image }} style={styles.categoryImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.categoryCount}>{category.count}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowIcon}>↗</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Category</Text>
          <Text style={styles.subtitle}>
            Transforming spaces with creativity, style, and function to match your lifestyle perfectly.
          </Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Category</Text>
        <Text style={styles.subtitle}>
          Transforming spaces with creativity, style, and function to match your lifestyle perfectly.
        </Text>
      </View>

      {/* Category Cards */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => renderCategoryCard(category))}
        </View>
      </ScrollView>

      {/* Send Enquiry Button */}
      <TouchableOpacity style={styles.enquiryButton}>
        <Text style={styles.enquiryButtonText}>Send Enquiry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleSection: {
    paddingTop: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.regular,
    color: '#333333',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#666666',
    textAlign: 'left',
    lineHeight: 18,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    paddingBottom: 20,
  },
  categoryCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: 80,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  categoryName: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: '#ffffff',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#ffffff',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  enquiryButton: {
    backgroundColor: '#FF6B6B',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  enquiryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
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
});

export default CategoryListScreen;