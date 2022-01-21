import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function Button({ description, onPress, backgroundColor }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={ onPress }
      >
      <Text style={styles.title}> 
        { description } 
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },

  title: {
    color: 'white'
  }
});
  