function getHL(high, low, periods, start = 1) {
  const sliceHigh = high.slice(start, periods + 1);
  const sliceLow = low.slice(start, periods + 1);

  const highNumber = Math.max(...sliceHigh);
  const lowNumber = Math.min(...sliceLow);

  return (highNumber + lowNumber) / 2;

  // const sliceHigh = high.slice(start, periods + 1);
  // const sliceLow = low.slice(start, periods + 1);

  // const reduceHigh = sliceHigh.reduce(
  //   (accumulator, current) => +accumulator + +current
  // );
  // const resultHigh = reduceHigh / sliceHigh.length;

  // const reduceLow = sliceLow.reduce(
  //   (accumulator, current) => +accumulator + +current
  // );
  // const resultLow = reduceLow / sliceLow.length;

  // const result = (resultHigh + resultLow) / 2;

  // return result;
}

module.exports = getHL;

// one actual, one 30 candles behind
