import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaLivros from './pages/ListaLivros/ListaLivros';
import MostraLivro from './pages/MostraLivro/MostraLivro';
import AdicionaLivro from './pages/AddLivro/AdicionaLivro';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle:{ backgroundColor:'#282c34' }
        }}>
        <Stack.Screen name="Home" component={ListaLivros} 
          options={{ 
            title: 'Minha estante', 
            headerStyle: {backgroundColor: '#343944'},
            headerTintColor: '#fff',
          }} />
        <Stack.Screen name="Page" component={MostraLivro}  options={({ route }) => ({ title: route.params.title })}/>
        <Stack.Screen name="Add" component={AdicionaLivro}  options={{ title: 'Adicionar' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  botoes: {
    backgroundColor: '#282c34'
  }
});


export default App;