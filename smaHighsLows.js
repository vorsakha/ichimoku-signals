function getSma(high, low, periods) {
  const sliceHigh = high.slice(1, periods + 1);
  const sliceLow = low.slice(1, periods + 1);

  const highLow = sliceHigh.concat(sliceLow);

  const reduce = highLow.reduce(
    (accumulator, current) => +accumulator + +current
  );

  const result = reduce / highLow.length;

  return result;
}

module.exports = getSma;
