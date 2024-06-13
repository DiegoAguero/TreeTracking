export interface Zone {
  id: number;
  humidity: number;
  isOnFire: boolean;
  description: string;
  coords: Coords;
}

export interface Coords {
  ID: number;
  coordX: number;
  coordY: number;
}
