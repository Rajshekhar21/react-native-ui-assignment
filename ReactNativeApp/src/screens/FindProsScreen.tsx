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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { getAllVendors } from '../services/vendorService';
import FilterIcon from '../../assets/images/filter.svg';

const locationIcon = require('../../assets/images/locationicon.png');
const radiusIcon = require('../../assets/images/radius.png');

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.headerButtons}
        >
          <TouchableOpacity style={[styles.filterButton, styles.allFiltersButton]}>
            <FilterIcon width={16} height={16} style={styles.filterSvgIcon} />
            <Text style={[styles.filterButtonText, styles.allFiltersButtonText]}>All Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setLocationDropdownVisible(true)}
          >
            <Image source={locationIcon} style={styles.filterIconImage} />
            <Text style={styles.filterButtonText}>{selectedLocation}</Text>
            <Text style={styles.dropdownIcon}>▾</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setPincodeDropdownVisible(true)}
          >
            <Image source={locationIcon} style={styles.filterIconImage} />
            <Text style={styles.filterButtonText}>{selectedPincode}</Text>
            <Text style={styles.dropdownIcon}>▾</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setRadiusDropdownVisible(true)}
          >
            <Image source={radiusIcon} style={styles.filterIconImage} />
            <Text style={styles.filterButtonText}>{selectedRadius}</Text>
            <Text style={styles.dropdownIcon}>▾</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <View style={styles.activeFiltersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.activeFiltersScroll}
          >
            {activeFilters.map((filter, index) => (
              <View key={index} style={styles.activeFilterTag}>
                <Text style={styles.activeFilterText}>{filter}</Text>
                <TouchableOpacity
                  style={styles.removeFilterButton}
                  onPress={() => handleRemoveFilter(filter)}
                  accessibilityLabel={`Remove ${filter}`}
                >
                  <Text style={styles.removeFilterIcon}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.clearAllButton}
              onPress={handleClearFilters}
              accessibilityRole="button"
            >
              <Text style={styles.clearAllIcon}>✕</Text>
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    gap: 8,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  allFiltersButton: {
    backgroundColor: '#E6F3F1',
    borderColor: '#0F766E',
  },
  filterSvgIcon: {
    marginRight: 4,
  },
  filterButtonText: {
    fontSize: 12,
    color: '#1F2937',
    fontFamily: Fonts.regular,
  },
  allFiltersButtonText: {
    color: '#0F766E',
    fontFamily: Fonts.semiBold,
  },
  filterIconImage: {
    width: 16,
    height: 16,
    marginRight: 6,
    resizeMode: 'contain',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  activeFiltersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F1F8F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activeFiltersScroll: {
    alignItems: 'center',
  },
  activeFilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F766E',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    marginRight: 10,
    gap: 8,
  },
  activeFilterText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: Fonts.regular,
  },
  removeFilterButton: {
    paddingLeft: 4,
  },
  removeFilterIcon: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  clearAllText: {
    fontSize: 12,
    color: '#0F766E',
    fontFamily: Fonts.medium,
  },
  clearAllIcon: {
    fontSize: 12,
    color: '#0F766E',
    marginRight: 4,
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

