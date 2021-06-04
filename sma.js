function getSma(arr, periods) {
  const slice = arr.slice(arr.length - periods, arr.length);

  const reduce = slice.reduce(
    (accumulator, current) => +accumulator + +current
  );

  const result = reduce / slice.length;

  return result;
}

module.exports = getSma;
