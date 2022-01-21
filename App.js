import { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Button } from 'react-native';
import { EpisodeItem } from './components/EpisodeItem';

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

  const sortEpisodesAscendingly = () => {
    setMovies([...movies.sort((x, y) => x.episode_number > y.episode_number)]);
  }

  const sortEpisodesDescendingly = () => {
    setMovies([...movies.sort((x, y) => x.episode_number < y.episode_number)]);
  }

  useEffect(() => {
    getMovies();
  }, [])
  
  return (
    <View style={styles.appContainer}>
      {isLoading ? <ActivityIndicator> </ActivityIndicator> : (
        <View>
          <FlatList
            contentContainerStyle={ styles.movieContainer }
            data={movies}
            keyExtractor={({ episode_number }) => episode_number}

            ListEmptyComponent={<Text>{ errorMsg }</Text>}
            
            renderItem={({ item }) => (
              <EpisodeItem
                title={item.title}
                imageSrc={baseUrl + 'public/images/' + item.poster}
              />
            )}
          >
          </FlatList>

          <View>
            <Button 
              color={"#fca311"}
              title="sort ascendingly" 
              onPress={sortEpisodesAscendingly}
            />

            <Button 
              color={"#14213d"}
              title="sort descendingly" 
              onPress={sortEpisodesDescendingly}
            />
          </View>
        </View>
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

  movieContainer: {
    flexDirection: 'row',
  }
});
