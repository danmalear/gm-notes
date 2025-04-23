export interface Area {
  shape: string;
  coords: string;
}

export interface Region {
  code?: string;
  name: string;
  description: string;
  areas: {
    shape: string;
    coords: string;
  }[];
}

export interface Map {
  imgSrc: string;
  regions: {
    [key: string]: Region;
  };
}
