import { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, ScrollView } from 'react-native';
import { EpisodeItem } from './components/EpisodeItem';
import { Button } from './components/Button';

const SortType = {
  'Ascending': true,
  'Descending': false,
}

const baseUrl = 'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const getMovies = async () => {
     try {
      const response = await fetch(baseUrl + 'movies.json');
      const json = await response.json();
      setMovies(json.movies);

    } catch (error) {
      setErrorMsg(error.message);

    } finally {
      setLoading(false);
    }
  }

  const getEpisodeSortingFunction = (isAscending) => {
    const updateSortedEpisodes = (sortingFunction) => setMovies([...movies.sort(sortingFunction)]);
    
    if (isAscending) {
      return () => updateSortedEpisodes((x, y) => x.episode_number > y.episode_number);
    }
    return () => updateSortedEpisodes((x, y) => x.episode_number < y.episode_number);
  }

  useEffect(() => {
    getMovies();
  }, [])
  
  return (
    <View style={ styles.appContainer }>
      {isLoading ? <ActivityIndicator> </ActivityIndicator> : (
        <ScrollView>
          <FlatList
            data={ movies }
            keyExtractor={({ episode_number }) => episode_number}

            ListEmptyComponent={<Text>{ errorMsg }</Text>}
            
            renderItem={({ item }) => (
              <EpisodeItem
                titleWithEpisode={ item.title }
                episodeNumber={ item.episode_number }
                imageSrc={ baseUrl + 'public/images/' + item.poster }
              />
            )}
          >
          </FlatList>

          <View>
            <Button 
              backgroundColor={"#fca311"}
              description="sort ascendingly" 
              onPress={getEpisodeSortingFunction(SortType.Ascending)}
            />

            <Button 
              backgroundColor={"#14213d"}
              description="sort descendingly" 
              onPress={getEpisodeSortingFunction(SortType.Descending)}
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
