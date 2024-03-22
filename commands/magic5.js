const fs = require("fs");
const path = require("path");

module.exports = (bot) => {
  // Handler untuk perintah /magic5
  bot.onText(/\/magic5/, (msg) => {
    const chatId = msg.chat.id;

    // Membaca file magic5.json
    const filePath = path.join(__dirname, "../magic5.json"); // Sesuaikan path sesuai struktur direktori Anda
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        bot.sendMessage(
          chatId,
          "🚫 Maaf, saya mengalami kesulitan saat mencoba mengakses jadwal. Silakan coba lagi nanti.",
        );
        return;
      }

      // Menguraikan data JSON dengan try-catch untuk menangani kemungkinan error
      let schedules;
      try {
        schedules = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        bot.sendMessage(
          chatId,
          "🚫 Maaf, terjadi kesalahan saat menguraikan data. Silakan coba lagi nanti.",
        );
        return;
      }

      // Validasi data
      if (!Array.isArray(schedules)) {
        console.error("Data is not an array");
        bot.sendMessage(
          chatId,
          "🚫 Format data tidak sesuai. Silakan hubungi admin.",
        );
        return;
      }

      // Memfilter data untuk hanya mendapatkan acara yang awalan namanya "Magic 5"
      const filteredSchedules = schedules.filter((schedule) =>
        schedule.show.startsWith("Magic 5"),
      );

      // Membuat caption dari data yang difilter
      let caption = "✨ *Jadwal Acara Magic 5* ✨\n\n";
      if (filteredSchedules.length > 0) {
        filteredSchedules.forEach((schedule, index) => {
          caption += `🔹 *${schedule.time}* - ${schedule.show}\n`;
        });
      } else {
        caption +=
          '🔍 Saat ini, tidak ada jadwal acara yang dimulai dengan "Magic 5". Silakan cek kembali nanti!';
      }

      // URL atau path lokal ke foto yang ingin dikirim
      const photoURL = "https://ibb.co/Fq3FKmS"; // Ganti dengan URL atau path lokal foto Anda

      // Mengirim foto dengan caption
      bot
        .sendPhoto(chatId, photoURL, {
          caption: caption,
          parse_mode: "Markdown",
        })
        .catch((photoError) => {
          console.error("Error sending photo:", photoError);
          bot.sendMessage(
            chatId,
            "🚫 Maaf, saya mengalami kesulitan saat mengirim foto. Silakan coba lagi nanti.",
          );
        });
    });
  });
};
