import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar as Status,
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Start from './screens/Start';
import Game from './screens/Game';
import GameOver from './screens/GameOver';

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [rounds, setRounds] = useState(0);
  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };
  const gameOverHandler = () => {
    setGameIsOver(true);
  };
  const startNewGame = () => {
    setUserNumber(null);
    setRounds(0);
  };
  const getRounds = (rounds) => {
    setRounds(rounds);
  };
  let screen = <Start onPickedNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = (
      <Game
        setRounds={setRounds}
        userNumber={userNumber}
        gameOverHandler={gameOverHandler}
        onGetRounds={getRounds}
      />
    );
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOver
        userNumber={userNumber}
        roundsNumber={rounds}
        onStartNewGame={startNewGame}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.container}>
        <ImageBackground
          source={require('./assets/background.png')}
          resizeMode={'cover'}
          style={{ flex: 1 }}
          imageStyle={{ opacity: 0.15 }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop:
                Platform.OS === 'android' ? Status.currentHeight : null,
            }}
          >
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddb52f',
    flex: 1,
  },
});
