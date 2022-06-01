import './style.css'

import swal from 'sweetalert';
import { Players } from './models/Players.model';
import { defaultValues, defaultError } from './utils/config';
import { DJ_URL } from './utils/api';


const headerInfo: HTMLDivElement = <HTMLDivElement>document.getElementById( 'headerInfo' );
const frontInfo: HTMLDivElement = <HTMLDivElement>document.getElementById( 'frontInfo' );




const players: Players = new Players();
let ticketsNumbers: number[] = [];
let jackPot: string[] = [];



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
    createJackPotArray();
    lottery( ticketsNumbers );
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

function lottery( numbers: number[] ) {
  let winnerNumber = numbers[ Math.floor( Math.random() * ticketsNumbers.length )];
  showResultAlert( winnerNumber );
};

function showResultAlert( winnerNumber: number ) {
  const winner = players.getPlayerWinner( winnerNumber );
  if( winner !== undefined ){
    swal({
      title: "Nuevo ganador/a!!",
      text: `${ winner.firstName.toUpperCase() } ${ winner.lastName.toUpperCase() }
            Desde: ${ winner.address.city }`,
      icon: "success",
      timer: 1500,
    });
    showHeaderInfo( 'GANADOR DE LA SEMANA' );
    showWinner( winnerNumber );
    updateJackPot(true);
  } else {
    swal({
      title: "Pozo vacante!!",
      text: `La proxima semana puede ser tuyo...`,
      icon: "error",
      timer: 1500,
    });
    showHeaderInfo( 'PREMIO VACANTE' );
    showVacantPot();
    updateJackPot(false);
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

function createJackPotArray() {
  const saledTicket: string = ( players.getPlayers().length * defaultValues.cost ).toString()
  jackPot.push( saledTicket );
  localStorage.setItem( 'jack-pot', JSON.stringify( jackPot ) );
  console.log('createJackPot', jackPot)
};

function updateJackPot(isWinner: boolean) {
  console.log('updateJackPot', jackPot)
  const totalPot = jackPot.reduce( ( acumulado, actual ) => Number( acumulado ) + Number( actual ), 0 );
  if(isWinner){
    firstPrizePot( totalPot );
  }
  console.log('total =>',totalPot)
};

function firstPrizePot( totalPot: number ) {
  const firstPrize = totalPot * defaultValues.firstPricePercent / 100;
  console.log('firstPrize =>', firstPrize)
  const restoAcumulado = totalPot - firstPrize;
  console.log('Acumulado =>', restoAcumulado)
};

function saveDataLS( key: string ) {
  const dataLS = localStorage.getItem( key );
  if( dataLS ) {
    jackPot = JSON.parse( dataLS );
  } else {
    localStorage.setItem( key, JSON.stringify( jackPot ) );
  };
};

function init() {
  loadPayers();
  saveDataLS('jack-pot');
};

init();
