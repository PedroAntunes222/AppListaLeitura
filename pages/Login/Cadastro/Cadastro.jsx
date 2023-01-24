import { useState, useEffect, useContext } from "react";
import {  Text , View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { addUser } from "../../../service/API";
import { TextInput } from 'react-native-paper';
import { Button, Snackbar } from "@react-native-material/core";

export default function Cadastro () {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [error, setError] = useState(false);


  const NovoUser = async () => {
    addUser(nome, email, senha)
    .then((response) => {
        console.log(response)
    }).catch((error) => console.log(error))
  };

  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled={true}>

        <View>
        <TextInput
                label="Nome"
                mode="outlined"
                value={nome || ''}
                onChangeText={(e)=>{setNome(e)}}
                textColor='#fff'
                outlineColor='#fff'
                activeOutlineColor='#fff'
                style={{ margin: 16, backgroundColor:"#282c34" }}
                theme={{ colors: { onSurfaceVariant: '#fff'} }}
            />

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
                  style={{width:win.width/1.5, borderWidth: 1, borderColor:"#66bb6a", marginBottom:16}}
                  mode="outlined" 
                  title="Cadastrar" 
                  color="#282c34"
                  tintColor="#66bb6a"
                  onPress={(e) => NovoUser(e)} 
                />
          </View>
            
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const win = Dimensions.get('window');
const ratio = win.width/100;