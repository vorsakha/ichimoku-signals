const getSignal = require("./signal");

setInterval(async () => {
  await getSignal(20, 60, 160);
}, process.env.CRAWLER_INTERVAL);

// async function test() {
//   console.log(await getSignal(20, 60, 160));
// }

// test();
