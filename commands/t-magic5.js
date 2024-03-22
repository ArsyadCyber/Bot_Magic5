const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const moment = require("moment-timezone");
const { grupId } = require('../config'); 

module.exports = (bot) => {
  const checkScheduleAndNotify = () => {
    console.log("Checking schedule..."); 
    const filePath = path.join(__dirname, '../magic5.json'); // Sesuaikan path sesuai struktur direktori Anda
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      let schedules;
      try {
        schedules = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return;
      }

      if (!Array.isArray(schedules)) {
        console.error('Data is not an array');
        return;
      }
const now = moment().tz("Asia/Jakarta");

      schedules.forEach(schedule => {
        // Cek apakah nama acara diawali dengan "Magic 5"
        if (schedule.show.startsWith("Magic 5")) {
          // Mengonversi waktu tayang ke zona waktu WIB
          const showTime = moment.tz(`${now.format('YYYY-MM-DD')}T${schedule.time}:00`, "Asia/Jakarta");
          if (now.hours() === showTime.hours() && now.minutes() === showTime.minutes()) {
            // Mengirim notifikasi khusus untuk acara dengan awalan "Magic 5"
            const message = `🎭 *${schedule.show} Sedang Tayang!* 🎭\n\n📺 *${schedule.show}*\n🕒 Waktu Tayang: ${schedule.time} WIB\n\nJangan Sampai ketinggalan ya dan tonton di televisi agar rating dan share ${schedule.show} Naik.\n\n*Note:*\nKalau yang tidak punya TV bisa tonton di [Vidio](https://m.vidio.com/live/205-indosiar)`;
 let gambar = 'https://ibb.co/LYKzKN5';         
            bot.sendPhoto(grupId, gambar, { 
    parse_mode: 'Markdown',
    caption: message,
      });
          }
        }
      });
    });
  };
  cron.schedule('* * * * *', checkScheduleAndNotify);
};