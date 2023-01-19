import React, { useState, createContext, useEffect } from "react";
import {  Text , View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Cadastro from "../pages/Login/Cadastro/Cadastro";
import ListaLivros from '../pages/ListaLivros/ListaLivros';
import MostraLivro from '../pages/MostraLivro/MostraLivro';
import AdicionaLivro from '../pages/AddLivro/AdicionaLivro';
import Login from '../pages/Login/Login';

const AuthContext = createContext({
  authenticated: 0,
  setAuthenticated: (auth) => {},
});

export const AuthProvider = () => {

  const getData = async () => {
    try {
      const userID = await AsyncStorage.getItem('login');
      return userID;
    } catch(e) {
      console.log(e);
    }
  }

  const auth = getData();
  const [authenticated, setAuthenticated] = useState(auth);
  const Stack = createNativeStackNavigator();

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              contentStyle:{backgroundColor:'#282c34'}
            }}>
        {authenticated > 0 ? (
          <>
            <Stack.Screen name="Home" component={ListaLivros} options={{ 
                title: 'Minha estante', 
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name="Page" component={MostraLivro}  options={({ route }) => ({ 
                title: route.params.title,
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff',
            })} />
            <Stack.Screen name="Add" component={AdicionaLivro}  options={{ 
                title: 'Adicionar',
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff', 
            }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login}  options={{ 
              title: 'Login',
              headerStyle: {backgroundColor: '#343944'},
              headerTintColor: '#fff',
          }} />
        )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AuthContext;