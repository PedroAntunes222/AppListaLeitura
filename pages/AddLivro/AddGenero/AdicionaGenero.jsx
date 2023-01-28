import { useState, useEffect, useContext } from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import AuthContext from "../../../service/Auth";
import { getGeneros, addGenero, delGenero, putGenero } from "../../../service/API";
import { TextInput } from 'react-native-paper';
import { Button } from "@react-native-material/core";

export default function AdicionaGenero({navigation}) {

  const { authenticated } = useContext(AuthContext);
  const [generos, setGeneros] = useState([]);
  const [nomeGenero, setNomeGenero] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getGeneros()
      .then(function (response) {
        setGeneros(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log('response.data');
      });
   }, []);

  const adicionaGenero = () => {
    addGenero(nomeGenero, authenticated)
    .then(function (response) {
        console.log(response);
        limpaForm();
        setSnack(true)
      })
      .catch(function (error) {
        console.log(error);
        // setMessage(error.data);
      });
      navigation.navigate('Add');
  }

  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled={true}>

        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            {generos.map((genero, index) => (
                <Text key={index}> {genero.nome} </Text>
            ))}
        </View>

        <View>
            <TextInput
                label="Novo Genero"
                mode="outlined"
                value={nomeGenero || ''}
                onChangeText={(e)=>{setNomeGenero(e)}}
                textColor='#fff'
                outlineColor='#fff'
                activeOutlineColor='#fff'
                style={{ margin: 16, backgroundColor:"#282c34" }}
                theme={{ colors: { onSurfaceVariant: '#fff'} }}
            />
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <Button 
                  style={{width:win.width/1.5, borderWidth: 1, borderColor:"#66bb6a", marginBottom:16}}
                  mode="outlined" 
                  title="Adicionar" 
                  color="#282c34"
                  tintColor="#66bb6a"
                  onPress={(e) => adicionaGenero(e)} 
              />
          </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const win = Dimensions.get('window');
const ratio = win.width/100;