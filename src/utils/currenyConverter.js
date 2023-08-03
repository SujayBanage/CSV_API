import config from "../../config/index.js";
import axios from "axios";

export async function getRates() {
  try {
    const res = await axios.get(
      `${config.EXCHANGE_API_URL}/${config.EXCHANGE_API_KEY}/latest/INR`
    );
    return res.data.conversion_rates;
  } catch (err) {
    console.log(err.message);
  }
}
