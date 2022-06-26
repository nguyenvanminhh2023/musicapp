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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/interfaces/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'CreatePlayListScreen'>;

export default function CreatePlayListScreen({ route, navigation }: Props) {
  const { displayPlayer } = usePlayer();
  const { myPlayLists, setMyPlayLists } = usePlaylist();
  const [namePlayList, setNamePlayList] = React.useState('');

  const onPressConfirmButton = async () => {
    if (namePlayList.trim() === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập tên playlist của bạn');
    } else if (
      myPlayLists &&
      myPlayLists.findIndex((item) => item.title === namePlayList.trim()) !== -1
    ) {
      Alert.alert('Thông báo', 'Playlist đã tồn tại');
    } else {
      const newPlayLists = [
        ...myPlayLists,
        {
          title: namePlayList,
          items: [route.params.trackId],
          id: Date.now().toString(),
        },
      ];
      setMyPlayLists(newPlayLists);
      const jsonValue = JSON.stringify(newPlayLists);
      await AsyncStorage.setItem(Keys.MY_PLAY_LISTS, jsonValue);
      Alert.alert('Thông báo', 'Tạo playlist thành công', [
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
    justifyContent: 'space-between',
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
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: 'normal',
    color: Colors.white,
    textAlignVertical: 'top',
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
