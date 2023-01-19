import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './service/Auth'

import ListaLivros from './pages/ListaLivros/ListaLivros';
import MostraLivro from './pages/MostraLivro/MostraLivro';
import AdicionaLivro from './pages/AddLivro/AdicionaLivro';
import Login from './pages/Login/Login';

const Stack = createNativeStackNavigator();

function App() {
  return (
     <AuthProvider />
  );
}

const styles = StyleSheet.create({
  botoes: {
    backgroundColor: '#282c34'
  }
});


export default App;