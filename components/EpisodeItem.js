import { StyleSheet, Text, View, Image } from 'react-native';

export function EpisodeItem({ title, imageSrc }) {
  return (
    <View style={ styles.container }>
        <Image 
            source={ imageSrc } 
            style={ styles.image }
        />
        <Text>{ title }</Text>
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
});
  