import React, { useContext, useEffect, useState } from 'react'
import { addLivro, getGeneros } from '../../service/API';
import { Image, Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import AuthContext from '../../service/Auth';
import { TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { Stack, FAB } from "@react-native-material/core";
import { Button, Snackbar } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import selectGeneros from '../../service/Generos';

export default function AdicionaLivro({navigation}) {

  const [snack, setSnack] = useState(false);
  const [generos, setGeneros] = useState([]);
  const { authenticated } = useContext(AuthContext);
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
      authenticated
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
  
  // useEffect(() => {
  //   getGeneros()
  //   .then(function (response) {
  //     setGeneros(response.data);
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     console.log(error);
  //   });
  // }, [])

  // useEffect(() => {
  //   generos.map((genero) => (
  //   setGenerosList(arr => [...arr, genero.nome])
  //   ))
  //   console.log(generosList);
  // }, [generos]);

  return (
    <SafeAreaView>
      <ScrollView>
        
        <View>
          <View>
            <Stack fill center spacing={4} style={{position: 'absolute', top:0, right: "10%", zIndex: 1}}>
                <FAB 
                  style={{backgroundColor:'green'}} 
                  icon={<AntDesign name="addfile" size={24} color="black" />} 
                  onPress={(e) => {adicionaLivro(e)}} 
                />
            </Stack>

            <Image
              style={styles.capaPreview}
              source={
                capa ? {uri: capa} :
                {uri:'https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg'}
              }
            />

            {/* <Stack fill center spacing={4} style={{position: 'absolute', bottom:0, right: "10%", zIndex: 1}}>
                <FAB 
                  style={{backgroundColor:'blue'}} 
                  icon={<Entypo name="add-to-list" size={24} color="black" />} 
                  onPress={() => navigation.navigate('Generos')} 
                />
            </Stack> */}
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

          <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent:'center'}}>
              <RNPickerSelect
                    placeholder={{
                      label: 'Genero 1',
                      value: "",
                    }}
                    onValueChange={(value) => setGeneroPrincipal(value)}
                    value={generoPrincipal}
                    items={selectGeneros}
                    pickerProps={{ style: { height: 10 * ratio, width:win.width/2.5, overflow: 'hidden', color: "white", backgroundColor:"transparent" } }}
                />
                <RNPickerSelect
                    placeholder={{
                      label: 'Genero 2',
                      value: "",
                    }}
                    onValueChange={(value) => setGeneroSecundario(value)}
                    value={generoSecundario}
                    items={selectGeneros}
                    pickerProps={{ style: { height: 10 * ratio, width:win.width/2.5, overflow: 'hidden', color: "white", backgroundColor:"transparent" } }}
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
  }
});
