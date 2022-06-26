import { createContext, useContext } from 'react';
import { ITrack } from 'src/interfaces';

export type ContextType = {
  track: ITrack;
  isPlaying: boolean;

  setPlaying: (value: boolean) => void;
  displayPlayer: boolean;
};

export const Context = createContext<ContextType>({} as ContextType);

export const usePlayer = () => {
  const context = useContext(Context);

  return context;
};
