
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AuthContext from '../service/Auth'
// import { Button } from "@react-native-material/core";
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from '../service/Auth';
import ListaLivros from './ListaLivros/ListaLivros'
import MostraLivro from './MostraLivro/MostraLivro';
import AdicionaLivro from './AddLivro/AdicionaLivro';
import EditaLivro from './EditLivro/EditaLivro';
import Login from './Login/Login'
// import AdicionaGenero from "./AddLivro/AddGenero/AdicionaGenero";

export default function Rotas() {
    
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator
            screenOptions={{
              contentStyle:{backgroundColor:'#282c34'}
            }}>
            <Stack.Screen name="Home" component={ListaLivros} options={{ 
                title: 'Minha estante', 
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name="Login" component={Login} options={{ 
                title: 'Login', 
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name="Add" component={AdicionaLivro}  options={{ 
                title: 'Adicionar',
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff', 
            }} />
            <Stack.Screen name="Page" component={MostraLivro}  options={({ route }) => ({ 
                title: `${route.params.title} ${route.params.subtitle}`,
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff',
            })} />
            <Stack.Screen name="Edit" component={EditaLivro}  options={{ 
                title: 'Editar',
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff', 
            }} />
           </Stack.Navigator>
      </NavigationContainer>
  )
}
