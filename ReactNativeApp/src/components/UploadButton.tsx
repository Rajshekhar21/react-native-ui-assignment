import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

interface UploadButtonProps {
  title: string;
  onPress: () => void;
  imageUri?: string;
  disabled?: boolean;
  style?: any;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  title,
  onPress,
  imageUri,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        disabled && styles.containerDisabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {imageUri ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Change</Text>
          </View>
        </View>
      ) : (
        <View style={styles.uploadContainer}>
          <Text style={styles.uploadIcon}>📷</Text>
          <Text style={[
            styles.uploadText,
            disabled && styles.uploadTextDisabled
          ]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundSecondary,
    minHeight: 120,
  },
  containerDisabled: {
    opacity: 0.6,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  uploadTextDisabled: {
    color: Colors.textTertiary,
  },
});

export default UploadButton;
