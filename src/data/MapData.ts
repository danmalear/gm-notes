export interface RoomData {
  name: string;
  description: string;
}

export interface MapData {
  imgSrc: string;
  rooms: {
    [key: string]: RoomData;
  };
}
