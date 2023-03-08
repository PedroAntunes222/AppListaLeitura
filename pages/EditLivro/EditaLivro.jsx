import React, { useState, useContext, useEffect } from 'react';
import Livro from '../../class/Livro';
import { Image, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { getLivro, putLivro } from '../../localDatabase/sqliteDatabase';
import { TextInput, FAB } from 'react-native-paper';
import { Stack, Snackbar } from "@react-native-material/core";
import ModalSelector from 'react-native-modal-selector';
import { selectGeneros } from '../../service/Generos';
import { AntDesign } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';

export default function AdicionaLivro({ route, navigation }) {

  const [snack, setSnack] = useState(false);
  // const { authenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState(SQLite.openDatabase('biblioteca.db'));
  const [livro, setLivro] = useState([]);
  const [livroLoaded, setLivroLoaded] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [subTitulo, setSubTitulo] = useState('');
  const [generoPrincipal, setGeneroPrincipal] = useState('');
  const [generoSecundario, setGeneroSecundario] = useState('');
  const [paginasTotais, setPaginasTotais] = useState('');
  const [capa, setCapa] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [rating, setRating] = useState("")
  const [completo, setCompleto] = useState("");

  useEffect(() => {
    getLivro(route.params.userid, (livro) => {
      setLivro(livro);
      setLivroLoaded(true);
    });
  }, [db]);

  useEffect(() => {
    if (livroLoaded) {
      // console.log(livro)
      setTitulo(livro[0].titulo);
      setSubTitulo(livro[0].subtitulo);
      setGeneroPrincipal(livro[0].generoPrincipal);
      setGeneroSecundario(livro[0].generoSecundario);
      setSinopse(livro[0].sinopse);
      setPaginasTotais(String(livro[0].paginasTotais));
      setCapa(livro[0].capa);
      setRating(livro[0].rating);
      setCompleto(livro[0].completo);
      setLoading(false);
    }
  }, [livroLoaded]);
  
  const atlLivro = (e) => {
    e.preventDefault();
    // setLoading(true);
    let oldNewLivro = new Livro(
      livro[0].id,
      capa,
      titulo,
      subTitulo,
      sinopse,
      generoPrincipal,
      generoSecundario,
      livro[0].paginasLidas,
      500,
      rating,
      livro[0].completo
    );

     putLivro(oldNewLivro);

      navigation.navigate({
        name: 'Page',
        params: {
          userid: livro[0].id, 
          title: titulo,
          subtitle: subTitulo
        }
      })
  };

  return (
    loading ? (<View></View>) : (
    <SafeAreaView>
      <ScrollView>
        <View>

        <View>

          <Stack fill center spacing={4} style={{position: 'absolute', top:0, right: "10%", zIndex: 1}}>
              <FAB 
                style={{backgroundColor:'#4c9cdd'}} 
                icon={props => <AntDesign name="save" size={24} color="black" />} 
                onPress={(e) => {atlLivro(e)}} 
              />
          </Stack>

          <Image
            style={styles.capaPreview}
            source={
              capa ? {uri: capa} :
              {uri:'https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg'}
            }
          />

          {completo!=='' &&
              <AirbnbRating
                  count={5}
                  reviews={["Péssimo", "Ruim", "OK", "Bom", "Ótimo"]}
                  defaultRating={rating || 0}
                  size={20}
                  onFinishRating={setRating}
              />
          }

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
          <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent:'space-around'}}>
              <ModalSelector
                  style={{width: '40%'}}
                  data={selectGeneros}
                  initValue={ generoPrincipal || "Gênero 1" }
                  initValueTextStyle={{ color: 'white' }} // 'placeholder'
                  optionTextStyle={{ color: 'black' }} // item nao selecionado na lista
                  selectedItemTextStyle={{ color: 'green' }} // item selecionado na lista
                  selectTextStyle={{ color: 'white' }} // texto do input
                  selectStyle={{ borderWidth: 1, borderColor: 'white' }} // borda do input
                  onChange={(option) => { setGeneroPrincipal(option.label) }}
              />
              <ModalSelector
                  data={selectGeneros}
                  initValue={ generoSecundario || "Gênero 2" }
                  style={{width: '40%'}}
                  initValueTextStyle={{ color: 'white' }} // 'placeholder'
                  optionTextStyle={{ color: 'black' }} // item nao selecionado na lista
                  selectedItemTextStyle={{ color: 'green' }} // item selecionado na lista
                  selectTextStyle={{ color: 'white' }} // texto do input
                  selectStyle={{ borderWidth: 1, borderColor: 'white' }} // borda do input
                  onChange={(option) => { setGeneroSecundario(option.label) }}
              />
          </View>
          </View>

          <TextInput
              label="N° de páginas"
              mode="outlined"
              value={paginasTotais || ''}
              onChangeText={(e)=>{setPaginasTotais(e)}}
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

        {/* <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Button 
            style={{width:win.width/1.5, borderWidth: 1, borderColor:"#90caf9", marginBottom:16}}
            mode="outlined" 
            title="Salvar" 
            color="#282c34"
            tintColor="#90caf9"
            onPress={(e)=> atlLivro(e)} 
          />
        </View> */}

        {snack &&
          <Snackbar
            style={styles.Snackbar}
            message= { titulo + " foi editado" }
          />
        }
      </ScrollView>
    </SafeAreaView>
    )
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
  }
});
