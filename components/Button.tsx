import { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface IProps {
  description: string,
  onPress: () => unknown,
  backgroundColor: string
};

export function Button({ description, onPress, backgroundColor }: IProps): ReactElement {
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
    padding: 10
  },

  title: {
    color: 'white'
  }
});
  