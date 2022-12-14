import React from 'react'
import { useState } from 'react';
import { addLivro } from '../../service/API';
import { TextInput } from 'react-native-paper';
import { Button, Snackbar } from "@react-native-material/core";
import { Image, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';

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

        <View>
          <Image
            style={styles.capaPreview}
            source={
              capa ? {uri: capa} :
              {uri:'https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg'}
            }
          />
        </View>
        
        <TextInput
              label="Image Adress"
              mode="outlined"
              value={capa || ''}
              onChangeText={(e)=>{setCapa(e)}}
              textColor='#fff'
              outlineColor='#fff'
              activeOutlineColor='#fff'
              style={{ margin: 16, backgroundColor:"#282c34" }}
              theme={{ colors: { onSurfaceVariant: '#fff'} }}
          />

          <TextInput 
              label="Titulo" 
              mode="outlined" 
              value={titulo || ''}
              onChangeText={(e)=>{setTitulo(e)}}
              textColor='#fff'
              outlineColor='#fff'
              activeOutlineColor='#fff'
              style={{ margin: 16, backgroundColor:"#282c34" }}
              theme={{ colors: { onSurfaceVariant: '#fff'} }}
          />
          <TextInput
              label="Subtitulo"
              mode="outlined"
              value={subTitulo || ''}
              onChangeText={(e)=>{setSubTitulo(e)}}
              textColor='#fff'
              outlineColor='#fff'
              activeOutlineColor='#fff'
              style={{ margin: 16, backgroundColor:"#282c34" }}
              theme={{ colors: { onSurfaceVariant: '#fff'} }}
          />

          <View>
            <TextInput
                label="Genero Principal"
                mode="outlined"
                value={generoPrincipal || ''}
                onChangeText={(e)=>{setGeneroPrincipal(e)}}
                textColor='#fff'
                outlineColor='#fff'
                activeOutlineColor='#fff'
                style={{ margin: 16, backgroundColor:"#282c34" }}
                theme={{ colors: { onSurfaceVariant: '#fff'} }}
            />
            <TextInput
                label="Genero Secund??rio"
                mode="outlined"
                value={generoSecundario || ''}
                onChangeText={(e)=>{setGeneroSecundario(e)}}
                textColor='#fff'
                outlineColor='#fff'
                activeOutlineColor='#fff'
                style={{ margin: 16, backgroundColor:"#282c34" }}
                theme={{ colors: { onSurfaceVariant: '#fff'} }}
            />
          </View>

          <TextInput
              label="N?? de p??ginas"
              mode="outlined"
              value={paginas || ''}
              onChangeText={(e)=>{setPaginas(e)}}
              textColor='#fff'
              outlineColor='#fff'
              activeOutlineColor='#fff'
              style={{ margin: 16, backgroundColor:"#282c34" }}
              theme={{ colors: { onSurfaceVariant: '#fff'} }}
          />
          <TextInput
              multiline
              numberOfLines={4}
              label="Sinopse"
              mode="outlined"
              value={sinopse || ''}
              onChangeText={(e)=>{setSinopse(e)}}
              textColor='#fff'
              outlineColor='#fff'
              activeOutlineColor='#fff'
              style={{ margin: 16, backgroundColor:"#282c34" }}
              theme={{ colors: { onSurfaceVariant: '#fff'} }}
          />
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Button 
            style={{width:win.width/2, backgroundColor:"green", marginBottom:16}}
            mode="outlined" 
            title="Adicionar" 
            onPress={(e)=>adicionaLivro(e)} 
          />
        </View>

        {snack &&
          <Snackbar
            style={styles.Snackbar}
            message= { titulo + " foi adicionado" }
            action={
              <Button 
                onPress={(e) => setSnack(false)}
                mode="text"
                title="Fechar"
                color="#BB86FC"
              />
            }
          />
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const win = Dimensions.get('window');
const ratio = win.width/100;

const styles = StyleSheet.create({
  Snackbar: {
    position: 'absolute',
    bottom: 0,
    width: win.width
  },
  capaPreview: {
    width: win.width/1.5,
    height: 100 * ratio,
    alignSelf: 'center'
  }
});
