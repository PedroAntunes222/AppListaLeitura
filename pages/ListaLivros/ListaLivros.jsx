import { useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
import { getUser } from '../../service/API'
import AuthContext from '../../service/Auth';
import { Button, Text , View, StyleSheet, SafeAreaView, ScrollView, Dimensions, FlatList  } from 'react-native';
import CardLivro from '../../components/CardLivro/CardLivro';
import { FAB } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { BottomSheetModal, BottomSheetModalProvider}  from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ListaLivros({navigation}) {

    const { authenticated } = useContext(AuthContext);
    const [livros, setLivros] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filterGenero, setFilterGenero] = useState("todos");
    const [filterCompleto, setFilterCompleto] = useState("todos");
    const [filterInfo, setFilterInfo] = useState("id");
    const [filterOrdenacao, setFilterOrdenacao] = useState("decrescente");
    const [pesquisa, setPesquisa] = useState("");

    const getLivros = async () => {
        // setLoading(true);
        // console.log(await authenticated);
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

    useEffect(() => { // atualiza lista ao voltar
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


    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ["50%", "100%"], []);

    const openModal = () => {
      bottomSheetModalRef.current.present();
    };
    const closeModal = () => {
      bottomSheetModalRef.current.close();
    };

    return (
      <GestureHandlerRootView>
        <BottomSheetModalProvider style={styles.bottomSheet}>
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
              
              <Button onPress={() => openModal()}  title="modal" />
              
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
                    pickerProps={{ style: { height: 100 * ratio, width:win.width/2.2, overflow: 'hidden', color: "white", backgroundColor:"transparent" } }}
                  />
                </View> 

                <View>
                  <Text style={styles.filtroText}> Estado </Text>
                  <RNPickerSelect
                      placeholder={{ }}
                        onValueChange={(value) => setFilterCompleto(value)}
                        value={filterCompleto}
                        items={[
                            { label: 'Todos', value: 'todos' },
                            { label: 'Completo', value: 'completo' },
                            { label: 'Incompleto', value: 'incompleto' }
                        ]}
                      pickerProps={{ style: { height: 100 * ratio, width:win.width/2.2, overflow: 'hidden', color: "white", backgroundColor:"transparent" } }}
                  />
                </View> 

                <View>  
                  <Text style={styles.filtroText}> Ordenar por </Text>        
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
                      pickerProps={{ style: { height: 100 * ratio, width:win.width/2.2, overflow: 'hidden', color: "white", backgroundColor:"transparent" } }}
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
                      pickerProps={{ style: { height: 100 * ratio, width:win.width/2.2, overflow: 'hidden', color: "white", backgroundColor:"transparent" } }}
                    />
                </View>
              </View>

              <View style={styles.cards}>
                
                  <View style={styles.addLivro}>
                        <FAB 
                          style={{backgroundColor:'#e0e0e0'}} 
                          icon={props => <AntDesign name="plus" size={24} color="black" />}
                          // icon="home-plus"
                          onPress={() => navigation.navigate('Add')}
                          color="#e0e0e0"
                        />
                  </View>

                  {filtered.map((livro, index) => (
                    <CardLivro key={index} livro={livro} navigation={navigation} />
                  ))}

              </View>
              
              <BottomSheetModal
                  ref={bottomSheetModalRef}
                  index={0}
                  snapPoints={snapPoints}
                  style={styles.bottomSheet}
                >
                <View style={styles.bottomSheet}>
                  <Text>Awesome 🎉</Text>
                </View>
              </BottomSheetModal>

            </ScrollView>
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
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
      flexWrap: "wrap",
      justifyContent:'center'
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
      flexWrap: "wrap",
    },
    bottomSheet: {  
      zIndex: 999999
    }
});
  