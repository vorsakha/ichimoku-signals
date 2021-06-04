const getIchimoku = require("./ichimoku");

async function getSignal(interval) {
  try {
    const kumo = await getIchimoku(interval);
    let didiResult;
    let kumoResult;
    let close = false;

    if (kumo.tenkan > kumo.kijun && kumo.spanAFuture > kumo.spanBFuture) {
      console.log("Bullish");
      kumoResult = true;
    } else if (
      kumo.tenkan < kumo.kijun &&
      kumo.price < kumo.spanBPast &&
      kumo.price < kumo.spanAPast
    ) {
      console.log("Bearish");
      kumoResult = false;
    } else if (
      kumo.tenkan < kumo.kijun &&
      kumo.price > kumo.spanBPast &&
      kumo.price > kumo.spanAPast
    ) {
      console.log("Weak bull");
      close = true;
    } else if (kumo.kijun > kumo.tenkan) {
      console.log("General sell");
      kumoResult = false;
    } else {
      console.log("Weak");
      kumoResult = false;
    }

    return { buy: kumoResult && didiResult, close: close };
  } catch (error) {
    console.log(error);
  }
}

module.exports = getSignal;
