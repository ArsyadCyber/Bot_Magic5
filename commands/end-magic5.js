const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const moment = require("moment-timezone");
const { grupId } = require("../config"); // Pastikan ini sesuai dengan lokasi file config Anda

module.exports = (bot) => {
  const notifyAtNextShowStartForMagic5 = () => {
    console.log("Checking schedule for Magic 5 end notifications..."); 
    const scheduleFilePath = path.join(__dirname, '../magic5.json'); // Sesuaikan path sesuai struktur direktori Anda
    fs.readFile(scheduleFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading schedule file:', err);
        return;
      }

      let showSchedules;
      try {
        showSchedules = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing schedule JSON:', parseError);
        return;
      }

      if (!Array.isArray(showSchedules)) {
        console.error('Schedule data is not an array');
        return;
      }
      const currentTime = moment().tz("Asia/Jakarta");
            for (let i = 0; i < showSchedules.length - 1; i++) {
              // Cek apakah nama acara saat ini diawali dengan "Magic 5"
              if (showSchedules[i].show.startsWith("Magic 5")) {
                const currentShowTime = moment.tz(`${currentTime.format('YYYY-MM-DD')}T${showSchedules[i].time}:00`, "Asia/Jakarta");
                const nextShowTime = moment.tz(`${currentTime.format('YYYY-MM-DD')}T${showSchedules[i + 1].time}:00`, "Asia/Jakarta");

                if (currentTime.isSame(nextShowTime, 'minute')) {
                  const postShowNotificationMessage = `🎭 *${showSchedules[i].show} telah selesai tayang!* 🎭\n\nTerima kasih telah menonton *${showSchedules[i].show}*. Saksikan acara berikutnya: *${showSchedules[i + 1].show}* yang akan tayang sebentar lagi.\n\n*Note:*\nJangan lupa untuk memberikan feedback mengenai acara ini.`;
                  let imageUrl = 'https://ibb.co/LYKzKN5'; // Pastikan ini adalah URL langsung ke gambar
                  bot.sendPhoto(grupId, imageUrl, { 
                    parse_mode: 'Markdown',
                    caption: postShowNotificationMessage,
                  });
                  break; // Keluar dari loop setelah mengirim notifikasi
                }
              }
            }
          });
        };
        cron.schedule('* * * * *', notifyAtNextShowStartForMagic5);
      };