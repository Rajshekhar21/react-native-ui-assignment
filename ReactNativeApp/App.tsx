import 'react-native-gesture-handler';
import React from 'react';
import './src/config/firebase'; // Initialize Firebase
import AppNavigatorWithAuth from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return <AppNavigatorWithAuth />;
};

export default App;