import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../navigation/TabList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {PokemonDetails} from '../components/PokemonDetails';
import {usePokemo} from '../hooks/usePokemon';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {top} = useSafeAreaInsets();
  const {pokemon, color} = route.params;
  const {isLoading, pokemonFull} = usePokemo(pokemon.id);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        <TouchableOpacity
          style={{
            ...styles.backButton,
            top: top + 5,
          }}
          activeOpacity={0.8}
          onPress={() => navigation.pop()}>
          <Icon name="arrow-back-outline" color="white" size={40} />
        </TouchableOpacity>
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 40,
          }}>
          {pokemon.name + '\n#'}
          {pokemon.id}
        </Text>
        <Image
          source={require('../assets/pokebolaBlanca.png')}
          style={styles.pokeball}
        />
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
      {isLoading ? (
        <View>
          <ActivityIndicator
            style={styles.loadingIndicator}
            color={color}
            size={50}
          />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemonFull} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 15,
    elevation: 15,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
