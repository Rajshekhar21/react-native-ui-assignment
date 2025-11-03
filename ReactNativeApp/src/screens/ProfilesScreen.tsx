import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';
import { getFeaturedDesigners, FeaturedDesigner } from '../services/homeService';
import { apiGet } from '../services/apiClient';
import FilterIcon from '../../assets/images/filter.svg';

const { width } = Dimensions.get('window');

type ProfilesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profiles'
>;

interface Props {
  navigation: ProfilesScreenNavigationProp;
}

const ProfilesScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [designers, setDesigners] = useState<FeaturedDesigner[]>([]);
  const [filteredDesigners, setFilteredDesigners] = useState<FeaturedDesigner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const locations = ['All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'];
  const experienceRanges = ['All Experience', '0-2 years', '3-5 years', '6-10 years', '10+ years'];
  const specializations = ['All Specializations', 'Residential', 'Commercial', 'Hospitality', 'Turnkey'];

  useEffect(() => {
    fetchAllDesigners();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedLocation, selectedExperience, selectedSpecialization, designers]);

  const fetchAllDesigners = async () => {
    try {
      setLoading(true);
      // Fetch all designers (not just featured)
      const response = await apiGet('/vendors?limit=100');
      const data = response?.data?.vendors || response?.vendors || response?.data || response;
      
      if (Array.isArray(data)) {
        setDesigners(data);
        setFilteredDesigners(data);
      } else {
        // Fallback to featured designers if all designers endpoint doesn't work
        const featured = await getFeaturedDesigners();
        setDesigners(featured);
        setFilteredDesigners(featured);
      }
    } catch (error) {
      console.error('Error fetching designers:', error);
      // Fallback to featured designers
      try {
        const featured = await getFeaturedDesigners();
        setDesigners(featured);
        setFilteredDesigners(featured);
      } catch (fallbackError) {
        console.error('Error fetching featured designers:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...designers];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(designer =>
        designer.name.toLowerCase().includes(query) ||
        (designer.profession || '').toLowerCase().includes(query) ||
        (typeof designer.location === 'string' 
          ? designer.location.toLowerCase().includes(query)
          : (designer.location as any)?.city?.toLowerCase().includes(query) ||
            (designer.location as any)?.area?.toLowerCase().includes(query))
      );
    }

    // Location filter
    if (selectedLocation && selectedLocation !== 'All Locations') {
      filtered = filtered.filter(designer =>
        typeof designer.location === 'string'
          ? designer.location.includes(selectedLocation)
          : (designer.location as any)?.city === selectedLocation ||
            (designer.location as any)?.area === selectedLocation
      );
    }

    // Experience filter
    if (selectedExperience && selectedExperience !== 'All Experience') {
      filtered = filtered.filter(designer => {
        const expYears = designer.experienceYears || 
          parseInt((designer.experience || '0').replace(/[^0-9]/g, '')) || 0;
        
        if (selectedExperience === '0-2 years') {
          return expYears >= 0 && expYears <= 2;
        } else if (selectedExperience === '3-5 years') {
          return expYears >= 3 && expYears <= 5;
        } else if (selectedExperience === '6-10 years') {
          return expYears >= 6 && expYears <= 10;
        } else if (selectedExperience === '10+ years') {
          return expYears > 10;
        }
        return true;
      });
    }

    // Specialization filter (this would need to be added to the designer model)
    // For now, we'll skip this or use a placeholder

    setFilteredDesigners(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedExperience('All Experience');
    setSelectedSpecialization('All Specializations');
  };

  const handleDesignerProfile = (designerId: string) => {
    navigation.navigate('ProfileView');
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search designers..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setShowFilters(!showFilters)}
      >
        <Text style={styles.filterButtonText}>Filter</Text>
        <FilterIcon width={16} height={16} fill={Colors.textWhite} />
      </TouchableOpacity>
    </View>
  );

  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <View style={styles.filtersContainer}>
        {/* Location Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {locations.map((location) => (
              <TouchableOpacity
                key={location}
                style={[
                  styles.filterChip,
                  selectedLocation === location || (!selectedLocation && location === 'All Locations') && styles.filterChipActive,
                ]}
                onPress={() => setSelectedLocation(location === 'All Locations' ? '' : location)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    (selectedLocation === location || (!selectedLocation && location === 'All Locations')) && styles.filterChipTextActive,
                  ]}
                >
                  {location}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Experience Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Experience</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {experienceRanges.map((exp) => (
              <TouchableOpacity
                key={exp}
                style={[
                  styles.filterChip,
                  selectedExperience === exp || (!selectedExperience && exp === 'All Experience') && styles.filterChipActive,
                ]}
                onPress={() => setSelectedExperience(exp === 'All Experience' ? '' : exp)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    (selectedExperience === exp || (!selectedExperience && exp === 'All Experience')) && styles.filterChipTextActive,
                  ]}
                >
                  {exp}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Clear Filters Button */}
        <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
          <Text style={styles.clearFiltersText}>Clear All Filters</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDesignerCard = (designer: FeaturedDesigner) => (
    <TouchableOpacity
      key={designer.id}
      style={styles.designerCard}
      onPress={() => handleDesignerProfile(designer.id)}
    >
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
        <Text style={styles.designerCardName}>{designer.name}</Text>
        <Text style={styles.designerCardProfession}>
          {designer.profession || 'Interior Designer'}
        </Text>
        <View style={styles.designerCardMeta}>
          <Text style={styles.designerCardExperience}>
            {designer.experienceYears || designer.experience || 0} years exp.
          </Text>
          <Text style={styles.designerCardSeparator}>•</Text>
          <Text style={styles.designerCardLocation}>
            {typeof designer.location === 'string' 
              ? designer.location 
              : `${(designer.location as any)?.city || 'Unknown'}${(designer.location as any)?.area ? ', ' + (designer.location as any).area : ''}`}
          </Text>
        </View>
        {designer.shortDescription && (
          <Text style={styles.designerCardDescription} numberOfLines={2}>
            {designer.shortDescription}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading designers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {renderFilters()}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredDesigners.length} {filteredDesigners.length === 1 ? 'Designer' : 'Designers'} Found
          </Text>
        </View>
        {filteredDesigners.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>👤</Text>
            <Text style={styles.emptyText}>No designers found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.designersGrid}>
            {filteredDesigners.map(renderDesignerCard)}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    paddingVertical: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  filterButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    marginRight: 6,
  },
  filtersContainer: {
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterSection: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  filterChipTextActive: {
    color: Colors.textWhite,
    fontFamily: Fonts.semiBold,
  },
  clearFiltersButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  clearFiltersText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  resultsHeader: {
    marginBottom: 20,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  designersGrid: {
    flexDirection: 'column',
  },
  designerCard: {
    flexDirection: 'row',
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
  designerImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  designerImage: {
    width: 56,
    height: 56,
    resizeMode: 'cover',
  },
  designerImagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 12,
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
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  designerCardProfession: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.primary,
    marginBottom: 6,
  },
  designerCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  designerCardExperience: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  designerCardSeparator: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginHorizontal: 6,
  },
  designerCardLocation: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  designerCardDescription: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
});

export default ProfilesScreen;

