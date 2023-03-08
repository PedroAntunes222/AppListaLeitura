import React, { useContext, useEffect, useState } from 'react'
import Livro from '../../class/Livro'
import { addLivro, initDB } from '../../localDatabase/sqliteDatabase';
import { Image, Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Stack, Snackbar } from "@react-native-material/core";
import { TextInput, FAB } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import {selectGeneros} from '../../service/Generos';

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

  const adicionarLivro = (e) => {
    e.preventDefault();

    const novoLivro = new Livro(
      1,
      capa,
      titulo,
      subTitulo,
      sinopse,
      generoPrincipal,
      generoSecundario,
      0,
      Number(paginas),
      0,
      ''
    );

    var str;
    str = JSON.stringify(novoLivro);
    str = JSON.stringify(novoLivro, null, 4); // (Optional) beautiful indented output.
    console.log(str);

    addLivro(novoLivro);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        
        <View>
          <View>
            <Stack fill center spacing={4} style={{position: 'absolute', top:0, right: "10%", zIndex: 1}}>
                <FAB 
                  style={{backgroundColor:'green'}} 
                  icon={props => <AntDesign name="addfile" size={24} color="black" />} 
                  onPress={(e) => {adicionarLivro(e)}} 
                />
            </Stack>

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

          <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent:'space-around'}}>
              <ModalSelector
                style={{width: '40%'}}
                data={selectGeneros}
                initValue="Gênero 1"
                initValueTextStyle={{ color: 'white' }} // 'placeholder'
                optionTextStyle={{ color: 'black' }} // item nao selecionado na lista
                selectedItemTextStyle={{ color: 'green' }} // item selecionado na lista
                selectTextStyle={{ color: 'white' }} // texto do input
                selectStyle={{ borderWidth: 1, borderColor: 'white' }} // borda do input
                onChange={(option) => { setGeneroPrincipal(option.label) }}
              />
              <ModalSelector
                data={selectGeneros}
                initValue="Gênero 2"
                style={{width: '40%'}}
                initValueTextStyle={{ color: 'white' }} // 'placeholder'
                optionTextStyle={{ color: 'black' }} // item nao selecionado na lista
                selectedItemTextStyle={{ color: 'green' }} // item selecionado na lista
                selectTextStyle={{ color: 'white' }} // texto do input
                selectStyle={{ borderWidth: 1, borderColor: 'white' }} // borda do input
                onChange={(option) => { setGeneroSecundario(option.label) }}
              />
          </View>

            <TextInput
                label="N° de páginas"
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

        {snack &&
          <Snackbar
            style={styles.Snackbar}
            message= { titulo + " foi adicionado" }
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
    alignSelf: 'center',
    marginTop: 20
  },
  generoSelector: {
    width:win.width/2.5, 
    height: 10 * ratio, 
    overflow: 'hidden', 
    color: "white", 
    backgroundColor:"transparent",
  }
});
