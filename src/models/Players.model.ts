import { v4 as uuidv4 } from 'uuid';
import { IPlayer } from '../interfaces/iPlayer.interface';
import { defaultValues } from '../utils/config';




export class Players {
  
  private players: IPlayer[] = [];
  public quantity: number = 0;

  constructor() {};

  public getPlayers(): IPlayer[] {
    return this.players;
  };

  public setPlayers( players: IPlayer[] ): void {
    this.players = players;
    this.quantity = this.players.length;
    this.setPlayersId();
  }

  private setPlayersId() {
    this.players.forEach( player => player.id = uuidv4() );
  };

  public setPlayersTicket( ticketsNumbers: number[] ) {
    let tickets: number[] = [ ...ticketsNumbers ];
    this.players.forEach( player => {
      const rand: number =  Math.round( Math.random() * ( tickets.length - 1 ) )
      player.ticket = tickets[ rand ];
      tickets.splice( rand, 1 );
      player.ticketCost = defaultValues.cost
    } );
  };

  public getPlayerWinner( winnerNumber: number ): IPlayer | undefined {
    return this.players.find( player => winnerNumber === player.ticket );
  };
  
};