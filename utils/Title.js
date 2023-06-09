import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
