
import React, { useContext } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContext from '../service/Auth'
import { Button } from "@react-native-material/core";

import { AuthProvider } from '../service/Auth';
import ListaLivros from './ListaLivros/ListaLivros'
import MostraLivro from './MostraLivro/MostraLivro';
import AdicionaLivro from './AddLivro/AdicionaLivro';
import EditaLivro from './EditLivro/EditaLivro';
import AdicionaGenero from "./AddLivro/AddGenero/AdicionaGenero";

export default function Rotas() {
  const Stack = createNativeStackNavigator();

  return (
          <AuthProvider>
            <Stack.Screen name="Home" component={ListaLivros} options={{ 
                title: 'Minha estante', 
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff',
                // headerRight: () => (
                //   <Button 
                //       style={{borderWidth: 1, borderColor:"red", marginBottom:16}}
                //       mode="outlined" 
                //       title="Sair" 
                //       color="#343944"
                //       tintColor="red"
                //       onPress={console.log('clikado')}
                //   />
                // )
            }} />
            <Stack.Screen name="Add" component={AdicionaLivro}  options={{ 
                title: 'Adicionar',
                headerStyle: {backgroundColor: '#343944'},
                headerTintColor: '#fff', 
            }} />
             <Stack.Screen name="Generos" component={AdicionaGenero}  options={{ 
                title: 'Generos',
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
