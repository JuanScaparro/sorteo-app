export const defaultValues = {
  lotteryNumRef: 1000000,
  limitUsers: () => Math.round( Math.random()*100 )
};

export const defaultError = {
  title: "Ooohh nooo!",
  text: "Parece que hay un error, volvé a intentarlo nuevamente...",
  icon: "error",
};