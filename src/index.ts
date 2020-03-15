import dotenv from "dotenv";
dotenv.config();
import TelegramBot from "node-telegram-bot-api";
import { getCoronaCases } from "./api";
import { CoronaCases } from "./types";

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("Set `BOT_TOKEN` environment variable.");
}

const coronaData = {
  lastUpdated: new Date(0),
  coronaCases: {} as CoronaCases
};

const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/stats/, async msg => {
  if (Date.now() - coronaData.lastUpdated.getTime() > 1000 * 60 * 30) {
    coronaData.lastUpdated = new Date();
    coronaData.coronaCases = await getCoronaCases();
  }

  const message = `☣️ ***Korona Suomessa***

💀 ***Kuolemat:*** ${coronaData.coronaCases.deaths.length}
😷 ***Tartunnat:*** ${coronaData.coronaCases.confirmed.length}
😊 ***Parantuneet:*** ${coronaData.coronaCases.recovered.length}`;

  bot.sendMessage(msg.chat.id, message, {
    parse_mode: "MarkdownV2"
  });

  console.info(`Sent message to ${msg.chat.id}: ${message}`);
});
