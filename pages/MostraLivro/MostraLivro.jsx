import { useState, useEffect, useContext } from 'react';
import { getLivro, putLivro, delLivro } from '../../service/API';
import AuthContext from '../../service/Auth';
import { TextInput } from 'react-native-paper';
import { Text, View, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Stack, FAB } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';

export default function MostraLivro({ navigation, route }) {

  const { authenticated } = useContext(AuthContext);
  // const [refresh, setRefresh] = useState(0);
  // const [loading, setLoading] = useState(true);
  // const [modal, setModal] = useState(false);
  // const [message, setMessage] = useState("");
  const [livro, setLivro] = useState([]);
  const [paginasLidas, setPaginasLidas] = useState('0');
  const [progress, setProgress] = useState(0)
  const [completo, setCompleto] = useState(false);
  const [paginaCompleta, setpaginaCompleta] = useState(false);
  const [rating, setRating] = useState(0);

  const Livro = () => {
    // setLoading(true);
    getLivro(route.params.userid)
      .then((response) => {
        setLivro(response.data);
        // console.log(response.data)
        // setLoading(false);
      })
   .catch((error) => console.log(error));
  }

  useEffect(() => { // atualiza lista ao voltar
    navigation.addListener('focus', () => {
      Livro();
    });
  }, [navigation]);
  
  useEffect(() => {
    setRating(livro.rating);
    setCompleto(livro.completo);
    setPaginasLidas(String(livro.paginasLidas));
  }, [livro]);

  useEffect(() => {
    const calcProgress = Number(((paginasLidas/livro.paginasTotais*100)/100).toFixed(2));
    if(calcProgress > 0){
      setProgress(calcProgress);
    } else {
      setProgress(0);
    }

    if(Number(paginasLidas) === livro.paginasTotais && livro.completo === false){
      setCompleto(true);
      setpaginaCompleta(true);
    } else {
      setCompleto(false);
      setpaginaCompleta(false);
    }
  });
  
  const deletaLivro = (e) => {
    e.preventDefault();
    // props.loading(true);
    delLivro(livro.id)
      .then(function (response) {
        // console.log(response);
        navigation.navigate('Home');
        // props.message(response.data);
        // props.refresh();
        // props.loading(false);
        // props.alert(true);
      })
      .catch(function (error) {
        console.log(error);
        // props.message(error.data);
      });
  };

  const atlPages = () => {
    putLivro(
      livro.id,
      livro.capa,
      livro.titulo,
      livro.subTitulo,
      livro.generoPrincipal,
      livro.generoSecundario,
      livro.sinopse,
      paginasLidas,
      livro.paginasTotais,
      livro.rating,
      completo,
      authenticated
    )
      .then(function (response) {
        // setMessage("Progresso atualizado")
        // setAlert(true);
        // console.log('enviado');
        console.log(response.data);
        Livro();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const completaLivro = () => {
    putLivro(
      livro.id,
      livro.capa,
      livro.titulo,
      livro.subTitulo,
      livro.generoPrincipal,
      livro.generoSecundario,
      livro.sinopse,
      paginasLidas,
      livro.paginasTotais,
      rating,
      completo,
      authenticated
    )
    .then(function (response) {
        // setMessage("Progresso atualizado")
        // setAlert(true);
        // console.log('enviado');
        console.log(response.data);
        Livro();
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  const NumeroPaginas = () => {

    return (
      <>
  {/* Páginas livro */}
            <View style={{ position: 'relative', flexDirection: "row", flexWrap: "wrap", justifyContent:'center', alignItems: 'center', margin: 10 }}>
              <TextInput 
                label="Páginas Lidas"
                mode="flat"
                value={paginasLidas || ''}
                onChangeText={(e)=>{setPaginasLidas(e)}}
                textColor='#fff'
                underlineColor='#fff'
                activeUnderlineColor='#fff'
                style={{ backgroundColor:"#282c34", width: 140, textAlign: 'center' }}
                theme={{ colors: { onSurfaceVariant: '#fff'} }}
            />
            <Text style={{ color:'white', width: 50 }}> / {livro.paginasTotais} </Text>

            <Stack fill center spacing={4} style={{position: 'absolute', right: 10}}>
              
              {paginaCompleta
                ?
                  <FAB 
                    style={{backgroundColor:'green'}} 
                    icon={<AntDesign name="checkcircleo" size={24} color="black" />} 
                    onPress={(e) => {completaLivro()}} 
                  />
                :
                  <FAB 
                    style={{backgroundColor:'#4c9cdd'}} 
                    icon={<FontAwesome name="save" size={24} color="black" />} 
                    onPress={(e) => {atlPages()}} 
                  />
              }
                
            </Stack>
            
        </View>
      </>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled={true}>

        <ProgressBar progress={progress} color='green' />

        {/* Capa livro */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
       
          <Stack fill center spacing={4} style={{position: 'absolute', top:0, right: "10%", zIndex: 1}}>
                <FAB 
                  style={{backgroundColor:'#d32f2f'}} 
                  icon={<FontAwesome name="trash-o" size={24} color="white" />} 
                  onPress={(e) => deletaLivro(e)}
                />
          </Stack>
          
          <Image
            style={styles.capa}
            source={
              livro.capa ?
                {uri: livro.capa }
                : {uri:'https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg'}
            }
          />
          
          <Stack fill center spacing={4} style={{position: 'absolute', bottom:-20, right: "10%", zIndex: 1}}>
                <FAB 
                  style={{backgroundColor:'#e0e0e0'}} 
                  icon={<AntDesign name="edit" size={24} color="black" />} 
                  onPress={() => navigation.navigate({
                      name: 'Edit',
                      params: { userid: livro.id }
                    })}
                />
          </Stack>
        </View>
      
        {/* Generos livro */}
        <View style={styles.centerText}>
            {/* <Text style={styles.text}> {livro.titulo} </Text> */}
            {/* <Text style={styles.text}> {livro.subTitulo} </Text> */}

            <Text style={styles.text}>
              {livro.generoPrincipal}

              {livro.generoSecundario && 
                <> / {livro.generoSecundario} </>
              }
            </Text>  
           
        </View>

      {livro.completo
        ?
          <AirbnbRating
            count={5}
            reviews={["Péssimo", "Ruim", "OK", "Bom", "Ótimo"]}
            defaultRating={rating || 0}
            size={20}
            isDisabled
          />
        :
          <NumeroPaginas />
      }

        {paginaCompleta &&
            <AirbnbRating
              count={5}
              reviews={["Péssimo", "Ruim", "OK", "Bom", "Ótimo"]}
              defaultRating={0}
              size={20}
              onFinishRating={setRating}
            />
        }

        {/* Sinopse livro */}
        <View>
            <Text style={styles.sinopse}> {livro.sinopse} </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const win = Dimensions.get('window');
const ratio = win.width/100;

const styles = StyleSheet.create({
  capa: {
    width: win.width/1.5,
    height: 100 * ratio,
    marginTop: 20
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  text: {
    color: 'white'
  },
  sinopse: {
    color: 'white',
    textAlign: 'justify',
    margin: 16
  }
});