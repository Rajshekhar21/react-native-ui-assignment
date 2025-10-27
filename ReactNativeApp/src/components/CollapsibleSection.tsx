import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  isExpanded = false,
  onToggle,
}) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [animation] = useState(new Animated.Value(expanded ? 1 : 0));

  const toggleSection = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle?.(newExpanded);

    Animated.timing(animation, {
      toValue: newExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleSection}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View
          style={[
            styles.arrow,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        >
          <Text style={styles.arrowText}>▼</Text>
        </Animated.View>
      </TouchableOpacity>
      
      {expanded && (
        <Animated.View
          style={[
            styles.content,
            {
              opacity: animation,
              transform: [
                {
                  scaleY: heightInterpolate,
                },
              ],
            },
          ]}
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  arrow: {
    padding: 4,
  },
  arrowText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  content: {
    paddingTop: 16,
  },
});

export default CollapsibleSection;
