import { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const getMovies = async () => {
     try {
      const response = await fetch('https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json');
      const json = await response.json();
      setMovies(json.movies);

    } catch (error) {
      setErrorMsg(error.message);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])
  
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator> </ActivityIndicator> : 
        errorMsg ? <Text>{errorMsg}</Text> : (
        
          <FlatList
            data={movies}
            keyExtractor={({ episode_number }) => episode_number}
            renderItem={({ item }) => (
              <Text>{item.title}</Text>
            )}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
