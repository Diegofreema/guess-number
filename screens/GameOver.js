import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Title from '../utils/Title';
import { Colors } from '../constants';
import PrimaryBtn from '../utils/PrimaryBtn';

const GameOver = ({ roundsNumber, userNumber, onStartNewGame }) => {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over</Title>
      <View style={styles.imgCon}>
        <Image source={require('../assets/success.png')} style={styles.img} />
      </View>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 24 }}>
        Your phone needed <Text style={styles.summaryText}>{roundsNumber}</Text>{' '}
        rounds to guess the number{' '}
        <Text style={styles.summaryText}>{userNumber}</Text>{' '}
      </Text>
      <PrimaryBtn pressHandler={onStartNewGame}>Start New Game</PrimaryBtn>
    </View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCon: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.primary800,
    marginVertical: 20,
  },
  img: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontWeight: 'bold',
    color: Colors.primary500,
  },
});
