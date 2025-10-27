import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

const SimpleFirebaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };

  const testBasicImport = async () => {
    try {
      addResult('Testing basic React Native Firebase import...');
      
      // Test basic import without immediate usage
      const firebaseAuth = await import('@react-native-firebase/auth');
      addResult('✅ React Native Firebase Auth: Imported successfully');
      
      // Test if the module is available
      if (firebaseAuth.default) {
        addResult('✅ Firebase Auth Module: Available');
        
        // Test basic functionality without creating event emitters
        try {
          const currentUser = firebaseAuth.default().currentUser;
          addResult(`Current User: ${currentUser ? 'Logged in' : 'Not logged in'}`);
          addResult('✅ Firebase Auth: Basic functionality working');
        } catch (error) {
          addResult(`⚠️ Firebase Auth: ${error}`);
        }
        
      } else {
        addResult('❌ Firebase Auth Module: Not available');
      }
      
    } catch (error) {
      addResult(`❌ Import Error: ${error}`);
    }
  };

  const testFirebaseConfig = async () => {
    try {
      addResult('Testing Firebase configuration...');
      
      // Test our Firebase config
      const { auth } = await import('../config/firebase');
      
      if (auth) {
        addResult('✅ Firebase Config: Loaded successfully');
        
        // Test auth methods without creating event emitters
        try {
          const currentUser = auth().currentUser;
          addResult(`Current User: ${currentUser ? 'Logged in' : 'Not logged in'}`);
          addResult('✅ Firebase Config: Working');
        } catch (error) {
          addResult(`⚠️ Firebase Config: ${error}`);
        }
        
      } else {
        addResult('❌ Firebase Config: Not loaded');
      }
      
    } catch (error) {
      addResult(`❌ Firebase Config Error: ${error}`);
    }
  };

  const runAllTests = async () => {
    setTestResults([]);
    addResult('Starting Simple Firebase Tests...');
    
    await testBasicImport();
    await testFirebaseConfig();
    
    addResult('Simple Firebase tests completed!');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Firebase Test</Text>
      <Text style={styles.subtitle}>Testing React Native Firebase without NativeEventEmitter</Text>
      
      <TouchableOpacity style={styles.button} onPress={runAllTests}>
        <Text style={styles.buttonText}>Run Simple Firebase Tests</Text>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
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

export default SimpleFirebaseTest;
