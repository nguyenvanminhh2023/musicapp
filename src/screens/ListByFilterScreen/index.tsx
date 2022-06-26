/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Colors } from 'src/constants';
import { Back } from 'src/icons';
import { usePlayer } from 'src/provider';
import { MINI_AREA_HEIGHT } from '../Player/Dimensions';
import ListItem from '../Playlist/Lists/ListItem';

const { width } = Dimensions.get('window');

interface ListByFilterProps {
  route: {
    params: {
      data: Array<any>;
      title: string;
    };
  };
}

export default function ListByFilterScreen(props: ListByFilterProps) {
  const { displayPlayer } = usePlayer();
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: displayPlayer ? MINI_AREA_HEIGHT : 0 },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back fill="#AB47BC" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>{props.route.params.title}</Text>
      </View>
      <ListItem data={props.route.params.data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingVertical: 5,
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#AB47BC',
    textAlign: 'center',
    marginLeft: 30,
  },
  horizontal: {
    height: '100%',
    flexDirection: 'row',
  },
  vertical: {
    width: width,
    height: '100%',
    overflow: 'hidden',
  },
});
