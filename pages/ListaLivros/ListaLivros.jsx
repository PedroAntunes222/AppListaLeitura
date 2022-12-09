import { useState, useEffect } from 'react';
import { getUser } from '../../service/API'
import {  Text , View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import CardLivro from '../../components/CardLivro/CardLivro';
import { FAB } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import RNPickerSelect from 'react-native-picker-select';

export default function ListaLivros({navigation, route}) {

    const [livros, setLivros] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filterGenero, setFilterGenero] = useState("todos");
    const [filterCompleto, setFilterCompleto] = useState("todos");
    const [filterInfo, setFilterInfo] = useState("titulo");
    const [filterOrdenacao, setFilterOrdenacao] = useState("crescente");
    const [pesquisa, setPesquisa] = useState("");

    const getLivros = () => {
        // setLoading(true);
        // let IDLivro = route.params.userid;
        getUser()
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
            style={{ backgroundColor:"#282c34" }}
          />
        </View>

        <View style={styles.filtros}>
          <View style={styles.filtro}>
            <Text> Gênero </Text>
            <RNPickerSelect
              placeholder={{ }}
              style={{placeholder: {color: "fff"}}}
              onValueChange={(value) => setFilterGenero(value)}
              value={filterGenero}
              items={[
                    { label: 'Todos', value: 'todos' },
                    { label: 'Filosofia', value: 'Filosofia' },
                    { label: 'Fantasia', value: 'Fantasia' },
              ]}
              pickerProps={{ style: { height: 100 * ratio, width:win.width/2, overflow: 'hidden' } }}
            />
          </View> 

          <View style={styles.filtro}>
            <Text> Completo </Text>
            <RNPickerSelect
                placeholder={{ }}
                  onValueChange={(value) => setFilterCompleto(value)}
                  value={filterCompleto}
                  items={[
                      { label: 'Todos', value: 'todos' },
                      { label: 'Completo', value: 'completo' },
                      { label: 'Incompleto', value: 'incompleto' }
                  ]}
                pickerProps={{ style: { height: 100 * ratio, width:win.width/2, overflow: 'hidden' } }}
            />
          </View> 

          <View style={styles.filtro}>  
            <Text> Info </Text>        
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
                pickerProps={{ style: { height: 100 * ratio, width:win.width/2, overflow: 'hidden' } }}
            />
          </View> 

          <View style={styles.filtro}> 
            <Text> Ordem </Text>
              <RNPickerSelect
                placeholder={{ }}
                onValueChange={(value) => setFilterOrdenacao(value)}
                value={filterOrdenacao}
                items={[
                    { label: 'Crescente', value: 'crescente' },
                    { label: 'Decrescente', value: 'decrescente' }
                ]}
                pickerProps={{ style: { height: 100 * ratio, width:win.width/2, overflow: 'hidden' } }}
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
  