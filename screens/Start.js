import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import PrimaryBtn from '../utils/PrimaryBtn';
import Title from '../utils/Title';
import { Colors } from '../constants';
import Card from '../utils/Card';

const Start = ({ onPickedNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState('');
  const resetInputHandler = () => {
    setEnteredNumber('');
  };
  const numberInputHandler = (text) => {
    setEnteredNumber(text);
  };
  const confirmNumber = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >= 99) {
      Alert.alert('Invalid number', 'Number has to be between 1 and 99', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    onPickedNumber(enteredNumber);
  };
  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <Text style={styles.instruction}>Enter a Number</Text>
        <TextInput
          style={styles.input}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.row}>
          <View style={styles.button}>
            <PrimaryBtn pressHandler={resetInputHandler}>Reset</PrimaryBtn>
          </View>
          <View style={styles.button}>
            <PrimaryBtn pressHandler={confirmNumber}>Confirm</PrimaryBtn>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },

  input: {
    height: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f',
    fontWeight: 'bold',
    marginVertical: 8,
    width: 50,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    width: '50%',
  },
  instruction: {
    color: Colors.accent500,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
