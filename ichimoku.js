const api = require("./api");
const getSma = require("./smaHighsLows");

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

    const lengthTotal = Math.max(lengthOne, lengthTwo, lengthFour) * 30;

    const data = await api.klines(process.env.SYMBOL, lengthTotal, interval);

    const close = data.close;
    const high = data.high;
    const low = data.low;

    let tenkan = getSma(high, low, lengthOne);
    let kijun = getSma(high, low, lengthTwo);
    let spanA =
      (getSma(high, low, lengthOne + 30) + getSma(high, low, lengthTwo + 30)) /
      2;
    let spanB = getSma(high, low, lengthFour + 30);
    let spanAFuture = (tenkan + kijun) / 2;
    let spanBFuture = getSma(high, low, lengthFour);

    console.log({
      price: close[1],
      tenkan: tenkan,
      kijun: kijun,
      spanAPast: spanA,
      spanBPast: spanB,
      spanAFuture: spanAFuture,
      spanBFuture: spanBFuture,
    });

    return {
      price: close[close.length - 1],
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
