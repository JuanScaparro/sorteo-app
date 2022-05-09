import swal from 'sweetalert';
import { Players } from './models/Players.model';
import { defaultValues, defaultError } from './utils/config';
import { DJ_URL } from './utils/api';

import './style.css'

const app: HTMLDivElement = <HTMLDivElement>document.querySelector<HTMLDivElement>('#app');

app.innerHTML = `
  <h1>Sorteo App!</h1>
  <p>Tu app de sorteo favorita</p>
  <h2>Proximamente...</h2>`;

const players: Players = new Players();


async function loadPayers() {
  const url = `${ DJ_URL.urlBase }${ DJ_URL.users }?limit=${ defaultValues.limitUsers() }`;

  try {
    const response = await fetch( url );
    const result = await response.json();
    players.setPlayers( result.users );
    console.log(players.getPlayers());
    console.log(players.quantity);
  } catch( error ) {
    errorMessage( error )
  };
};

function errorMessage( error: any = defaultError) {
  swal( error );
};

function generateLotteryNumber() {
  let lotteryNumber: number = Math.round( Math.random() * defaultValues.lotteryNumRef );
  console.log(lotteryNumber)
};



function init() {
  loadPayers();
  generateLotteryNumber()
};

init();