import { useState, useEffect, ReactElement } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, ScrollView } from 'react-native';
import { EpisodeItem, Button } from './components';
import { MovieConfig, SortType } from './types';

const baseUrl = 'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/';

export default function App(): ReactElement {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<MovieConfig[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getMovies = async (): Promise<void> => {
     try {
      const response = await fetch(baseUrl + 'movies.json');
      const json = await response.json();
      setMovies(json.movies);

    } catch (error: any) {
      setErrorMsg(error.message);

    } finally {
      setLoading(false);
    }
  }

  const sortMovies = (isAscending: SortType): () => unknown => {

    return () => setMovies(() => {
      return [...movies.sort((x: MovieConfig, y: MovieConfig) => {
        return isAscending === SortType.Ascending ? 
          x.episode_number - y.episode_number : 
          y.episode_number - x.episode_number
      })]
    })
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <View style={ styles.appContainer }>
      {isLoading ? <ActivityIndicator> </ActivityIndicator> : (
        <ScrollView>
          <FlatList
            data={movies}
            keyExtractor={({ episode_number }: MovieConfig ) => episode_number.toString() }

            ListEmptyComponent={<Text>{ errorMsg }</Text>}
            
            renderItem={({ item }: {item: MovieConfig}) => (
              <EpisodeItem
                titleWithEpisode={ item.title }
                episodeNumber={ item.episode_number }
                imageSrc={{uri: baseUrl + 'public/images/' + item.poster }}
              />
            )}
          >
          </FlatList>

          <View>
            <Button 
              backgroundColor={"#fca311"}
              description="sort ascendingly" 
              onPress={sortMovies(SortType.Ascending)}
            />

            <Button 
              backgroundColor={"#14213d"}
              description="sort descendingly" 
              onPress={sortMovies(SortType.Descending)}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
