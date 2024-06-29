import { Country } from "./country.interfaces";


export interface Accion<T = any>{
  action: string,
  row?: T
}
export interface dataComputedCountry {
  humidity: number,
  fire_detected: boolean,
  temperature: number,
  description: string,
  locality: string,
  country: string,
  actions?: string[]
}
export type ColumnKeys<T> = Array<keyof T>;

export const getEntityCountryTable = (countries: Country[]): dataComputedCountry[] => {
  let result: dataComputedCountry[] = [];
  for(let { humidity, fire_detected, temperature, property} of countries){
    let { country, locality, description } = property;
    let data = {
      humidity,
      fire_detected,
      temperature,
      country,
      locality,
      description
    } as dataComputedCountry;
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
