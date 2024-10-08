export const CONSTANTES = {
  COLORS: {
    RED: '#ff4500',
    BLUE: '#00abfb',
    GREEN: '#00b341'
  },
  COLOR_CLIMATE: {
    colour: (temp: number):string => {
      if (temp < 8) return '#DFE9F5';
      if (temp >= 8 && temp <= 17) return '#7BB4E3';
      if (temp > 17 && temp <= 22) return '#FFC600';
      if (temp > 22 && temp <= 28) return '#FF9C00';
      if (temp > 28 && temp <= 39) return '#FF5A04';
      if (temp > 39) return '#FF0000';
      return '#000';
    }
  },
  USER_FAILD: 'Credenciales no validas'
}

Object.freeze(CONSTANTES);


