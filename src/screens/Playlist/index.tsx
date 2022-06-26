import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, InteractionManager } from 'react-native';

import { Colors, Keys } from 'src/constants';
import { usePlayer, usePlaylist } from 'src/provider';

import { MINI_AREA_HEIGHT } from '../Player/Dimensions';

import { Header } from './Header';
import { Lists } from './Lists';
import { pause } from 'react-native-track-player';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Playlist = () => {
  const { timeToStop, setTimeToStop, setMyPlayLists } = usePlaylist();

  const { setPlaying, displayPlayer } = usePlayer();
  const [timer, setTimer] = useState(null);

  const getData = async () => {
    const value = await AsyncStorage.getItem(Keys.MY_PLAY_LISTS);
    if (value !== null) {
      setMyPlayLists(JSON.parse(value));
    }
  };

  useEffect(() => {
    if (timeToStop !== 0) {
      let newTimer = timer;
      if (newTimer) {
        clearTimeout(newTimer);
      }
      newTimer = setTimeout(() => {
        pause();
        setPlaying(false);
        setTimeToStop(0);
      }, timeToStop);
      BackgroundTimer.runBackgroundTimer(() => {
        pause();
        setPlaying(false);
        setTimeToStop(0);
        BackgroundTimer.stopBackgroundTimer();
      }, timeToStop);
      setTimer(newTimer);
    } else {
      let newTimer = timer;
      clearTimeout(newTimer);
      setTimer(newTimer);
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [timeToStop]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: displayPlayer ? MINI_AREA_HEIGHT : 0 },
      ]}>
      <Header />
      <Lists />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 0,
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
});
