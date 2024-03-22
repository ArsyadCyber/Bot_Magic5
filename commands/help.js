module.exports = (bot) => {
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = `
🤖 *Bantuan Bot*

Berikut adalah beberapa perintah yang bisa Anda gunakan:

- /start - Mulai berinteraksi dengan bot dan mendapatkan pesan selamat datang.
- /help - Menampilkan pesan bantuan ini dan informasi tentang perintah yang tersedia.
- /magic5 - Mendapatkan Jadwal Acara Magic 5.

*Tips Penggunaan:*
- Anda bisa bertanya apa saja kepada saya, dan saya akan berusaha menjawab.
- Gunakan perintah yang tersedia untuk interaksi yang lebih spesifik.

Jika Anda memiliki pertanyaan lebih lanjut atau memerlukan bantuan, jangan ragu untuk menggunakan perintah /help ini kapan saja!

Selamat menggunakan bot! 🎈
`;

    // URL gambar yang ingin Anda kirim
    const photoURL = 'https://ibb.co/s54ddMW';

    // Menggunakan sendPhoto dengan caption
    bot.sendPhoto(chatId, photoURL, { caption: helpMessage, parse_mode: 'Markdown' });
  });
};