export const defaultValues = {
  lotteryNumRef: 1000000,
  limitUsers: () => Math.round( Math.random()*100 ),
  quantityRef: 3,
  cost: 1500,
  firstPricePercent: 60
};

export const defaultError = {
  title: "Ooohh nooo!",
  text: "Parece que hay un error, volvé a intentarlo nuevamente...",
  icon: "error",
};