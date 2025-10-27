import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '../utils/AsyncStorageFallback';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

const AsyncStorageTest: React.FC = () => {
  const [testValue, setTestValue] = useState<string>('');
  const [storedValue, setStoredValue] = useState<string>('');

  const testAsyncStorage = async () => {
    try {
      const testKey = 'test_key';
      const testData = 'Hello AsyncStorage!';
      
      // Test setItem
      await AsyncStorage.setItem(testKey, testData);
      Alert.alert('Success', 'AsyncStorage setItem working!');
      
      // Test getItem
      const retrieved = await AsyncStorage.getItem(testKey);
      setStoredValue(retrieved || '');
      Alert.alert('Success', `Retrieved: ${retrieved}`);
      
    } catch (error) {
      Alert.alert('Error', `AsyncStorage test failed: ${error}`);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setStoredValue('');
      Alert.alert('Success', 'AsyncStorage cleared!');
    } catch (error) {
      Alert.alert('Error', `Clear failed: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage Test</Text>
      
      <TouchableOpacity style={styles.button} onPress={testAsyncStorage}>
        <Text style={styles.buttonText}>Test AsyncStorage</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearStorage}>
        <Text style={styles.buttonText}>Clear Storage</Text>
      </TouchableOpacity>
      
      {storedValue ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Stored Value: {storedValue}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: Colors.textSecondary,
  },
  buttonText: {
    color: Colors.background,
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
  },
  resultText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textPrimary,
  },
});

export default AsyncStorageTest;
