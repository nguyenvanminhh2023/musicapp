export interface IPlaylist {
  id: number | string;
  title: string;
  items: string[];
}

export interface ItemType {
  id: number | string;
  title: string;
  artwork?: any;
}
