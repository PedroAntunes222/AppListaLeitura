import { useState, useEffect } from 'react';
import { getLivro } from '../../service/API'
import { Text, View, Button, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function MostraLivro({ navigation, route }) {

  // const { authenticated } = useContext(AuthContext);
  // const [refresh, setRefresh] = useState(0);
  // const [loading, setLoading] = useState(true);
  // const [modal, setModal] = useState(false);
  // const [message, setMessage] = useState("");
    
  const [livro, setLivro] = useState([]);

  useEffect(() => {
    // setLoading(true);
    let IDLivro = route.params.userid;
    getLivro(IDLivro)
      .then((response) => {
        setLivro(response.data);
        // setLoading(false);
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={styles.capa}
            source={
              livro.capa ?
                {uri: livro.capa }
                : {uri:'https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg'}
            }
        />
        
        <View>
          <Text>{livro.titulo}</Text>

          <Text>
            
          {livro.generoPrincipal}

          {livro.generoSecundario && 
            <>/ {livro.generoSecundario}</>
          }
          </Text> 
        </View>

        <Text>{livro.sinopse}</Text>
        {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
        </View>
      </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  capa: {
      width: 150,
      height: 200
  }
});