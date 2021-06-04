const getSignal = require("./signal");
const getSma = require("./smaHighsLows");
const api = require("./api");

setInterval(async () => {
  await getSignal("15m");
}, process.env.CRAWLER_INTERVAL);

/*async function test() {
  const data = await api.klines(process.env.SYMBOL, 120 * 30, "5m");
  const high = data.high;
  const low = data.low;

  const dutu = getSma(high, low, 120, 31);
  console.log(dutu);
}

test();*/
