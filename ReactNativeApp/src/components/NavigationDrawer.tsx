import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

const { width, height } = Dimensions.get('window');

interface NavigationDrawerProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  visible,
  onClose,
  onNavigate,
}) => {
  const slideAnim = useRef(new Animated.Value(-width)).current;

  const menuItems = [
    { id: 'services', title: 'Services', screen: 'Services' },
    { id: 'portfolio', title: 'Portfolio', screen: 'Portfolio' },
    { id: 'about', title: 'About Us', screen: 'AboutUs' },
    { id: 'terms', title: 'Terms & Condition', screen: 'TermsCondition' },
    { id: 'rate', title: 'Rate Our App', screen: 'RateApp' },
  ];

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleMenuPress = (screen: string) => {
    onNavigate(screen);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.1)" barStyle="light-content" />
      <View style={styles.overlay}>
        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoIconText}>D</Text>
              </View>
              <Text style={styles.logoText}>Decor Mate</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item.screen)}
                >
                  <Text style={styles.menuItemText}>{item.title}</Text>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
                {index < menuItems.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  drawer: {
    width: width * 1,
    height: height,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FF6F61',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoIconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#333333',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
  menuContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#333333',
  },
  menuItemArrow: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: 20,
    marginRight: 20,
  },
});

export default NavigationDrawer;
