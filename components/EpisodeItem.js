import { StyleSheet, Text, View, Image } from 'react-native';

export function EpisodeItem({ titleWithEpisode, imageSrc, episodeNumber }) {
    const extractTitle = (titleWithEpisode) => {
        return titleWithEpisode.split('- ')[1]
    }

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
        padding: '15px'
    },

    image : { 
        width: 200, 
        height: 280, 
        marginBottom: '15px',
    },

    row: {
        flexDirection: 'row'
    }
});
  