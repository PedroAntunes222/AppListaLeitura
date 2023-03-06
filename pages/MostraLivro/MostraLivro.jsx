import { useState, useEffect, useContext } from 'react';
// import { getLivro, putLivro, delLivro } from '../../service/API';
// import AuthContext from '../../service/Auth';
import Livro from '../../class/Livro';
import * as SQLite from 'expo-sqlite';
import { getLivro, delLivro, putLivro } from '../../localDatabase/sqliteDatabase';
import { TextInput } from 'react-native-paper';
import { Text, View, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Stack } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ProgressBar, FAB } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';

export default function MostraLivro({ navigation, route }) {

  // const { authenticated } = useContext(AuthContext);
  // const [modal, setModal] = useState(false);
  // const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState(SQLite.openDatabase('biblioteca.db'));
  const [livro, setLivro] = useState([]);
  const [livroLoaded, setLivroLoaded] = useState(false);
  const [paginasLidas, setPaginasLidas] = useState('0');
  const [paginasTotais, setPaginasTotais] = useState('0');
  const [progress, setProgress] = useState(0);
  const [progressColor, setProgressColor] = useState('green');
  const [completo, setCompleto] = useState(false);
  const [paginaCompleta, setpaginaCompleta] = useState(false);
  const [rating, setRating] = useState(0);

  const handleLivro = () => {
    getLivro(route.params.userid, (livro) => {
      setLivro(livro);
      console.log(livro)
      setLivroLoaded(true);
    });
  }

  useEffect(() => {
    handleLivro();
  }, [db]);
  
  useEffect(() => { // atualiza lista ao voltar
    navigation.addListener('focus', () => {
      handleLivro();
    });
  }, [navigation]);
  
  useEffect(() => {
    if (livroLoaded) {
      setRating(livro[0].rating);
      setCompleto(livro[0].completo);
      setPaginasLidas(String(livro[0].paginasLidas));
      setPaginasTotais(String(livro[0].paginasTotais));
      setLoading(false);
    }
  }, [livroLoaded]);


  useEffect(() => {
    if (livroLoaded) {

    const calcProgress = Number(((paginasLidas/paginasTotais*100)/100).toFixed(2));
      if(calcProgress > 0){
        setProgress(calcProgress);
      } else {
        setProgress(0);
      }

      if( calcProgress === 1 ){
        setProgressColor('yellow');
      } else {
        setProgressColor('green');
      }

      if(Number(paginasLidas) === livro[0].paginasTotais && livro[0].completo === ''){
        setCompleto('true');
        setpaginaCompleta(true);
      } else {
        setCompleto('');
        setpaginaCompleta(false);
      }
    }
    
  }, [livroLoaded, paginasLidas, paginasTotais]);
  
  const deletaLivro = (e) => {
    e.preventDefault();
    // props.loading(true);
    delLivro(livro[0].id);
      
    navigation.navigate('Home');
  };

  const atlPages = () => {
    let oldNewLivro = new Livro(
      livro[0].id,
      livro[0].capa,
      livro[0].titulo,
      livro[0].subtitulo,
      livro[0].sinopse,
      livro[0].generoPrincipal,
      livro[0].generoSecundario,
      paginasLidas,
      livro[0].paginasTotais,
      livro[0].rating,
      completo
    );
    console.log('oldNewLivro');
    console.log(oldNewLivro);
    putLivro(oldNewLivro);
  }

  const completaLivro = () => {
    let oldNewLivro = new Livro(
      livro[0].id,
      livro[0].capa,
      livro[0].titulo,
      livro[0].subtitulo,
      livro[0].sinopse,
      livro[0].generoPrincipal,
      livro[0].generoSecundario,
      paginasLidas,
      livro[0].paginasTotais,
      rating,
      completo
    );

    console.log('oldNewLivro');
    console.log(oldNewLivro);

    putLivro(oldNewLivro);
  };

  return (
    loading  ? (<View></View>) : (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled={true}>

        <ProgressBar progress={progress} color={progressColor} />

        {/* Capa livro */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
       
          <Stack fill center spacing={4} style={{position: 'absolute', top:0, right: "10%", zIndex: 1}}>
                <FAB 
                  style={{backgroundColor:'#d32f2f'}} 
                  icon={props => <Feather name="trash-2" size={24} color="white" />} 
                  onPress={(e) => deletaLivro(e)}
                />
          </Stack>
          
          <Image
            style={styles.capa}
            source={
              livro[0].capa ?
                {uri: livro[0].capa }
                : {uri:'https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg'}
            }
          />
          <Stack fill center spacing={4} style={{position: 'absolute', bottom:-20, right: "10%", zIndex: 1}}>
                <FAB 
                  style={{backgroundColor:'#e0e0e0'}} 
                  icon={props => <AntDesign name="edit" size={24} color="black" />} 
                  onPress={() => navigation.navigate({
                      name: 'Edit',
                      params: { userid: livro[0].id }
                    })}
                />
          </Stack>
        </View>
      
        {/* Generos livro */}
        <View style={styles.centerText}>

            <Text style={styles.text}>
              {livro[0].generoPrincipal}

              {livro[0].generoSecundario && 
                <> / {livro[0].generoSecundario} </>
              }
            </Text>  
           
        </View>

      {livro[0].completo!==''
        ?
          <AirbnbRating
            count={5}
            reviews={["Péssimo", "Ruim", "OK", "Bom", "Ótimo"]}
            defaultRating={rating || 0}
            size={20}
            isDisabled
          />
        :
        <>
          {/* Páginas livro */}
          <View style={{ position: 'relative', flexDirection: "row", flexWrap: "wrap", justifyContent:'center', alignItems: 'center', margin: 10 }}>
          <TextInput 
            label="Páginas Lidas"
            mode="flat"
            onChangeText={setPaginasLidas}
            value={paginasLidas}
            textColor='#fff'
            underlineColor='#fff'
            activeUnderlineColor='#fff'
            style={{ backgroundColor:"#282c34", width: 140, textAlign: 'center' }}
            theme={{ colors: { onSurfaceVariant: '#fff'} }}
          />
        <Text style={{ color:'white', width: 50 }}> / {paginasTotais} </Text>

        <Stack fill center spacing={4} style={{position: 'absolute', right: 10}}>
          
          {paginaCompleta
            ?
              <FAB 
                style={{backgroundColor:'green'}} 
                icon={props => <AntDesign name="checkcircleo" size={24} color="black" />} 
                onPress={(e) => {completaLivro()}} 
              />
            :
              <FAB 
                style={{backgroundColor:'#4c9cdd'}} 
                icon={props => <AntDesign name="save" size={24} color="black" />} 
                onPress={(e) => {atlPages()}} 
              />
          }
            
        </Stack>
        
          </View>
        </>
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
            <Text style={styles.sinopse}> {livro[0].sinopse} </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    )
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