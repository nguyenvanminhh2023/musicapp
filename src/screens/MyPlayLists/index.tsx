/* eslint-disable react-native/no-inline-styles */
import { tracks } from '../../../data';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Colors } from 'src/constants';
import { usePlayer } from 'src/provider';
import { MINI_AREA_HEIGHT } from '../Player/Dimensions';
import ListItem from '../Playlist/Lists/ListItem';
import { Back } from 'src/icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface MyPlayListProps {
  route: {
    params: {
      data: Array<string>;
      title: string;
    };
  };
}

export default function MyPlayListScreen(props: MyPlayListProps) {
  const { displayPlayer } = usePlayer();
  const navigation = useNavigation();
  const [listData, setListData] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    const newData = tracks.filter((item) =>
      props.route.params.data.includes(item.id),
    );
    setListData(newData);
  }, []);

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
      <ListItem data={listData} />
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
