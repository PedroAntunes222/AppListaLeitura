import { useState, useEffect, useContext } from 'react';
import { getUser } from '../../service/API'
import AuthContext from '../../service/Auth';
import {  Text , View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardLivro from '../../components/CardLivro/CardLivro';
import { FAB } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import RNPickerSelect from 'react-native-picker-select';

export default function ListaLivros({navigation}) {

    const { authenticated } = useContext(AuthContext);
    const { setAuthenticated } = useContext(AuthContext);
    const [livros, setLivros] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filterGenero, setFilterGenero] = useState("todos");
    const [filterCompleto, setFilterCompleto] = useState("todos");
    const [filterInfo, setFilterInfo] = useState("titulo");
    const [filterOrdenacao, setFilterOrdenacao] = useState("crescente");
    const [pesquisa, setPesquisa] = useState("");

    const getLivros = async () => {
        // setLoading(true);
        // let IDLivro = route.params.userid;
        // const auth = await AsyncStorage.getItem('login');
        // console.log(auth);
        console.log(await authenticated);
        getUser(await authenticated)
        .then((response) => {
            setLivros(response.data.livros);
            // setLoading(false);
            // console.log(response.data.livros);
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
      getLivros();
    }, []);

    useEffect(() => {
      navigation.addListener('focus', () => {
        getLivros();
      });
    }, [navigation]);
    
    useEffect(() => {
      let livrosFilter = livros;
  
      if (pesquisa !== "") {
          livrosFilter = livrosFilter.filter((item) =>
          item.titulo.toLowerCase().includes(pesquisa)
        );
      }
  
      if (filterGenero !== "todos") {
          livrosFilter = livrosFilter.filter(
          (item) => item.generoPrincipal === filterGenero || item.generoSecundario === filterGenero
        );
      }
  
      if (filterCompleto !== "todos") {
          if( filterCompleto === "completo") {
            livrosFilter = livrosFilter.filter(
              (item) => item.completo === true
            );
          } else {
            livrosFilter = livrosFilter.filter(
              (item) => item.completo === false
            );
          }
      }
  
      if (filterOrdenacao === "crescente") {
          livrosFilter = [...livrosFilter].sort((a, b) =>
          String(a[filterInfo]).toLowerCase() > String(b[filterInfo]).toLowerCase() ? 1 : -1
        );
      } else {
          livrosFilter = [...livrosFilter].sort((a, b) =>
          String(a[filterInfo]).toLowerCase() < String(b[filterInfo]).toLowerCase() ? 1 : -1
        );
      }
  
       setFiltered(livrosFilter);
    }, [pesquisa, filterGenero, filterCompleto, filterInfo, filterOrdenacao, livros]);

    return (
      <SafeAreaView>
      <ScrollView nestedScrollEnabled={true}>

        <View style={styles.pesquisa}>
          <TextInput 
            mode='outlined'
            label="Pesquise o livro aqui" 
            value={pesquisa}
            onChangeText={(e) => setPesquisa(e)}
            textColor='#fff'
            outlineColor='#fff'
            activeOutlineColor='#fff'
            style={{ backgroundColor:"#282c34", color: "#fff" }}
            theme={{ colors: { onSurfaceVariant: '#fff'} }}
          />
        </View>

        <View style={styles.filtros}>
          <View>
            <Text style={styles.filtroText}> Gênero </Text>
            <RNPickerSelect
              placeholder={{ }}
              style={{ color: "white"}}
              onValueChange={(value) => setFilterGenero(value)}
              value={filterGenero}
              items={[
                    { label: 'Todos', value: 'todos' },
                    { label: 'Filosofia', value: 'Filosofia' },
                    { label: 'Fantasia', value: 'Fantasia' },
              ]}
              pickerProps={{ style: { height: 100 * ratio, width:win.width/2, overflow: 'hidden', color: "white", backgroundColor:"transparent" } }}
            />
          </View> 

          <View>
            <Text style={styles.filtroText}> Completo </Text>
            <RNPickerSelect
                placeholder={{ }}
                  onValueChange={(value) => setFilterCompleto(value)}
                  value={filterCompleto}
                  items={[
                      { label: 'Todos', value: 'todos' },
                      { label: 'Completo', value: 'completo' },
                      { label: 'Incompleto', value: 'incompleto' }
                  ]}
                pickerProps={{ style: { height: 100 * ratio, width:win.width/2, overflow: 'hidden', color: "white", backgroundColor:"transparent" } }}
            />
          </View> 

          <View>  
            <Text style={styles.filtroText}> Info </Text>        
            <RNPickerSelect
                placeholder={{ }}
                onValueChange={(value) => setFilterInfo(value)}
                value={filterInfo}
                items={[
                    { label: 'Título', value: 'titulo' },
                    { label: 'Data', value: 'id' },
                    { label: 'Avaliação', value: 'rating' },
                    { label: 'Páginas', value: 'paginasTotais' }
                ]}
                pickerProps={{ style: { height: 100 * ratio, width:win.width/2, overflow: 'hidden', color: "white", backgroundColor:"transparent" } }}
            />
          </View> 

          <View> 
            <Text style={styles.filtroText}> Ordem </Text>
              <RNPickerSelect
                placeholder={{ }}
                onValueChange={(value) => setFilterOrdenacao(value)}
                value={filterOrdenacao}
                items={[
                    { label: 'Crescente', value: 'crescente' },
                    { label: 'Decrescente', value: 'decrescente' }
                ]}
                pickerProps={{ style: { height: 100 * ratio, width:win.width/2, overflow: 'hidden', color: "white", backgroundColor:"transparent" } }}
            />
          </View>
        </View>
  
        <View style={styles.cards}>
          
          <View style={styles.addLivro}>
              <FAB 
                icon={props => <Icon name="plus" {...props} />}
                onPress={() => navigation.navigate({
                  name: 'Add'
                })}
                color="#e0e0e0"
              />
          </View>

          {/* <View style={styles.addLivro}>
              <FAB 
                icon={props => <Icon name="plus" {...props} />}
                onPress={async () =>  {
                  const value = 0;
                  const jsonValue = JSON.stringify(value);
                  await AsyncStorage.setItem('login', jsonValue);
                  setAuthenticated(jsonValue);
                  console.log(await jsonValue)}}
                color="#e0e0e0"
              />
          </View> */}

          {filtered.map((livro, index) => (
            <CardLivro key={index} livro={livro} navigation={navigation} />
          ))}
        </View>

        </ScrollView>
      </SafeAreaView>
    );
}
    
const win = Dimensions.get('window');
const ratio = win.width/541;

const styles = StyleSheet.create({
    botoes: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    pesquisa: {
        margin: 16
    },
    filtros: {
      flexDirection: "row",
      flexWrap: "wrap"
    },
    filtroText: {
      color: "white"
    },
    addLivro: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#343944',
      width: win.width/2,
      height: 400 * ratio
    },
    cards: {
      flexDirection: "row",
      flexWrap: "wrap"
    }
});
  