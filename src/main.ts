import './style.css'

import swal from 'sweetalert';
import { Players } from './models/Players.model';
import { defaultValues, errorMessage, winnerMessage, vacantMessage, headerMessage } from './utils/config';
import { DJ_URL } from './utils/api';
import { LotteryGame } from './models/Lottery-game.model';
import { IModalArgs } from './interfaces/iModalArgs.interface';


const headerInfo: HTMLDivElement = <HTMLDivElement>document.getElementById( 'headerInfo' );
const frontInfo: HTMLDivElement = <HTMLDivElement>document.getElementById( 'frontInfo' );




const players: Players = new Players();
const lotteryGame: LotteryGame = new LotteryGame();


async function loadPayers(): Promise<void> {
  const url = `${ DJ_URL.urlBase }${ DJ_URL.users }?limit=${ defaultValues.limitUsers() }`;

  try {
    const response = await fetch( url );
    const result = await response.json();
    players.setPlayers( result.users );
    console.log(players.getPlayers());
    lotteryGame.setTicketsNumbers( players.getPlayers().length);
    players.setPlayersTicket(lotteryGame.getTicketsNumbers());
    lotteryGame.createJackPot(players.getPlayers().length);
    lotteryGame.lottery( showResult );
  } catch( error ) {
    showMessage(true, {title: errorMessage.title, text: errorMessage.text})
  };
};

function showMessage(isError: boolean, args: IModalArgs) {
  swal({
    title: args.title,
    text: args.text,
    icon: isError ? "error" : "success",
    timer: 1500,
  });
};

function showResult( winnerNumber: number ) {
  const winner = players.getPlayerWinner( winnerNumber );
  if( winner !== undefined ){
    showMessage(
      false, 
      {
        title: winnerMessage.title,
        text: `${ winner.firstName.toUpperCase() } ${ winner.lastName.toUpperCase() } Desde: ${ winner.address.city }`
      }
    )
    showHeaderInfo( headerMessage.winner );
    showWinner( winnerNumber );
    lotteryGame.updateJackPot(true);
  } else {
    showMessage(
      true, 
      {
        title: vacantMessage.title,
        text: vacantMessage.text
      }
    )
    showHeaderInfo( headerMessage.vacant );
    showVacantPot();
    lotteryGame.updateJackPot(false);
  };
};

function showHeaderInfo( setInfo: string ) {
  const template = `${ setInfo }`;
  const div = document.createElement( 'div' );
  div.innerHTML = template;
  headerInfo.appendChild( div );
};

function showWinner( winnerNumber: number ) {
  const winner = players.getPlayerWinner( winnerNumber );
  const template = `<h2>Ganoooo $${ winner?.ticketCost }!!!</h2>
                    <h4>Ticket ganador N°: ${ winner?.ticket }</h4>
                    <h3>${ winner?.firstName } ${ winner?.maidenName } ${ winner?.lastName }</h3>
                    <p>Desde: ${ winner?.address.city } </p>`;
  const div = document.createElement( 'div' );
  div.innerHTML = template;
  frontInfo.appendChild( div );
};

function showVacantPot() {
  const template = `<h2>Pozo vacante!!</h2>
                    <p>No te pierdas el pozo acumulado de la proxima semana</p>
                    <p><span>$000000.00</span></p>`;
  const div = document.createElement( 'div' );
  div.innerHTML = template;
  frontInfo.appendChild( div );
};

function saveDataLS( key: string ) {
  const dataLS = localStorage.getItem( key );
  if( dataLS ) {
    lotteryGame.setJackPot(JSON.parse( dataLS ));
  } else {
    localStorage.setItem( key, JSON.stringify( lotteryGame.getJackpot() ) );
  };
};

function init() {
  loadPayers();
  saveDataLS('jack-pot');
};

init();
