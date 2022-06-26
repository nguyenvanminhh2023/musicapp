import { ImageRequireSource } from 'react-native';
import { ITrack } from 'src/interfaces';

export const defaultTrack: ITrack = {
  id: '',
  title: 'undefined',
  artist: 'undefined',
  albumId: '',
  singerId: '',
  typeTracksId: '',
  url: '',
  duration: '0',
  artwork: 0 as ImageRequireSource,
};
