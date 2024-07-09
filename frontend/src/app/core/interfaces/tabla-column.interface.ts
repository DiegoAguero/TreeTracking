import { Country } from "./country.interfaces";


export interface Accion<T = any>{
  action: string,
  row?: T
}
export interface dataComputedCountry {
  id: number
  humedad: number,
  fuego: boolean,
  temperatura: number,
  descripción: string,
  localidad: string,
  país: string,
  acciones?: string[]
}
export type ColumnKeys<T> = Array<keyof T>;

export const getEntityCountryTable = (countries: Country[]): dataComputedCountry[] => {
  let result: dataComputedCountry[] = [];
  for(let { humidity, fire_detected, temperature, property} of countries){
    let { id_property, country, locality, description } = property;
    let data = {
      id: id_property,
      humedad: humidity,
      fuego: fire_detected,
      temperatura: temperature,
      país: country,
      localidad: locality,
      descripción: description
    } as  dataComputedCountry;
    result.push({...data});
  }
  return result;
}



export const getEntityProperties = ( entity: string ):Array<any> => {
  let results:string[] = [];

  switch(entity){
    case 'country':
      results = ['Humedad (%)', 'Incendio', 'Temperatura', 'Descripción'];
      break;
    default:
      break;
  }

  return results;

}
