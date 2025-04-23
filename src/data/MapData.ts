export interface Area {
  shape: string;
  coords: string;
}

export interface Coords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Region {
  code?: string;
  name: string;
  description: string;
  areas: {
    shape: string;
    coords: Coords;
  }[];
}

export interface MapImage {
  src: string;
  sizeX: number;
  sizeY: number;
}

export interface Map {
  image: MapImage;
  regions: {
    [key: string]: Region;
  };
}
