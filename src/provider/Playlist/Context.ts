import { createContext, useContext } from 'react';
import { IPlaylist } from 'src/interfaces';

export type ContextType = {
  timeToStop: number;
  myPlayLists: IPlaylist[];

  setMyPlayLists: (lists: IPlaylist[]) => void;
  setTimeToStop: (time: number) => void;
};

export const Context = createContext<ContextType>({} as ContextType);

export const usePlaylist = () => {
  const context = useContext(Context);

  return context;
};
