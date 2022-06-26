import React, { useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import { IPlaylist, ITrack } from 'src/interfaces';

import { Context } from './Context';

export { usePlaylist } from './Context';

interface Props {
  children: React.ReactNode;
}

export const PlaylistProvider: React.FC<Props> = ({ children }: Props) => {
  const [timeToStop, setTimeToStop] = useState<number>(0);
  const [myPlayLists, setMyPlayLists] = useState<IPlaylist[]>([]);

  return (
    <Context.Provider
      value={{
        timeToStop,
        myPlayLists,
        setTimeToStop,
        setMyPlayLists,
      }}>
      {children}
    </Context.Provider>
  );
};
