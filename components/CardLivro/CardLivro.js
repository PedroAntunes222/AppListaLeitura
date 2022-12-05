import React from 'react'
import { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Stack, Button } from "@react-native-material/core";

export default function CardLivro(props) {
  return (
    <TouchableOpacity
    style={styles.card}
      onPress={() => props.navigation.navigate({
        name: 'Page',
        params: { userid: props.livro.id, title: props.livro.titulo }
        })
    }>
        <Image
            style={styles.capa}
            source={
              props.livro.capa ?
                {uri: props.livro.capa }
                : {uri:'https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg'}
              }
        />

        {!props.livro.capa && (
          <Text style={styles.text}>{props.livro.titulo}</Text>
        )}
        
  </TouchableOpacity>
  )
}

const win = Dimensions.get('window');
const ratio = win.width/541;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    position: 'relative'
  },
  capa: {
    width: win.width/2,
    height: 400 * ratio
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    bottom: 30
  }
});