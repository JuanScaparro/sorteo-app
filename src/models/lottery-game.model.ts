import { defaultValues } from "../utils/config";

export class LotteryGame {

  private jackPot: string[] = [];
  private ticketsNumbers: number[] = [];

  constructor(){}

  // START
  public setTicketsNumbers(playersQuantity: number): void {
    const quantity: number = playersQuantity * defaultValues.quantityRef;
    this.ticketsNumbers = Array.from(
      { length: quantity },
      () => Math.round( Math.random() * defaultValues.lotteryNumRef )
    );
  };

  public createJackPot(playersQuantity: number) {
    const saledTicket: string = ( playersQuantity * defaultValues.cost ).toString()
    this.jackPot.push( saledTicket );
    localStorage.setItem( 'jack-pot', JSON.stringify( this.jackPot ) );
    console.log('createJackPot', this.jackPot)
  };

  // LOTTERY
  public lottery( callback: Function ) {
    let winnerNumber = this.ticketsNumbers[ Math.floor( Math.random() * this.ticketsNumbers.length )];
    callback( winnerNumber );
  };
  
  // END
  public updateJackPot(isWinner: boolean) {
    console.log('updateJackPot', this.jackPot)
    const totalPot = this.jackPot.reduce( ( acumulado, actual ) => Number( acumulado ) + Number( actual ), 0 );
    if(isWinner){
      this.firstPrizePot( totalPot );
    }
    console.log('total =>',totalPot)
  };
  
  private firstPrizePot( totalPot: number ) {
    const firstPrize = totalPot * defaultValues.firstPricePercent / 100;
    console.log('firstPrize =>', firstPrize)
    const restoAcumulado = totalPot - firstPrize;
    console.log('Acumulado =>', restoAcumulado)
  };

  public getTicketsNumbers(): number[] {
    return this.ticketsNumbers;
  };


  public getJackpot(): string[] {
    return this.jackPot;
  };

  public setJackPot( jackPot: string[] ) {
    this.jackPot = jackPot;
  };


}