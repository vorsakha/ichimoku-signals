const api = require("./api");
const getHL = require("./smaHighsLows");

async function getIchimoku(
  interval,
  lengthOne = 20,
  lengthTwo = 60,
  lengthFour = 120
) {
  try {
    // tenkan - fastest line, used for key res / sup levels / average of highs and lows
    // kijun - more reliable key res / sup levels, trailing stop-loss
    // spanA - kumo part a green
    // spanB - kumo part b red

    // The spans have to have a number 30 candles behind and updated

    const lengthTotal = Math.max(lengthOne, lengthTwo, lengthFour);

    const data = await api.klines(process.env.SYMBOL, lengthTotal, interval);

    const close = data.close;
    const high = data.high;
    const low = data.low;

    let tenkan = getHL(high, low, lengthOne);
    let kijun = getHL(high, low, lengthTwo);
    let spanA =
      (getHL(high, low, lengthOne + 30, 31) +
        getHL(high, low, lengthTwo + 30, 31)) /
      2;
    let spanB = getHL(high, low, lengthFour + 30, 31);
    let spanAFuture = (tenkan + kijun) / 2;
    let spanBFuture = getHL(high, low, lengthFour);

    console.log({
      price: parseFloat(close[1]),
      tenkan: tenkan,
      kijun: kijun,
      spanAPast: spanA,
      spanBPast: spanB,
      spanAFuture: spanAFuture,
      spanBFuture: spanBFuture,
    });

    return {
      price: parseFloat(close[1]),
      tenkan: tenkan,
      kijun: kijun,
      spanAPast: spanA,
      spanBPast: spanB,
      spanAFuture: spanAFuture,
      spanBFuture: spanBFuture,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = getIchimoku;
