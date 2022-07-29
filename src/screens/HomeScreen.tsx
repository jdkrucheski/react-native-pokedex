import React from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {styles} from '../theme/appTheme';
import {usePokemonPagination} from '../hooks/usePokemonPagination';
import {FlatList} from 'react-native-gesture-handler';
import {PokemonCard} from '../components/PokemonCard';
import {Header} from '../components/Header';

export const HomeScreen = () => {
  const {pokemonList, loadPokemons} = usePokemonPagination();
  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBg}
      />
      <Header text="Pokedex" />
      <FlatList
        data={pokemonList}
        numColumns={2}
        keyExtractor={pokemon => pokemon.id}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        //Infinite scroll:
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          <ActivityIndicator style={{height: 100}} size={20} color="grey" />
        }
      />
    </>
  );
};
