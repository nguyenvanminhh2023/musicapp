import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from 'src/constants';
import { IPlaylist } from 'src/interfaces';
import { RootStackParamList } from 'src/interfaces/RootStackParamList';
import { usePlayer, usePlaylist } from 'src/provider';
import { MINI_AREA_HEIGHT } from '../Player/Dimensions';

type PersonalScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Personal'
>;

export default function Personal() {
  const { displayPlayer } = usePlayer();
  const { myPlayLists } = usePlaylist();
  const navigation = useNavigation<PersonalScreenProps>();

  const onPress = () => {
    navigation.navigate('CreateNewPlayList');
  };

  const onPressItem = (item) => {
    navigation.navigate('MyPlayListScreen', {
      data: item.items,
      title: item.title,
    });
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: displayPlayer ? MINI_AREA_HEIGHT : 0 },
      ]}>
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={myPlayLists}
        renderItem={({ item }: { item: IPlaylist; index: number }) => {
          return (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onPressItem(item)}>
              <Image
                source={require('../../../images/itunes.png')}
                style={styles.playlist}
              />
              <Text style={styles.textBtn}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Image
                source={require('../../../images/music.png')}
                style={styles.playlist}
              />
              <Text style={styles.textButton}>Tạo danh sách mới</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Image
              style={styles.image}
              source={require('../../../images/workout.png')}
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
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
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#AB47BC',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    color: Colors.black,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 4,
    paddingVertical: 5,
    backgroundColor: Colors.white,
  },
  playlist: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textButton: {
    fontSize: 15,
    color: '#AB47BC',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  btn: {
    paddingVertical: 5,
    backgroundColor: Colors.white,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  textBtn: {
    fontSize: 17,
    color: '#212121',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  flatlistContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 150,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
