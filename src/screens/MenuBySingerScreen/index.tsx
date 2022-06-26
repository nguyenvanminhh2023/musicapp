import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { listSinger, listAlbum, listTypeTracks, tracks } from '../../../data';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Colors } from 'src/constants';
import { RootStackParamList } from 'src/interfaces/RootStackParamList';
import { ItemType } from 'src/interfaces/Playlist';
import { usePlayer } from 'src/provider';
import { MINI_AREA_HEIGHT } from '../Player/Dimensions';
import { Back } from 'src/icons';

type MenuBySingerScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'MenuBySingerScreen'
>;

export default function MenuBySingerScreen() {
  const { displayPlayer } = usePlayer();
  const navigation = useNavigation<MenuBySingerScreenProps>();

  const onPress = (item: ItemType) => {
    const data = tracks.filter((track) => track.singerId === item.id);
    navigation.navigate('ListByFilterScreen', {
      data,
      title: item.title,
    });
  };

  return (
    <ImageBackground
      source={require('../../../images/bg1.jpg')}
      blurRadius={0.9}
      style={[
        styles.container,
        { paddingBottom: displayPlayer ? MINI_AREA_HEIGHT : 0 },
      ]}>
      <ImageBackground
        source={require('../../../images/bg2.jpg')}
        style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back fill="#AB47BC" />
        </TouchableOpacity>
      </ImageBackground>
      <FlatList
        data={listSinger}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }: { item: ItemType; index: number }) => {
          return (
            <TouchableOpacity style={styles.btn} onPress={() => onPress(item)}>
              <Image
                style={styles.image}
                source={require('../../../images/micro.png')}
              />
              <Text style={styles.textBtn}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </ImageBackground>
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
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: 80,
    resizeMode: 'cover',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#AB47BC',
    flex: 1,
    textAlign: 'center',
  },
  btn: {
    paddingVertical: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  textBtn: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
    marginLeft: 16,
  },
});
