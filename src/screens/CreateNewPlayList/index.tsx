/* eslint-disable react-native/no-inline-styles */
import { tracks } from '../../../data';
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Keys } from 'src/constants';
import { usePlayer, usePlaylist } from 'src/provider';
import { MINI_AREA_HEIGHT } from '../Player/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Back } from 'src/icons';

export default function CreateNewPlayList() {
  const { displayPlayer } = usePlayer();
  const navigation = useNavigation();
  const { myPlayLists, setMyPlayLists } = usePlaylist();
  const [namePlayList, setNamePlayList] = React.useState('');
  const [arraySelect, setArraySelect] = React.useState<Array<string>>([]);

  const isSelected = (id: string) => {
    return arraySelect.includes(id);
  };

  const onPressItem = (id: string) => {
    const newData = [...arraySelect];
    const indexOfItem = newData.findIndex((value: string) => value === id);
    if (indexOfItem !== -1) {
      newData.splice(indexOfItem, 1);
    } else {
      newData.push(id);
    }
    setArraySelect(newData);
  };

  const onPressConfirmButton = async () => {
    if (namePlayList.trim() === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập tên playlist của bạn');
    } else if (arraySelect.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một bài hát');
    } else if (
      myPlayLists &&
      myPlayLists.findIndex((item) => item.title === namePlayList.trim()) !== -1
    ) {
      Alert.alert('Thông báo', 'Playlist đã tồn tại');
    } else {
      const newPlayLists = [
        ...myPlayLists,
        { title: namePlayList, items: arraySelect, id: Date.now().toString() },
      ];
      setMyPlayLists(newPlayLists);
      const jsonValue = JSON.stringify(newPlayLists);
      await AsyncStorage.setItem(Keys.MY_PLAY_LISTS, jsonValue);
      Alert.alert('Thông báo', 'Tạo playlist thành công', [
        {
          text: 'Đồng ý',
          onPress: () => navigation.goBack(),
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back fill="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Tạo Playlist</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nhập tên playlist"
          value={namePlayList}
          onChangeText={(text: string) => setNamePlayList(text)}
          style={styles.input}
          placeholderTextColor={Colors.white}
        />
      </View>
      <FlatList
        data={tracks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }: { item: any; index: number }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.itemContainer}
              onPress={() => onPressItem(item.id)}>
              <View style={styles.artworkContainer}>
                {item.artwork ? (
                  <FastImage source={item.artwork} style={styles.artwork} />
                ) : null}

                <View style={styles.artworkInlineBorder}>
                  <View style={styles.artworkPoint} />
                </View>
              </View>

              <View
                style={[
                  styles.content,
                  index === tracks.length - 1 && { borderBottomWidth: 0 },
                ]}>
                <View style={styles.information}>
                  <Text style={styles.itemTitle}>{item.title}</Text>

                  <View style={styles.artist}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.itemArtist}>
                      {item.artist}
                    </Text>
                  </View>
                </View>

                <View style={styles.time}>
                  <Text style={styles.itemDuration}>{item.duration}</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  {isSelected(item.id) && (
                    <View
                      style={[
                        styles.checkbox,
                        {
                          backgroundColor: '#2835FF',
                          borderRadius: 12,
                        },
                      ]}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
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
    backgroundColor: '#35234C',
  },
  header: {
    paddingVertical: 5,
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    color: Colors.white,
    textAlign: 'center',
    marginLeft: 16,
  },
  inputContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    height: 45,
    paddingHorizontal: 16,
    paddingVertical: 3,
    fontSize: 14,
    fontWeight: 'normal',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#AEAEAE',
    color: Colors.white,
  },
  itemContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  artworkContainer: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },

  artwork: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },

  artworkInlineBorder: {
    width: 47,
    height: 47,
    borderRadius: 47 / 2,
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },

  artworkPoint: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.black,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.mute,
    marginLeft: 20,
    paddingVertical: 10,
  },

  information: {
    flex: 1,
    paddingRight: 10,
  },

  artist: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    minWidth: 50,
    alignItems: 'flex-end',
  },

  checkboxContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#AEAEAE',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },

  checkbox: {
    width: 12,
    height: 12,
  },

  itemTitle: {
    fontSize: 16,
    color: Colors.white,
  },

  itemArtist: {
    fontSize: 14,
    color: Colors.white,
  },

  itemDuration: {
    fontSize: 16,
    color: Colors.mute,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 16,
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
