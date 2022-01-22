import { ReactElement } from 'react';
import { StyleSheet, Text, View, Image, ImageURISource } from 'react-native';

interface IProps {
  titleWithEpisode: string,
  imageSrc: ImageURISource,
  episodeNumber: number
};

export function EpisodeItem({ titleWithEpisode, imageSrc, episodeNumber }: IProps): ReactElement {
  const extractTitle = (titleWithEpisode: string) => {
    return titleWithEpisode.split('- ')[1];
  };

  return (
    <View style={ styles.container }>
      <Image 
        source={ imageSrc } 
        style={ styles.image }
      />
      <View style={styles.row}>
        <Text> Title: </Text>
        <Text> { extractTitle(titleWithEpisode) } </Text>
      </View>
      <View style={styles.row}>
        <Text> Episode: </Text>
        <Text> { episodeNumber } </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '15px',
    alignItems: 'center',
  },

  image : { 
    width: 100, 
    height: 140, 
    marginBottom: '15px',
  },

  row: {
    flexDirection: 'row',
  },
});
  