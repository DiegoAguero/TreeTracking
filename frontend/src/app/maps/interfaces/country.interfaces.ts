export interface Country {
  id_condition: number;
  humidity: number;
  fire_detected: boolean;
  temperature: number;
  entry: Entry;
  property: Property;
}

export interface Entry {
  id_entry: number;
  date: string;
}


export interface Property {
  id_property: number;
  coord_x: number;
  coord_y: number;
  description: string;
}
