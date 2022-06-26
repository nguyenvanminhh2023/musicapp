import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Colors } from 'src/constants';
import { RootStackParamList } from 'src/interfaces/RootStackParamList';

type HeaderProps = NativeStackNavigationProp<RootStackParamList, 'TopTabs'>;

export const Header = () => {
  const navigation = useNavigation<HeaderProps>();

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.buttonWrap}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#0091EA' }]}
            onPress={() => {
              navigation.navigate('MenuBySingerScreen');
            }}>
            <Image
              source={require('../../../images/micro.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.textBtn}>Ca sĩ</Text>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#F57F17' }]}
            onPress={() => {
              navigation.navigate('MenuByAlbumScreen');
            }}>
            <Image
              source={require('../../../images/music-album.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.textBtn}>Album</Text>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#00BFA5' }]}
            onPress={() => {
              navigation.navigate('MenuByTypeScreen');
            }}>
            <Image
              source={require('../../../images/app.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.textBtn}>Thể loại</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonWrap: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 5,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textBtn: {
    marginTop: 8,
    fontSize: 13,
    color: '#212121',
    textAlign: 'center',
  },
});
