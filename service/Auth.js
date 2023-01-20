import React, { useState, createContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from "../pages/Login/Login";

const AuthContext = createContext({
  authenticated: 0,
  setAuthenticated: (auth) => {},
});

export const AuthProvider = ({ children }) => {

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
          children
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