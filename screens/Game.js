import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Title from '../utils/Title';
import NumberContainer from '../utils/NumberContainer';
import PrimaryBtn from '../utils/PrimaryBtn';
import Card from '../utils/Card';
import { Colors } from '../constants';
import GuessLogItem from '../components/GuessLogItem';

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
let minBoundary = 1;
let maxBoundary = 100;
const Game = ({ userNumber, gameOverHandler, onGetRounds }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  useEffect(() => {
    console.log(currentGuess, userNumber);
    if (+currentGuess === +userNumber) {
      gameOverHandler();
    }
  }, [currentGuess, userNumber]);
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", 'You know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prev) => [newRndNumber, ...prev]);
    onGetRounds(guessRounds.length);
  };
  const guessRoundNumber = guessRounds.length;
  return (
    <View style={styles.container}>
      <Title>Opponent's guest</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Text style={styles.instruction}>Higher or Lower?</Text>
        <View style={{ flexDirection: 'row' }}>
          <PrimaryBtn
            style={{ width: 100 }}
            pressHandler={nextGuessHandler.bind(this, 'lower')}
          >
            <Ionicons name="remove" size={24} color="white" />
          </PrimaryBtn>
          <PrimaryBtn
            style={{ width: 100 }}
            pressHandler={nextGuessHandler.bind(this, 'greater')}
          >
            <Ionicons name="add" size={24} color="white" />
          </PrimaryBtn>
        </View>
      </Card>
      <View style={{ flex: 1, paddingVertical: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {guessRounds.map((round, index) => (
            <GuessLogItem
              key={index}
              roundNum={guessRoundNumber - index}
              guess={round}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  instruction: {
    color: Colors.accent500,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
