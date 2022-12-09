import React from 'react'
import { useState } from 'react';
import { addLivro } from '../../service/API'
import { TextInput, Button, Snackbar } from "@react-native-material/core";
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';

export default function AdicionaLivro() {

  const [snack, setSnack] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [subTitulo, setSubTitulo] = useState('');
  const [generoPrincipal, setGeneroPrincipal] = useState('');
  const [generoSecundario, setGeneroSecundario] = useState('');
  const [paginas, setPaginas] = useState('');
  const [capa, setCapa] = useState('');
  const [sinopse, setSinopse] = useState('');

  const limpaForm = () => {
    setTitulo("");
    setSubTitulo("");
    setGeneroPrincipal("");
    setGeneroSecundario("");
    setSinopse("");
    setPaginas("");
    setCapa("");
  };

  const adicionaLivro = (e) => {
    e.preventDefault();
    // setLoading(true);
    addLivro(
      capa,
      titulo,
      subTitulo,
      generoPrincipal,
      generoSecundario,
      sinopse,
      paginas,
      // authenticated
    )
      .then(function (response) {
        console.log(response);
        // setMessage(response.data);
        // setLoading(false);
        // setModal(true);
        limpaForm();
        setSnack(true)
      })
      .catch(function (error) {
        console.log(error);
        // setMessage(error.data);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
        <TextInput 
            label="Titulo" 
            variant="outlined" 
            style={{ margin: 16 }}
            value={titulo || ''}
            onChangeText={(e)=>{setTitulo(e)}}
        />
        <TextInput
            label="Subtitulo"
            variant="outlined"
            style={{ margin: 16 }} 
            value={subTitulo || ''}
            onChangeText={(e)=>{setSubTitulo(e)}}
        />
        <View>
            <TextInput
                label="Genero 1"
                variant="outlined"
                style={{ margin: 16 }} 
                value={generoPrincipal || ''}
                onChangeText={(e)=>{setGeneroPrincipal(e)}}
            />
            <TextInput
                label="Genero 2"
                variant="outlined"
                style={{ margin: 16 }} 
                value={generoSecundario || ''}
                onChangeText={(e)=>{setGeneroSecundario(e)}}
            />
        </View>
        <TextInput
            label="N° de páginas"
            variant="outlined"
            style={{ margin: 16 }} 
            value={paginas || ''}
            onChangeText={(e)=>{setPaginas(e)}}
        />
        <TextInput
            label="Image Adress"
            variant="outlined"
            style={{ margin: 16 }} 
            value={capa || ''}
            onChangeText={(e)=>{setCapa(e)}}
        />
        <TextInput
            label="Sinopse"
            variant="outlined"
            style={{ margin: 16 }} 
            value={sinopse || ''}
            onChangeText={(e)=>{setSinopse(e)}}
        />
        </View>

        <View>
          <Button variant="outlined" title="Outlined" onPress={(e)=>adicionaLivro(e)} />
        </View>

        {snack &&
          <Snackbar
            style={styles.Snackbar}
            message= { titulo + " adicionado" }
            action={
              <Button 
              onPress={(e) => setSnack(false)}
              variant="text" 
              title="Dismiss" 
              color="#BB86FC" 
              compact />
            }
          />
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  Snackbar: {
    position: 'absolute',
    bottom: 0,
    width: win.width
  }
});
