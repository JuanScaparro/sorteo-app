import { v4 as uuidv4 } from 'uuid';
import { IPlayer } from '../interfaces/iPlayer.interface';

export class Players {
  
  private players: IPlayer[] = [];
  public quantity: number = 0;

  constructor() {};

  public getPlayers(): IPlayer[] {
    return this.players;
  };

  public setPlayers( players: IPlayer[] ): void {
    this.players = players;
    this.quantity = this.players.length
    this.setPlayersId();
  }

  private setPlayersId() {
    this.players.forEach( player => player.id = uuidv4() );
  };

};