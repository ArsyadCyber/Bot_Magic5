const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const moment = require("moment-timezone");
const { grupId } = require('../config');

module.exports = (bot) => {
  const notifyBeforeShowStarts = () => {
    console.log("Checking schedule for early notifications...");
    const scheduleFilePath = path.join(__dirname, "../magic5.json"); // Sesuaikan path sesuai struktur direktori Anda
    fs.readFile(scheduleFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading schedule file:", err);
        return;
      }

      let showSchedules;
      try {
        showSchedules = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing schedule JSON:", parseError);
        return;
      }

      if (!Array.isArray(showSchedules)) {
        console.error("Schedule data is not an array");
        return;
      }

      const currentTime = moment().tz("Asia/Jakarta");

      showSchedules.forEach((schedule) => {
        if (schedule.show.startsWith("Magic 5")) {
          const showStartTimeMinus10Min = moment
            .tz(
              `${currentTime.format("YYYY-MM-DD")}T${schedule.time}:00`,
              "Asia/Jakarta",
            )
            .subtract(10, "minutes");
          if (
            currentTime.hours() === showStartTimeMinus10Min.hours() &&
            currentTime.minutes() === showStartTimeMinus10Min.minutes()
          ) {
            const preShowNotificationMessage = `🎭 *${schedule.show} akan Tayang dalam 10 menit!* 🎭\n\n📺 *${schedule.show}*\n🕒 Waktu Tayang: ${schedule.time} WIB\n\nSiapkan dirimu untuk menonton acara ini. Jangan sampai ketinggalan ya dan tonton di televisi agar rating dan share ${schedule.show} naik.\n\n*Note:*\nKalau yang tidak punya TV bisa tonton di [Vidio](https://m.vidio.com/live/205-indosiar) `;
            let imageUrl = "https://ibb.co/LYKzKN5"; // Pastikan ini adalah URL langsung ke gambar
            bot.sendPhoto(grupId, imageUrl, {
              parse_mode: "Markdown",
              caption: preShowNotificationMessage,
            });
          }
        }
      });
    });
  };
  cron.schedule("* * * * *", notifyBeforeShowStarts);
};
