export interface RegionData {
  name: string;
  description: string;
}

export interface MapData {
  imgSrc: string;
  regions: {
    [key: string]: RegionData;
  };
}
