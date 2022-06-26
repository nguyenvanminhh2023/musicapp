/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { Colors, Keys } from 'src/constants';
import { usePlayer, usePlaylist } from 'src/provider';
import { MINI_AREA_HEIGHT } from '../Player/Dimensions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/interfaces/RootStackParamList';
import { IPlaylist } from 'src/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Back } from 'src/icons';

const { width } = Dimensions.get('window');

type MyPlayListProps = NativeStackScreenProps<
  RootStackParamList,
  'AddToPlayListScreen'
>;

export default function AddToPlayListScreen({ route, navigation }: MyPlayListProps) {
  const { displayPlayer } = usePlayer();
  const { myPlayLists, setMyPlayLists } = usePlaylist();
  const [itemSelect, SetItemSelect] = React.useState<IPlaylist | null>(null);

  const onPressItem = (item: IPlaylist) => {
    SetItemSelect(item);
  };

  const onPress = () => {
    navigation.navigate('CreatePlayListScreen', {
      trackId: route.params.trackId,
    });
  };

  const onPressConfirmButton = async () => {
    if (itemSelect?.items?.includes(route.params.trackId)) {
      Alert.alert('Thông báo', 'Bài hát đã tồn tại trong playlist');
    } else {
      const newPlayLists = [...myPlayLists];
      const indexOfPlayList = newPlayLists.findIndex(
        (item) => item.id === itemSelect?.id,
      );
      const newPlayList = { ...newPlayLists[indexOfPlayList] };
      newPlayList.items.push(route.params.trackId);
      const newData = newPlayLists.map((item, index) => {
        if (index === indexOfPlayList) {
          return newPlayList;
        }
        return item;
      });
      setMyPlayLists(newData);
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem(Keys.MY_PLAY_LISTS, jsonValue);
      Alert.alert('Thông báo', 'Thành công', [
        {
          text: 'Đồng ý',
          onPress: () => navigation.navigate('TopTabs'),
        },
      ]);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: displayPlayer ? MINI_AREA_HEIGHT : 0 },
      ]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back size={20} fill="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thêm vào playlist</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={myPlayLists}
        renderItem={({ item }: { item: IPlaylist; index: number }) => {
          return (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onPressItem(item)}>
              <View style={styles.contentBtn}>
                <Image
                  source={require('../../../images/itunes.png')}
                  style={styles.playlist}
                />
                <Text style={styles.textBtn}>{item.title}</Text>
              </View>
              <TouchableOpacity style={styles.dotBtn}>
                <View style={styles.dotWrap}>
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          item.id === itemSelect?.id ? '#AB47BC' : Colors.white,
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
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
              <Text style={styles.textButton}>Tạo playlist mới</Text>
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
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={onPressConfirmButton}>
          <Text style={styles.confirmText}>Lưu playlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    paddingVertical: 5,
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: Colors.black,
    textAlign: 'center',
    marginLeft: 16,
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
  contentBtn: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 7,
  },
  dotBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dotWrap: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 15,
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
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 40,
    paddingVertical: 16,
    flex: 1,
    marginBottom: 16,
  },
  confirmButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AB47BC',
  },
  confirmText: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});
