import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

const FirebaseRNTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };

  const testFirebaseRNImport = async () => {
    try {
      addResult('Testing React Native Firebase import...');
      
      // Test Firebase Auth import
      const auth = await import('@react-native-firebase/auth');
      addResult('✅ React Native Firebase Auth: Imported successfully');
      
      // Test if auth is available
      if (auth.default) {
        addResult('✅ Firebase Auth: Available');
        
        // Test current user
        const currentUser = auth.default().currentUser;
        addResult(`Current User: ${currentUser ? 'Logged in' : 'Not logged in'}`);
        
        // Test auth state listener
        const unsubscribe = auth.default().onAuthStateChanged((user) => {
          addResult(`Auth State Changed: ${user ? 'User logged in' : 'User logged out'}`);
        });
        
        // Unsubscribe after a short delay
        setTimeout(() => {
          unsubscribe();
          addResult('✅ Auth State Listener: Working');
        }, 1000);
        
      } else {
        addResult('❌ Firebase Auth: Not available');
      }
      
    } catch (error) {
      addResult(`❌ React Native Firebase Error: ${error}`);
    }
  };

  const testFirebaseConfig = async () => {
    try {
      addResult('Testing Firebase configuration...');
      
      const { auth } = await import('../config/firebase');
      
      if (auth) {
        addResult('✅ Firebase Config: Loaded successfully');
        
        // Test auth methods
        const currentUser = auth().currentUser;
        addResult(`Current User: ${currentUser ? 'Logged in' : 'Not logged in'}`);
        
      } else {
        addResult('❌ Firebase Config: Not loaded');
      }
      
    } catch (error) {
      addResult(`❌ Firebase Config Error: ${error}`);
    }
  };

  const runAllTests = async () => {
    setTestResults([]);
    addResult('Starting React Native Firebase Tests...');
    
    await testFirebaseRNImport();
    await testFirebaseConfig();
    
    addResult('React Native Firebase tests completed!');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Firebase Test</Text>
      
      <TouchableOpacity style={styles.button} onPress={runAllTests}>
        <Text style={styles.buttonText}>Run RN Firebase Tests</Text>
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

export default FirebaseRNTest;
