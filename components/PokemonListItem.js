import React, { 
    Component, 
    PropTypes 
} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export default function PokemonListItem({ pokemon, onPress }) {
  let num = (() => {
    let { url } = pokemon;
    let parts = url.split('/');
    return parts[parts.length - 2];
  })();
  return (
    <View style={styles.pokemonListItem}>
      <Text style={styles.pokemonNumber}>#{num}</Text>
      <View style={styles.pokemonBackground}>
        <Image
          style={styles.pokemonIcon} 
          source={{uri: `http://192.168.1.129:8000/assets/images/pokemon-sprites/sprites/pokemon/model/${num}.png`}}/>
      </View>
      <Text style={styles.pokemonText}>{pokemon.name}</Text>
    </View>
  );
}

const dims = {
  width: 70,
  height: 70
}

const styles = StyleSheet.create({
  pokemonText: {
    textAlign: 'right',
    fontSize: 20,
    flex: 6,
  },
  pokemonNumber: {
    flex: 1
  },
  pokemonListItem: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    height: 100,
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  },
  pokemonIcon: {
    ...dims
  },
  pokemonBackground: {
    flex: -1,
    ...dims,
    borderRadius: 35,
    backgroundColor: '#95a5a6',
  }
});