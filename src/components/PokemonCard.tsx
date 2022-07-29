import React, {useState, useEffect, useRef} from 'react';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import {FadeInImage} from './FadeInImage';
import {getColors} from '../helpers/getColors';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
interface Props {
  pokemon: SimplePokemon;
}
export const PokemonCard = ({pokemon}: Props) => {
  const navigation = useNavigation();
  const [bgColor, setBgColor] = useState<string>('gray');
  const isMounted = useRef(true);

  useEffect(() => {
    getColors(pokemon.picture).then(color => {
      if (!isMounted.current) {
        return;
      }
      setBgColor(color[0]);
    });
    // Para arreglar el warning de que no debemos usar un useState en un componente despmontado:
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        ...styles.contaner,
        width: windowWidth * 0.4,
        backgroundColor: bgColor,
      }}
      onPress={() =>
        navigation.navigate(
          'PokemonScreen' as never,
          {
            pokemon,
            color: bgColor,
          } as never,
        )
      }>
      <Text style={styles.name}>
        {pokemon.name.toUpperCase()}
        {'\n#' + pokemon.id}
      </Text>
      <View style={styles.pokebolaContainer}>
        <Image
          source={require('../assets/pokebolaBlanca.png')}
          style={styles.pokebola}
        />
      </View>

      <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contaner: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 10,
    padding: 10,
    height: 120,
    width: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  name: {
    fontSize: 20,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -25,
    right: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
});
