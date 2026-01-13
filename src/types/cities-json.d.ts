declare module 'cities.json' {
  export interface City {
    name: string;
    country: string;
    lat: number;
    lng: number;
    [key: string]: any;
  }

  const cities: City[];
  export default cities;
}
