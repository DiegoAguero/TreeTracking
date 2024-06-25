

export interface Accion<T = any>{
  action: string,
  row?: T
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
