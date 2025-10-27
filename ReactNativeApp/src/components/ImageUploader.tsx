import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

interface ImageUploaderProps {
  label: string;
  onImageSelected: (imageUri: string) => void;
  currentImage?: string;
  supportedFormats?: string[];
  maxSizeMB?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  onImageSelected,
  currentImage,
  supportedFormats = ['JPG', 'JPEG', 'PNG'],
  maxSizeMB = 1,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(currentImage || null);

  const handleImageSelection = () => {
    // In a real implementation, you would use react-native-image-picker
    // For now, we'll simulate with a placeholder
    Alert.alert(
      'Select Image',
      'Choose an image source',
      [
        { text: 'Camera', onPress: () => selectFromCamera() },
        { text: 'Gallery', onPress: () => selectFromGallery() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const selectFromCamera = () => {
    // Simulate camera selection
    const mockImageUri = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';
    setSelectedImage(mockImageUri);
    onImageSelected(mockImageUri);
  };

  const selectFromGallery = () => {
    // Simulate gallery selection
    const mockImageUri = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face';
    setSelectedImage(mockImageUri);
    onImageSelected(mockImageUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity style={styles.uploadButton} onPress={handleImageSelection}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Text style={styles.uploadIcon}>📷</Text>
            <Text style={styles.uploadText}>Upload From Gallery</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <Text style={styles.formatText}>
        Supported: {supportedFormats.join(', ')} • Less than {maxSizeMB}MB
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
  },
  uploadPlaceholder: {
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textSecondary,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  formatText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ImageUploader;
