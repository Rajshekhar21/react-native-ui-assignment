import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';
import { getAllVendors } from '../services/vendorService';

const { width } = Dimensions.get('window');

type FindProsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FindPros'
>;

interface Props {
  navigation: FindProsScreenNavigationProp;
}

interface Professional {
  _id: string;
  id?: string;
  title: string;
  name: string;
  location: {
    street?: string;
    area?: string;
    city?: string;
    pincode?: string;
    geo?: {
      type: 'Point';
      coordinates: [number, number];
    };
  };
  categories: string[];
  images?: {
    profileImage?: string;
    coverImage?: string;
  };
}

const FindProsScreen: React.FC<Props> = ({ navigation }) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Dehradun');
  const [selectedPincode, setSelectedPincode] = useState('Pincode');
  const [selectedRadius, setSelectedRadius] = useState('Radius');
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Filter dropdown states
  const [locationDropdownVisible, setLocationDropdownVisible] = useState(false);
  const [pincodeDropdownVisible, setPincodeDropdownVisible] = useState(false);
  const [radiusDropdownVisible, setRadiusDropdownVisible] = useState(false);
  
  // Mock data for dropdowns
  const locationOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Dehradun', 'Pune', 'Chennai'];
  const pincodeOptions = ['248001', '248002', '248003', '248004', '248005', '248006'];
  const radiusOptions = ['1 Km', '3 Km', '5 Km', '10 Km', '20 Km'];

  useEffect(() => {
    fetchProfessionals();
  }, [activeFilters]);

  useEffect(() => {
    applyFilters();
  }, [professionals, searchQuery, activeFilters]);

  const fetchProfessionals = async () => {
    try {
      setLoading(true);
      
      // Build query parameters based on active filters
      const filters: any = {
        page: 1,
        limit: 20,
      };
      
      // Add location filter if not the default
      if (selectedLocation !== 'Dehradun') {
        filters.location = selectedLocation;
      }
      
      // Fetch vendors from API
      const response = await getAllVendors(filters);
      
      if (__DEV__) {
        console.log('✅ getAllVendors response:', JSON.stringify(response, null, 2));
      }
      
      // Map vendor data to professional format
      const mappedProfessionals = (response.vendors || []).map((vendor: any) => ({
        _id: vendor._id || vendor.id,
        id: vendor.id || vendor._id,
        title: vendor.title || 'Interior Designer',
        name: vendor.name || '',
        location: vendor.location || {
          street: '',
          area: '',
          city: '',
          pincode: '',
        },
        categories: vendor.categories || [],
        images: vendor.images || {
          profileImage: vendor.images?.profileImage || 'https://via.placeholder.com/400x250',
          coverImage: vendor.images?.coverImage,
        },
      }));
      
      setProfessionals(mappedProfessionals);
    } catch (error) {
      console.error('Error fetching professionals:', error);
      // Fallback to empty array if API fails
      setProfessionals([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...professionals];

    // Apply search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(professional => 
        professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professional.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professional.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProfessionals(filtered);
  };

  const handleGetStarted = () => {
    Alert.alert('Get Started', 'Feature coming soon!');
  };

  const handleSendEnquiry = (professionalId: string) => {
    Alert.alert('Send Enquiry', `Enquiry for professional ${professionalId}`);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationDropdownVisible(false);
    
    // Add to active filters if not already there
    if (!activeFilters.includes(`${location}`)) {
      setActiveFilters([...activeFilters, `${location}`]);
    }
    
    // Trigger refetch
    setTimeout(() => fetchProfessionals(), 100);
  };

  const handlePincodeSelect = (pincode: string) => {
    setSelectedPincode(pincode);
    setPincodeDropdownVisible(false);
    
    // Add to active filters
    if (!activeFilters.includes(`Pincode: ${pincode}`)) {
      setActiveFilters([...activeFilters, `Pincode: ${pincode}`]);
    }
  };

  const handleRadiusSelect = (radius: string) => {
    setSelectedRadius(radius);
    setRadiusDropdownVisible(false);
    
    // Add to active filters
    const filterTag = `${selectedLocation}/${radius}`;
    if (!activeFilters.includes(filterTag)) {
      setActiveFilters([...activeFilters, filterTag]);
    }
  };

  const handleRemoveFilter = (filterToRemove: string) => {
    const updatedFilters = activeFilters.filter(f => f !== filterToRemove);
    setActiveFilters(updatedFilters);
    
    // If removing location filter, reset to default
    if (!updatedFilters.includes(selectedLocation)) {
      setSelectedLocation('Dehradun');
      setSelectedPincode('Pincode');
      setSelectedRadius('Radius');
    }
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setSelectedLocation('Dehradun');
    setSelectedPincode('Pincode');
    setSelectedRadius('Radius');
    setSearchQuery('');
  };

  const renderProfessionalCard = (professional: Professional) => {
    const locationText = professional.location
      ? `${professional.location.street || ''}, ${professional.location.area || ''}, ${professional.location.city || ''}`
      : 'Location not available';

    return (
      <View key={professional._id} style={styles.card}>
        <View style={styles.cardImageContainer}>
          <Image
            source={{ uri: professional.images?.profileImage || 'https://via.placeholder.com/400x250' }}
            style={styles.cardImage}
          />
          <View style={styles.cardDateBadge}>
            <Text style={styles.cardDateText}>05/09/20XX</Text>
          </View>
          <View style={styles.cardOverlay}>
            <View style={styles.masterclassBadge}>
              <Text style={styles.wavyLine}>╱╲╱╲╱╲</Text>
              <Text style={styles.masterclassTitle}>INTERIOR DECORATION MASTERCLASS</Text>
              <Text style={styles.wavyLine}>╱╲╱╲╱╲</Text>
            </View>
            <Text style={styles.masterclassSubtitle}>
              Set Your Inner Designer Free with Inspiring ideas for Decor! Illustrated explanations, basic theory, creating sample boards.
            </Text>
          </View>
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.professionalName}>{professional.name}</Text>
          
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{locationText}</Text>
          </View>
          
          <View style={styles.tagsContainer}>
            {professional.categories.slice(0, 2).map((category, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{category}</Text>
              </View>
            ))}
            {professional.categories.length > 2 && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>More...</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity
            style={styles.enquiryButton}
            onPress={() => handleSendEnquiry(professional._id || professional.id || '')}
          >
            <Text style={styles.enquiryButtonText}>Send Enquiry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.logo}>LOGO</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileView')}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>🔍</Text>
            <Text style={styles.filterButtonText}>AllFilters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setLocationDropdownVisible(true)}>
            <Text style={styles.filterIcon}>📍</Text>
            <Text style={styles.filterButtonText}>{selectedLocation}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setPincodeDropdownVisible(true)}>
            <Text style={styles.filterIcon}>📍</Text>
            <Text style={styles.filterButtonText}>{selectedPincode}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setRadiusDropdownVisible(true)}>
            <Text style={styles.filterIcon}>📏</Text>
            <Text style={styles.filterButtonText}>{selectedRadius}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <View style={styles.activeFiltersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activeFilters.map((filter, index) => (
              <View key={index} style={styles.activeFilterTag}>
                <Text style={styles.activeFilterText}>{filter}</Text>
                <TouchableOpacity onPress={() => handleRemoveFilter(filter)}>
                  <Text style={styles.removeFilterIcon}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.clearAllButton} onPress={handleClearFilters}>
              <Text style={styles.clearAllText}>Clear all filters</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Your Search Ends Here</Text>
            <Text style={styles.heroSubtitle}>Find the Right Designer</Text>
            
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>📍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Zip Code"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
                <Text style={styles.getStartedButtonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Professional Listings */}
        <View style={styles.listingsContainer}>
          {loading ? (
            <Text style={styles.loadingText}>Loading professionals...</Text>
          ) : professionals.length === 0 ? (
            <Text style={styles.emptyText}>No professionals found</Text>
          ) : (
            filteredProfessionals.length > 0
              ? filteredProfessionals.map((professional) => renderProfessionalCard(professional))
              : professionals.map((professional) => renderProfessionalCard(professional))
          )}
        </View>
      </ScrollView>

      {/* Location Dropdown Modal */}
      <Modal
        visible={locationDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLocationDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setLocationDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.dropdownTitle}>Select Location</Text>
            <FlatList
              data={locationOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleLocationSelect(item)}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                  {selectedLocation === item && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Pincode Dropdown Modal */}
      <Modal
        visible={pincodeDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPincodeDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setPincodeDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.dropdownTitle}>Select Pincode</Text>
            <FlatList
              data={pincodeOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handlePincodeSelect(item)}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                  {selectedPincode === item && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Radius Dropdown Modal */}
      <Modal
        visible={radiusDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setRadiusDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setRadiusDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.dropdownTitle}>Select Radius</Text>
            <FlatList
              data={radiusOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleRadiusSelect(item)}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                  {selectedRadius === item && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  filterIcon: {
    fontSize: 12,
  },
  filterButtonText: {
    fontSize: 11,
    color: '#333',
    fontFamily: Fonts.regular,
  },
  dropdownIcon: {
    fontSize: 8,
    color: '#666',
    marginLeft: 2,
  },
  profileIcon: {
    fontSize: 24,
    color: '#333',
  },
  activeFiltersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activeFilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    gap: 6,
  },
  activeFilterText: {
    fontSize: 12,
    color: '#1976D2',
    fontFamily: Fonts.regular,
  },
  removeFilterIcon: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  clearAllButton: {
    paddingVertical: 6,
  },
  clearAllText: {
    fontSize: 12,
    color: '#FF3B30',
    fontFamily: Fonts.medium,
    textDecorationLine: 'underline',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    height: 250,
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: Fonts.regular,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  getStartedButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Fonts.semiBold,
  },
  listingsContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImageContainer: {
    position: 'relative',
    height: 220,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardDateBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cardDateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
  },
  masterclassBadge: {
    alignItems: 'center',
    marginBottom: 8,
  },
  wavyLine: {
    fontSize: 8,
    color: '#FFFFFF',
    fontFamily: Fonts.regular,
  },
  masterclassTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 4,
    fontFamily: Fonts.bold,
  },
  masterclassSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Fonts.regular,
  },
  cardContent: {
    padding: 16,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: Fonts.bold,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationIcon: {
    fontSize: 14,
    color: '#FF3B30',
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    fontFamily: Fonts.regular,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#006064',
    fontFamily: Fonts.medium,
  },
  enquiryButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  enquiryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.semiBold,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 14,
    color: '#666',
    fontFamily: Fonts.regular,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 14,
    color: '#999',
    fontFamily: Fonts.regular,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: width * 0.8,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    fontFamily: Fonts.bold,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
    fontFamily: Fonts.regular,
  },
  checkmark: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default FindProsScreen;

