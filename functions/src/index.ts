import * as functions from "firebase-functions"
import { Telegraf } from "telegraf"

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const bot = new Telegraf(functions.config().telegram.token)

bot.start(ctx => {
  functions.logger.info(ctx)
  functions.logger.info(`El bot fue iniciado por `)
  ctx.reply("Hola, mi nombre es ScoreBot!\nPara ver la lista de comandos escribí /help")
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

// Firebase function que exporto
export const scoreBot = functions.https.onRequest((req, res) => {
  bot.handleUpdate(req.body, res);
}) 
