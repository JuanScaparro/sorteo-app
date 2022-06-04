import { DB_KEYS } from "../utils/config";
import { LotteryGame } from './Lottery-game.model';

export class HistoryData extends LotteryGame{


  constructor() {
    super()
  }

  public saveData( ) {
    const { jackpot } = DB_KEYS
    const dataLS = localStorage.getItem( jackpot );
    if( dataLS ) {
      this.setJackPot(JSON.parse( dataLS ));
    } else {
      localStorage.setItem( jackpot, JSON.stringify( this.getJackpot() ) );
    };
  };


};
