const axios = require("axios");
const querystring = require("querystring");

const apiUrl = process.env.API_URL;

async function publicCall(path, data, method = "GET") {
  try {
    const qs = data ? `?${querystring.stringify(data)}` : "";
    const result = await axios({
      method,
      url: `${apiUrl}${path}${qs}`,
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
}

async function klines(symbol = process.env.SYMBOL, limit = 8, interval = "5m") {
  const call = await publicCall("/v3/klines", { symbol, limit, interval });

  const open = [];
  const high = [];
  const low = [];
  const close = [];

  call.map((data) => {
    open.unshift(data[1]);
    high.unshift(data[2]);
    low.unshift(data[3]);
    close.unshift(data[4]);
  });

  return { open: open, high: high, low: low, close: close };
}

module.exports = { klines };
