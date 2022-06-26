export type RootStackParamList = {
  TopTabs: undefined;
  MenuBySingerScreen: undefined;
  MenuByAlbumScreen: undefined;
  MenuByTypeScreen: undefined;
  ListByFilterScreen: {
    data: Array<any>;
    title: string;
  };
  MyPlayListScreen: {
    data: Array<string>;
    title: string;
  };
  Personal: undefined;
  CreateNewPlayList: undefined;
  AddToPlayListScreen: {
    trackId: string;
  };
  CreatePlayListScreen: {
    trackId: string;
  };
};
