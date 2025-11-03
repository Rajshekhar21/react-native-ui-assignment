import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

interface ProfileHeaderProps {
  userName: string;
  userEmail: string;
  onEdit?: () => void;
  onSave?: () => void;
  showSave?: boolean;
  showEdit?: boolean;
  showUserInfo?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  userEmail,
  onEdit,
  onSave,
  showSave = false,
  showEdit = true,
  showUserInfo = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            source={require('../../assets/images/decor-mate-logo.png')}
            style={{ width: 48, height: 48, marginRight: 4 }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginLeft: -10 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: Colors.textPrimary }}>ecor </Text>
            <Text style={{ fontSize: 25, fontWeight: '600', color: Colors.textPrimary }}>Mate</Text>
          </View>
        </View>
      </View>
      
      {showUserInfo && (
        <View style={styles.centerSection}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      )}
      
      <View style={styles.rightSection}>
        {showEdit && (
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        )}
        {showSave && (
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background,
  },
  leftSection: {
    flex: 1,
  },
  logo: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
});

export default ProfileHeader;
