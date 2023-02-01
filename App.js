import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Rotas from './pages/Rotas';

// const Stack = createNativeStackNavigator();


function App() {

  return (
     <Rotas />
  );
}

const styles = StyleSheet.create({
  botoes: {
    backgroundColor: '#282c34'
  }
});


export default App;