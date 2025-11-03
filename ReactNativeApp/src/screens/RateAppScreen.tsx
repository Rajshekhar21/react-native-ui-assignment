import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

const { width } = Dimensions.get('window');

type RateAppScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RateApp'
>;

interface Props {
  navigation: RateAppScreenNavigationProp;
}

const RateAppScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const ratings = [1, 2, 3, 4, 5];

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (selectedRating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting.');
      return;
    }

    // Here you would typically send the rating and feedback to your backend
    console.log('Rating submitted:', selectedRating);
    console.log('Feedback:', feedback);
    
    setSubmitted(true);
    Alert.alert(
      'Thank You!',
      'Your rating and feedback have been submitted. We appreciate your input!',
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedRating(0);
            setFeedback('');
            setSubmitted(false);
          },
        },
      ]
    );
  };

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop' }}
        style={styles.heroImage}
      />
      <View style={styles.heroOverlay}>
        <Text style={styles.heroTitle}>Rate Our App</Text>
        <Text style={styles.heroSubtitle}>Your feedback helps us improve</Text>
      </View>
    </View>
  );

  const renderRatingSection = () => (
    <View style={styles.ratingSection}>
      <Text style={styles.sectionTitle}>How would you rate your experience?</Text>
      <Text style={styles.sectionSubtitle}>
        Tap on a star to rate from 1 to 5
      </Text>
      <View style={styles.starsContainer}>
        {ratings.map((rating) => (
          <TouchableOpacity
            key={rating}
            style={styles.starButton}
            onPress={() => handleRatingSelect(rating)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.starIcon,
                selectedRating >= rating && styles.starIconSelected,
              ]}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedRating > 0 && (
        <Text style={styles.ratingText}>
          {selectedRating === 1 && 'Poor'}
          {selectedRating === 2 && 'Fair'}
          {selectedRating === 3 && 'Good'}
          {selectedRating === 4 && 'Very Good'}
          {selectedRating === 5 && 'Excellent'}
        </Text>
      )}
    </View>
  );

  const renderFeedbackSection = () => (
    <View style={styles.feedbackSection}>
      <Text style={styles.sectionTitle}>Tell us more</Text>
      <Text style={styles.sectionSubtitle}>
        Share your thoughts, suggestions, or any issues you encountered
      </Text>
      <TextInput
        style={styles.feedbackInput}
        placeholder="Write your feedback here..."
        placeholderTextColor={Colors.textTertiary}
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
      <Text style={styles.characterCount}>
        {feedback.length} / 500 characters
      </Text>
    </View>
  );

  const renderFeaturesSection = () => (
    <View style={styles.featuresSection}>
      <Text style={styles.sectionTitle}>What do you like most about Decor Mate?</Text>
      <View style={styles.featuresGrid}>
        {[
          'Easy to Use',
          'Beautiful Design',
          'Great Service Selection',
          'Fast Booking',
          'Professional Designers',
          'Customer Support',
        ].map((feature, index) => (
          <View key={index} style={styles.featureTag}>
            <Text style={styles.featureTagText}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAppStoreSection = () => (
    <View style={styles.appStoreSection}>
      <Text style={styles.sectionTitle}>Love our app?</Text>
      <Text style={styles.sectionSubtitle}>
        Help others discover Decor Mate by leaving a review on the app store
      </Text>
      <View style={styles.appStoreButtons}>
        <TouchableOpacity style={styles.appStoreButton}>
          <Text style={styles.appStoreButtonText}>Rate on App Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.appStoreButton}>
          <Text style={styles.appStoreButtonText}>Rate on Google Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderHeroSection()}
      
      <View style={styles.contentSection}>
        {renderRatingSection()}
        {renderFeedbackSection()}
        {renderFeaturesSection()}
        {renderAppStoreSection()}
        
        <TouchableOpacity
          style={[
            styles.submitButton,
            selectedRating === 0 && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={selectedRating === 0}
        >
          <Text style={styles.submitButtonText}>Submit Rating</Text>
        </TouchableOpacity>

        <View style={styles.thankYouSection}>
          <Text style={styles.thankYouText}>
            We value your opinion and use your feedback to make Decor Mate better every day.
          </Text>
        </View>
      </View>
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
    height: 300,
    position: 'relative',
  },
  heroImage: {
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroTitle: {
    fontSize: 48,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    textAlign: 'center',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.background,
  },
  ratingSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  starButton: {
    padding: 8,
  },
  starIcon: {
    fontSize: 48,
    color: Colors.border,
  },
  starIconSelected: {
    color: '#FFD700',
  },
  ratingText: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginTop: 8,
  },
  feedbackSection: {
    marginBottom: 40,
  },
  feedbackInput: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 8,
  },
  characterCount: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textTertiary,
    textAlign: 'right',
    marginTop: 8,
  },
  featuresSection: {
    marginBottom: 40,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  featureTag: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureTagText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
  appStoreSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  appStoreButtons: {
    width: '100%',
    gap: 12,
    marginTop: 16,
  },
  appStoreButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  appStoreButtonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textWhite,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.textTertiary,
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
  },
  thankYouSection: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  thankYouText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default RateAppScreen;

