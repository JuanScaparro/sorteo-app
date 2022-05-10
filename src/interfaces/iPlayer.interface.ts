export interface IPlayer {
  id: string,
  firstName: string,
  lastName: string,
  maidenName: string,
  age: number,
  gender: string,
  birthDate: string,
  address: {
    address: string,
    city: string,
    coordinates: {
    lat: number,
    lng: number
    },
  },
  ticket: number
};