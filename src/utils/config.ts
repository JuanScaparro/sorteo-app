export const defaultValues = {
  lotteryNumRef: 1000000,
  limitUsers: () => Math.round( Math.random()*100 ),
  quantityRef: 3,
  cost: 1500,
  firstPricePercent: 60
};

export const errorMessage = {
  title: "Ooohh nooo!",
  text: "Parece que hay un error, volvé a intentarlo nuevamente...",
};
export const winnerMessage = {
  title: "Nuevo ganador/a!!",
  text: "Juan",
};
export const vacantMessage = {
  title: "Pozo vacante!!",
  text: `La proxima semana puede ser tuyo...`,
};

export const headerMessage = {
  winner: 'GANADOR DE LA SEMANA',
  vacant: 'PREMIO VACANTE',
};

export const DB_KEYS = {
  jackpot: 'jack-pot'
};



