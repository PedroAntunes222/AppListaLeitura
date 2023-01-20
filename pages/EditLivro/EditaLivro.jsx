import React, { useState, useContext, useEffect } from 'react';
import { getLivro, putLivro } from '../../service/API';
import AuthContext from '../../service/Auth';
import { TextInput } from 'react-native-paper';
import { Button, Snackbar } from "@react-native-material/core";
import { Image, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';

export default function AdicionaLivro({ navigation, route }) {

  const [snack, setSnack] = useState(false);
  const { authenticated } = useContext(AuthContext);
  const [livro, setLivro] = useState([]);
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
    // setLoading(true);
    let IDLivro = route.params.userid;
    getLivro(IDLivro)
      .then((response) => {
        setLivro(response.data);
        // setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setTitulo(livro.titulo);
    setSubTitulo(livro.subTitulo);
    setGeneroPrincipal(livro.generoPrincipal);
    setGeneroSecundario(livro.generoSecundario);
    setSinopse(livro.sinopse);
    setPaginasTotais(String(livro.paginasTotais));
    setCapa(livro.capa);
    setRating(livro.rating);
    setCompleto(livro.completo);
  }, [livro]);
  

  const atlLivro = (e) => {
    e.preventDefault();
    // setLoading(true);
    putLivro(
      livro.id,
      capa,
      titulo,
      subTitulo,
      generoPrincipal,
      generoSecundario,
      sinopse,
      livro.paginasLidas,
      paginasTotais,
      rating,
      livro.completo,
      authenticated
    )
      .then(function (response) {
        console.log(response);
        // setMessage(response.data);
        // setLoading(false);
        // setSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const limpaForm = () => {
    setTitulo("");
    setSubTitulo("");
    setGeneroPrincipal("");
    setGeneroSecundario("");
    setSinopse("");
    setPaginasTotais("");
    setCapa("");
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
                label="Genero Secundário"
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

        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Button 
            style={{width:win.width/2, backgroundColor:"blue", marginBottom:16}}
            mode="outlined" 
            title="Salvar" 
            onPress={(e)=> atlLivro(e)} 
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
