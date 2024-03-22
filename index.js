const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const express = require('express');
const bodyParser = require('body-parser');
const botToken = process.env.BOT_TOKEN;

const scrapeJadwalIndosiar = require('./scrape');

// Inisialisasi dan konfigurasi express
const app = express();
const port = process.env.PORT || 3000; // Port yang digunakan oleh server

// Konfigurasi bodyParser
app.use(bodyParser.json());

// Buat instance bot dengan opsi polling: false karena kita akan menggunakan webhook
const bot = new TelegramBot(botToken, { polling: false });

// Tentukan URL untuk webhook Anda, ganti 'https://your-webhook-url.com' dengan URL yang diberikan oleh Cyclic.sh
const webhookUrl = process.env.WEBHOOK;

// Set webhook pada bot dengan URL yang telah ditentukan
bot.setWebHook(`${webhookUrl}/bot${botToken}`);

// Endpoint untuk menangani pembaruan dari Telegram
app.post(`/bot${botToken}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Memuat semua command handler dari folder 'commands'
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach((file) => {
  require(`./commands/${file}`)(bot);
});

// Tugas terjadwal untuk scraping
cron.schedule('0 1 * * *', () => {
  console.log('Scraping Indosiar Sedang Dijalankan...');
  scrapeJadwalIndosiar();
}, {
  scheduled: true,
  timezone: "Asia/Jakarta"
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});