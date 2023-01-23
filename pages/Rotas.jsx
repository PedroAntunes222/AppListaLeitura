
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from "@react-native-material/core";

import { AuthProvider } from '../service/Auth';
import ListaLivros from './ListaLivros/ListaLivros'
import MostraLivro from './MostraLivro/MostraLivro';
import AdicionaLivro from './AddLivro/AdicionaLivro';
import EditaLivro from './EditLivro/EditaLivro';

export default function Rotas() {

  const Stack = createNativeStackNavigator();

  return (
          <AuthProvider>
            <Stack.Screen name="Home" component={ListaLivros} options={{ 
                title: 'Minha estante', 
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff',
                headerRight: () => (
                  <Button title="Update count" />
                ),
            }} />
            <Stack.Screen name="Add" component={AdicionaLivro}  options={{ 
                title: 'Adicionar',
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff', 
            }} />
            <Stack.Screen name="Page" component={MostraLivro}  options={({ route }) => ({ 
                title: route.params.title,
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff',
            })} />
            <Stack.Screen name="Edit" component={EditaLivro}  options={{ 
                title: 'Editar',
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff', 
            }} />
          </AuthProvider>
  )
}
