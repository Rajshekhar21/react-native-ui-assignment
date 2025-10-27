import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

const FirebaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };

  const testFirebaseConfig = async () => {
    try {
      addResult('Testing Firebase configuration...');
      
      // Test Firebase config import
      const { app, auth } = await import('../config/firebase');
      
      if (app) {
        addResult('✅ Firebase App: Initialized');
      } else {
        addResult('❌ Firebase App: Not initialized');
      }
      
      if (auth) {
        addResult('✅ Firebase Auth: Available');
      } else {
        addResult('❌ Firebase Auth: Not available');
      }
      
    } catch (error) {
      addResult(`❌ Firebase Config Error: ${error}`);
    }
  };

  const testFirebaseAuth = async () => {
    try {
      addResult('Testing Firebase Auth...');
      
      const { getCurrentUser, isAuthenticated } = await import('../services/firebaseAuth');
      
      const currentUser = getCurrentUser();
      const authenticated = isAuthenticated();
      
      addResult(`Current User: ${currentUser ? 'Logged in' : 'Not logged in'}`);
      addResult(`Authenticated: ${authenticated ? 'Yes' : 'No'}`);
      
    } catch (error) {
      addResult(`❌ Firebase Auth Error: ${error}`);
    }
  };

  const runAllTests = async () => {
    setTestResults([]);
    addResult('Starting Firebase Tests...');
    
    await testFirebaseConfig();
    await testFirebaseAuth();
    
    addResult('Firebase tests completed!');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Test</Text>
      
      <TouchableOpacity style={styles.button} onPress={runAllTests}>
        <Text style={styles.buttonText}>Run Firebase Tests</Text>
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

export default FirebaseTest;
