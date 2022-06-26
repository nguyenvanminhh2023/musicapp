import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { listAlbum, tracks } from '../../../data';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Colors } from 'src/constants';
import { RootStackParamList } from 'src/interfaces/RootStackParamList';
import { ItemType } from 'src/interfaces/Playlist';
import { usePlayer } from 'src/provider';
import { MINI_AREA_HEIGHT } from '../Player/Dimensions';
import { Back } from 'src/icons';

type MenuByAlbumScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'MenuByAlbumScreen'
>;

export default function MenuByAlbumScreen() {
  const { displayPlayer } = usePlayer();
  const navigation = useNavigation<MenuByAlbumScreenProps>();

  const onPress = (item: ItemType) => {
    const data = tracks.filter((track) => track.albumId === item.id);
    navigation.navigate('ListByFilterScreen', {
      data,
      title: item.title,
    });
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: displayPlayer ? MINI_AREA_HEIGHT : 0 },
      ]}>
      <ImageBackground
        source={require('../../../images/bg4.jpg')}
        style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back fill="#AB47BC" />
        </TouchableOpacity>
      </ImageBackground>
      <FlatList
        data={listAlbum}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }: { item: ItemType; index: number }) => {
          return (
            <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.8}>
              <ImageBackground
                source={item.artwork}
                style={styles.itemContainer}
                borderRadius={8}>
                <View style={styles.btn}>
                  <Text style={styles.textBtn}>{item.title}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
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
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: 80,
    resizeMode: 'cover',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#AB47BC',
  },
  itemContainer: {
    height: 200,
    justifyContent: 'flex-end',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginVertical: 16,
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
  textBtn: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
  },
});
