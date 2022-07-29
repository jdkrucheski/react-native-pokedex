import {useEffect, useState, useRef} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
  Result,
} from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [pokemonList, setPokemonList] = useState<SimplePokemon[]>([]);
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=1200');

  const loadPokemons = async () => {
    const res = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );
    mapPokemonList(res.data.results);
  };

  const mapPokemonList = (list: Result[]) => {
    const newPokemonList: SimplePokemon[] = list.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {id, picture, name};
    });
    setPokemonList(newPokemonList);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);
  return {
    pokemonList,
    isFetching,
  };
};
