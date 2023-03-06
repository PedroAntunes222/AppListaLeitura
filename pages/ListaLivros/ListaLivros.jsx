import { useState, useEffect, useContext, useRef } from 'react';
// import { getUser } from '../../service/API'
// import AuthContext from '../../service/Auth';
import * as SQLite from 'expo-sqlite';
import { getLivros, addLivro, initDB } from '../../localDatabase/sqliteDatabase';
import { selectGeneros } from '../../service/Generos';
import { Text , View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Button } from "@react-native-material/core";
import CardLivro from '../../components/CardLivro/CardLivro';
import { FAB, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider}  from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ListaLivros({navigation}) {

    // const { authenticated } = useContext(AuthContext);
    const [db, setDb] = useState(SQLite.openDatabase('biblioteca.db'));
    const [livros, setLivros] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [pesquisa, setPesquisa] = useState("");
    const [filterGenero, setFilterGenero] = useState("todos");
    const [filterCompleto, setFilterCompleto] = useState("todos");
    const [filterInfo, setFilterInfo] = useState("id");
    const [filterOrdenacao, setFilterOrdenacao] = useState("decrescente");

    const bottomSheetModalRef = useRef(null);

    const handleLivros = (livros) => {
        setLivros(livros);
    }

    useEffect(() => {
      initDB();
      getLivros(handleLivros);
    }, [db]);

    useEffect(() => { // atualiza lista ao voltar
      navigation.addListener('focus', () => {
        getLivros(handleLivros);
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
      <GestureHandlerRootView>
        <BottomSheetModalProvider style={styles.bottomSheet}>
          <SafeAreaView style={{height:windowHeight}}>
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
              
              <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                  style={{width:win.width/2, borderWidth: 1, borderColor:"#ffff", marginBottom:16}}
                  tintColor="#ffff"
                  mode="outlined"
                  title="Filtrar"
                  color="#282c34"
                  onPress={() => {
                    bottomSheetModalRef.current.present();
                  }}
                />
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
                snapPoints={["100%"]}
                // style={styles.bottomSheet}
                backgroundStyle={{ backgroundColor: '#282c34' }}
              >
                <View style={styles.sheetContent}>

                  <View>
                    <Text style={styles.titleFilters}>
                      Gênero
                    </Text>
                    <View style={styles.buttonFilters}>
                      <Button 
                          style={{width:win.width/2.5, borderWidth: 1, margin: 5,
                            borderColor: filterGenero === 'todos' ? "green" : "white",
                          }}
                          tintColor="#ffff"
                          mode="outlined"
                          title="Todos"
                          color="#282c34"
                          uppercase={false}
                          onPress={(e) => setFilterGenero('todos')}
                      />
                      {selectGeneros.map((genero, index)=>(
                        <Button 
                          key={index}
                          style={{width:win.width/2.5, borderWidth: 1, margin: 5,
                            borderColor: filterGenero === genero.label  ? "yellow" : "white",
                          }}
                          title={genero.label}
                          tintColor="#ffff"
                          mode="outlined"
                          color="#282c34"
                          uppercase={false}
                          onPress={(e) => setFilterGenero(genero.value)}
                        />
                      ))}
                    </View>
                  </View>

                  <View>
                    <Text style={styles.titleFilters}>
                      Completo
                    </Text>
                    <View style={styles.buttonFilters}>
                        <Button 
                            style={{width:win.width/4, borderWidth: 1, margin: 5,
                              borderColor: filterCompleto === 'todos' ? "green" : "white",
                            }}
                            tintColor="#ffff"
                            mode="outlined"
                            title="Todos"
                            color="#282c34"
                            uppercase={false}
                            onPress={(e) => setFilterCompleto('todos')}
                        />
                        <Button 
                            style={{width:win.width/4, borderWidth: 1, margin: 5,
                              borderColor: filterCompleto === 'completo' ? "yellow" : "white",
                            }}
                            tintColor="#ffff"
                            mode="outlined"
                            title="Sim"
                            color="#282c34"
                            uppercase={false}
                            onPress={(e) => setFilterCompleto('completo')}
                        />
                        <Button 
                            style={{width:win.width/4, borderWidth: 1, margin: 5,
                              borderColor: filterCompleto === 'incompleto' ? "red" : "white",
                            }}
                            tintColor="#ffff"
                            mode="outlined"
                            title="Não"
                            color="#282c34"
                            uppercase={false}
                            onPress={(e) => setFilterCompleto('incompleto')}
                        />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.titleFilters}>
                      Parâmetro
                    </Text>
                    <View style={styles.buttonFilters}>
                        <Button 
                            style={{width:win.width/3, borderWidth: 1, margin: 5,
                              borderColor: filterInfo === 'titulo' ? "green" : "white",
                            }}
                            tintColor="#ffff"
                            mode="outlined"
                            title="Titulo"
                            color="#282c34"
                            uppercase={false}
                            onPress={(e) => setFilterInfo('titulo')}
                        />
                        <Button 
                            style={{width:win.width/3, borderWidth: 1, margin: 5,
                              borderColor: filterInfo === 'id' ? "green" : "white",
                            }}
                            tintColor="#ffff"
                            mode="outlined"
                            title="Data"
                            color="#282c34"
                            uppercase={false}
                            onPress={(e) => setFilterInfo('id')}
                        />
                        <Button 
                            style={{width:win.width/3, borderWidth: 1, margin: 5,
                              borderColor: filterInfo === 'rating' ? "green" : "white",
                            }}
                            tintColor="#ffff"
                            mode="outlined"
                            title="Estrelas"
                            color="#282c34"
                            uppercase={false}
                            onPress={(e) => setFilterInfo('rating')}
                        />
                        <Button 
                            style={{width:win.width/3, borderWidth: 1, margin: 5,
                              borderColor: filterInfo === 'paginasTotais' ? "green" : "white",
                            }}
                            tintColor="#ffff"
                            mode="outlined"
                            title="Páginas"
                            color="#282c34"
                            uppercase={false}
                            onPress={(e) => setFilterInfo('paginasTotais')}
                        />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.titleFilters}>
                      Ordem
                    </Text>
                    <View style={styles.buttonFilters}>
                        <Button 
                            style={{width:win.width/3, borderWidth: 1, margin: 5,
                              borderColor: filterOrdenacao === 'decrescente' ? "green" : "white",
                            }}
                            tintColor="#ffff"
                            mode="outlined"
                            title="Maior"
                            color="#282c34"
                            uppercase={false}
                            onPress={(e) => setFilterOrdenacao('decrescente')}
                        />
                        <Button 
                            style={{width:win.width/3, borderWidth: 1, margin: 5,
                              borderColor: filterOrdenacao === 'crescente' ? "green" : "white",
                            }}
                            tintColor="#ffff"
                            mode="outlined"
                            title="Menor"
                            color="#282c34"
                            uppercase={false}
                            onPress={(e) => setFilterOrdenacao('crescente')}
                        />
                    </View>
                  </View>

                </View>
              </BottomSheetModal>

            </ScrollView>
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    );
}
    
const win = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
const ratio = win.width/541;

const styles = StyleSheet.create({
  bottomSheet: {
    flex:1,
    height: windowHeight
  },
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
    titleFilters: {
      color: 'white', 
      fontSize: 18, 
      padding: 10, 
      paddingLeft: 10 
    },
    buttonFilters: {
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: "row", 
      flexWrap: "wrap", 
      padding: 10, 
      backgroundColor: "#343944" 
    }
});
  