import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';

type ProductListingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductListing'
>;

type ProductListingScreenRouteProp = RouteProp<RootStackParamList, 'ProductListing'>;

interface Props {
  navigation: ProductListingScreenNavigationProp;
  route: ProductListingScreenRouteProp;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  rating?: number;
  reviews?: number;
  size?: string;
  imageCount?: number;
}

interface ApiProduct {
  _id: string;
  name: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnailImage?: {
    url: string;
    public_id: string;
  };
  gallery?: Array<{
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
  vendorId?: {
    name: string;
    title: string;
    location: {
      city: string;
    };
    images: {
      profileImage: string;
    };
  };
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 2 columns with proper spacing

const ProductListingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { category } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(category);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(new Set());

  const filterCategories = availableCategories.length > 0 ? availableCategories : ['Interior Design', 'Wardrobe', 'Bedroom', 'Kitchen', 'Living Room'];

  // Fallback demo data
  const fallbackProducts: Product[] = [
    {
      id: '1',
      name: 'Modern Open Kitchen Design with Granite Island and Mosaic Backsplash',
      price: '$2,500',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 124,
      size: '10x16',
      imageCount: 12,
    },
    {
      id: '2',
      name: 'Contemporary Living Room with Sectional Sofa',
      price: '$3,200',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 89,
      size: '12x18',
      imageCount: 8,
    },
    {
      id: '3',
      name: 'Minimalist Bedroom with Built-in Wardrobe',
      price: '$1,800',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 203,
      size: '8x12',
      imageCount: 15,
    },
    {
      id: '4',
      name: 'Luxury Master Suite with Walk-in Closet',
      price: '$4,500',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 156,
      size: '15x20',
      imageCount: 20,
    },
    {
      id: '5',
      name: 'Modern Dining Room with Custom Lighting',
      price: '$2,200',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 78,
      size: '10x14',
      imageCount: 6,
    },
    {
      id: '6',
      name: 'Scandinavian Home Office Design',
      price: '$1,500',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 92,
      size: '8x10',
      imageCount: 10,
    },
  ];

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://interiorbackend-a1kf.onrender.com/api/categories');
      if (response.ok) {
        const data = await response.json();
        if (data && data.data && data.data.length > 0) {
          const categories = data.data.map((cat: any) => cat.title);
          setAvailableCategories(categories);
        }
      }
    } catch (err) {
      console.log('Error fetching categories:', err);
    }
  };

  const fetchProducts = async (selectedCategory?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const categoryToFetch = selectedCategory || category;
      const response = await fetch(`https://interiorbackend-a1kf.onrender.com/api/products?category=${encodeURIComponent(categoryToFetch)}&page=1&limit=50`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.data.products && data.data.products.length > 0) {
        const transformedProducts: Product[] = data.data.products.map((product: ApiProduct) => ({
          id: product._id,
          name: product.name,
          price: product.priceRange ? `${product.priceRange.currency} Price on request` : 'Price on request',
          image: product.thumbnailImage?.url || (product.gallery && product.gallery[0]?.url) || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
          rating: product.rating || 4.5,
          reviews: product.reviewCount || 0,
          size: 'Custom', // Not available in API, using default
          imageCount: product.gallery?.length || 1,
        }));
        setFilteredProducts(transformedProducts);
        setAllProducts(transformedProducts);
      } else {
        // Fallback to demo data if API returns empty
        setFilteredProducts(fallbackProducts);
        setAllProducts(fallbackProducts);
      }
    } catch (err) {
      console.log('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      // Fallback to demo data on error
      setFilteredProducts(fallbackProducts);
      setAllProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  // Initialize products and categories from API
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [category]);

  // Handle filter tag selection
  const handleFilterSelection = (filter: string) => {
    setSelectedFilter(filter);
    setAllProducts([]);
    setFilteredProducts([]);
    setLoading(true);
    fetchProducts(filter);
  };

  // Toggle favorite status
  const toggleFavorite = (productId: string) => {
    setFavoriteProducts(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // Reset to original products from API
      fetchProducts();
    } else {
      // Filter the current products based on search query
      const currentProducts = filteredProducts;
      const filtered = currentProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  const renderProduct = (product: Product) => {
    return (
      <View key={product.id} style={styles.productCard}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
          activeOpacity={0.9}
        >
          <Image source={{ uri: product.image }} style={styles.productImage} />
          
          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {product.rating}</Text>
          </View>
          
          {/* Favorite Button */}
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(product.id)}
          >
            <Text style={[
              styles.favoriteIcon,
              favoriteProducts.has(product.id) && styles.favoriteIconActive
            ]}>
              {favoriteProducts.has(product.id) ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
          
          {/* Image Count Badge */}
          <View style={styles.imageCountBadge}>
            <Text style={styles.imageCountText}>📷 {product.imageCount}</Text>
          </View>
        </TouchableOpacity>
        
        {/* Product Info Section */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>{product.name}</Text>
          <Text style={styles.productSize}>Size: {product.size}</Text>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.productActionButtons}>
          <TouchableOpacity style={styles.productConsultationButton}>
            <Text style={styles.productConsultationButtonText}>Book Free Consultation Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.productQuoteButton}>
            <Text style={styles.productQuoteButtonText}>Get Quote</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        {/* Filter Tags - Keep visible during loading */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filterCategories.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTag,
                selectedFilter === filter && styles.selectedFilterTag
              ]}
              onPress={() => handleFilterSelection(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.selectedFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            <Text style={styles.boldText}>Loading...</Text> products for {selectedFilter}
          </Text>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>{selectedFilter}</Text>
          <Text style={styles.description}>
            Transforming spaces with creativity, style, and function to match your lifestyle perfectly.
          </Text>
        </View>

        {/* Loading State */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filter Tags */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterCategories.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTag,
              selectedFilter === filter && styles.selectedFilterTag
            ]}
            onPress={() => handleFilterSelection(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.selectedFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredProducts.length} Results For <Text style={styles.boldText}>{selectedFilter}</Text>
        </Text>
      </View>

      {/* Main Title */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>{selectedFilter}</Text>
        <Text style={styles.description}>
          Transforming spaces with creativity, style, and function to match your lifestyle perfectly.
        </Text>
      </View>

      {/* Products Grid */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productsContainer}>
          {filteredProducts.map(renderProduct)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  filterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxHeight: 55
  },
  filterContent: {
    paddingRight: 20,
  },
  filterTag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#ffffff',
    marginRight: 12,
    height: 36,
    justifyContent: 'center',
  },
  selectedFilterTag: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontFamily: Fonts.medium,
  },
  selectedFilterText: {
    color: '#FF6B6B',
    fontFamily: Fonts.semiBold,
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  resultsText: {
    fontSize: 14,
    color: '#999',
    fontFamily: Fonts.regular,
  },
  boldText: {
    fontFamily: Fonts.bold,
    color: '#333',
  },
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: '#333',
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#666',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productsContainer: {
    paddingBottom: 20,
  },
  productCard: {
    marginBottom: 20,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  favoriteIconActive: {
    color: '#FF1744',
  },
  imageCountBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  imageCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  productInfo: {
    paddingVertical: 16,
  },
  productTitle: {
    fontSize: 17,
    fontFamily: Fonts.bold,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 24,
  },
  productSize: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#666666',
  },
  productActionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingBottom: 16,
    gap: 8,
  },
  productConsultationButton: {
    flex: 2,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  productConsultationButtonText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  productQuoteButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  productQuoteButtonText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#ffffff',
    textAlign: 'center',
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

export default ProductListingScreen;