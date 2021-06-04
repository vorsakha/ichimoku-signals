const getSignal = require("./signal");

setInterval(async () => {
  await getSignal("5m");
}, process.env.CRAWLER_INTERVAL);
