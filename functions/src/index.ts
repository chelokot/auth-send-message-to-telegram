import * as functions from 'firebase-functions';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);
bot.launch();

exports.sendMessage = functions.auth.user().onCreate((user) => {
  const userEmail = user.email;
  const userProvider = user.providerData[0].providerId;
  return bot.telegram.sendMessage(
    process.env.TELEGRAM_CHAT_ID as string,
    `A new user has registered: ${userEmail}. Provider used: ${userProvider}`
  );
});
