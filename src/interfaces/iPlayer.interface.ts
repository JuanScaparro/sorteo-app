export interface IPlayer {
  id: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  birthDate: string;
  address: IAdress;
  ticket: number;
  ticketCost: number;
};

interface IAdress {
  address: string;
  city: string;
  coordinates: ICoordinates;
};

interface ICoordinates {
  lat: number;
  lng: number;
};