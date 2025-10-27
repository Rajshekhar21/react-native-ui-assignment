import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuthToken, setAuthToken, clearAuthData } from '../services/apiClient';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

const APITest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };

  const testAsyncStorage = async () => {
    try {
      addResult('Testing AsyncStorage...');
      await setAuthToken('test-token-123');
      const token = await getAuthToken();
      if (token === 'test-token-123') {
        addResult('✅ AsyncStorage: Working');
      } else {
        addResult('❌ AsyncStorage: Failed');
      }
    } catch (error) {
      addResult(`❌ AsyncStorage: Error - ${error}`);
    }
  };

  const testAPIClient = async () => {
    try {
      addResult('Testing API Client...');
      // Test a simple API call (this will fail but should not crash)
      const response = await fetch('https://api.godecormate.com/api/health');
      addResult('✅ API Client: Network working');
    } catch (error) {
      addResult(`⚠️ API Client: Network error (expected) - ${error}`);
    }
  };

  const testFirebase = async () => {
    try {
      addResult('Testing Firebase...');
      const { auth } = await import('../config/firebase');
      if (auth) {
        addResult('✅ Firebase: Initialized');
      } else {
        addResult('❌ Firebase: Not initialized');
      }
    } catch (error) {
      addResult(`❌ Firebase: Error - ${error}`);
    }
  };

  const runAllTests = async () => {
    setTestResults([]);
    addResult('Starting API Integration Tests...');
    
    await testAsyncStorage();
    await testAPIClient();
    await testFirebase();
    
    addResult('Tests completed!');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Integration Test</Text>
      
      <TouchableOpacity style={styles.button} onPress={runAllTests}>
        <Text style={styles.buttonText}>Run Tests</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearResults}>
        <Text style={styles.buttonText}>Clear Results</Text>
      </TouchableOpacity>
      
      <View style={styles.resultsContainer}>
        {testResults.map((result, index) => (
          <Text key={index} style={styles.resultText}>
            {result}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
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
  resultsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
  },
  resultText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 5,
  },
});

export default APITest;
