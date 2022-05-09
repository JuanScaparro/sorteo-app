import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert';
import { IPlayer } from './interfaces/iPlayer.interface';

import './style.css'



const app: HTMLDivElement = <HTMLDivElement>document.querySelector<HTMLDivElement>('#app');

app.innerHTML = `
  <h1>Sorteo App!</h1>
  <p>Tu app de sorteo favorita</p>
  <h2>Proximamente...</h2>`;


const lotteryNumRef: number = 1000000;

let players: IPlayer[] = [];





async function loadPayers() {
  const url = 'https://dummyjson.com/users?limit=100';

  try {
    const response = await fetch( url );
    const result = await response.json();
    generateId( result.users )
  } catch( error ) {
    errorMessage( error )
  };
};

function errorMessage( _error: any ) {
  swal({
    title: "Ooohh nooo!",
    text: "Parece que hay un error, volvé a intentarlo nuevamente...",
    icon: "error",
  });;
};

function generateId( players: IPlayer[] ) {
  players.forEach(player => player.id = uuidv4() );
  savePlayers( players );
};

function savePlayers(data : IPlayer[]) {
  players = data;
  console.log('savePlayers =>', players)
  generateLotteryNumber()
  
};

function generateLotteryNumber() {
  let lotteryNumber: number = Math.round( Math.random() * lotteryNumRef )
  console.log(lotteryNumber)
};


function init() {
  loadPayers();
};

init();