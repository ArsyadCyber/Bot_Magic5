const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { botToken } = require('./config')

const scrapeJadwalIndosiar = require('./scrape')
const bot = new TelegramBot(botToken, { polling: true });

const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach((file) => {
  require(`./commands/${file}`)(bot);
});
// Memuat semua command handler dari folder 'commands'

cron.schedule('0 1 * * *', () => {
  console.log('Scraping Indosiar Sedang Dijalankan...');
    scrapeJadwalIndosiar();
}, {
  scheduled: true,
  timezone: "Asia/Jakarta"
});