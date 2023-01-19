import { useState, useEffect, useContext } from "react";
import {  Text , View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import AuthContext from '../../service/Auth';
import { getUsers } from "../../service/API";
import { TextInput } from 'react-native-paper';
import { Button, Snackbar } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {


  const { setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("pedro@gmail.com");
  const [senha, setSenha] = useState("123");
  const [usuarios, setUsuarios] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers()
      .then(function (response) {
        setUsuarios(response.data);
      })
      .catch(function (error) {
        console.log(error.data);
      });
  }, []);

  const enviaLogin = async () => {
    if (usuarios) {
      const user = usuarios.filter((user) => user.email === email);

      if (!user.length) {
        setError("Não cadastrado");
        setAlerta(true);
      } else {
        if (user[0].senha !== senha) {
          setError("Senha incorreta");
          setAlerta(true);
        } else {
          const value = user[0].id;
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('login', jsonValue);
          setAuthenticated(jsonValue);
          // console.log(jsonValue);
          // navigation.navigate({name: 'Home'});
        }
      }
    } else {
      console.log("backend está dormindo. Aguarde");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled={true}>

        <View>
            <TextInput
                label="Email"
                mode="outlined"
                value={email || ''}
                onChangeText={(e)=>{setEmail(e)}}
                textColor='#fff'
                outlineColor='#fff'
                activeOutlineColor='#fff'
                style={{ margin: 16, backgroundColor:"#282c34" }}
                theme={{ colors: { onSurfaceVariant: '#fff'} }}
            />

            <TextInput
                label="Senha"
                mode="outlined"
                value={senha || ''}
                onChangeText={(e)=>{setSenha(e)}}
                textColor='#fff'
                outlineColor='#fff'
                activeOutlineColor='#fff'
                style={{ margin: 16, backgroundColor:"#282c34" }}
                theme={{ colors: { onSurfaceVariant: '#fff'} }}
            />

          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <Button 
                  style={{width:win.width/2, backgroundColor:"green", marginBottom:16}}
                  mode="outlined" 
                  title="Entrar" 
                  onPress={(e) => enviaLogin(e)} 
              />
          </View>
            
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const win = Dimensions.get('window');
const ratio = win.width/100;