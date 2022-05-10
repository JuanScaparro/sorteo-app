import './style.css'

import swal from 'sweetalert';
import { Players } from './models/Players.model';
import { defaultValues, defaultError } from './utils/config';
import { DJ_URL } from './utils/api';


const app: HTMLDivElement = <HTMLDivElement>document.querySelector<HTMLDivElement>('#app');

app.innerHTML = `
  <h1>Sorteo App!</h1>
  <p>Tu app de sorteo favorita</p>
  <h2>Proximamente...</h2>`;

const players: Players = new Players();
let ticketsNumbers: number[] = [];




async function loadPayers(): Promise<void> {
  const url = `${ DJ_URL.urlBase }${ DJ_URL.users }?limit=${ defaultValues.limitUsers() }`;

  try {
    const response = await fetch( url );
    const result = await response.json();
    players.setPlayers( result.users );
    console.log(players.getPlayers());
    setTicketsNumbers();
    console.log(ticketsNumbers);
    players.setPlayersTicket( ticketsNumbers );
  } catch( error ) {
    errorMessage( error )
  };
};

function errorMessage( error: any = defaultError) {
  swal( error );
};

function setTicketsNumbers(): void {
  const quantity: number = players.quantity * defaultValues.quantityRef;
  ticketsNumbers = Array.from(
    { length: quantity },
    () => Math.round( Math.random() * defaultValues.lotteryNumRef )
  );
};

function init() {
  loadPayers();
};

init();