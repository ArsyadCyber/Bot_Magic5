module.exports = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = `
🤖 *Selamat Datang di Bot Kami!*

Saya di sini untuk membantu Anda. Berikut adalah beberapa hal yang bisa saya lakukan:

- 📚 Memberikan informasi dan bantuan.
- 🔍 Membantu Anda mencari informasi.
- 🎉 Dan banyak lagi!

Untuk memulai, Anda bisa menggunakan perintah berikut:
- /help - Menampilkan bantuan dan informasi tentang perintah yang tersedia.

Jika Anda memiliki pertanyaan atau memerlukan bantuan lebih lanjut, jangan ragu untuk bertanya.

Selamat bersenang-senang! 🎈
`;

    // URL gambar yang ingin Anda kirim
    const photoURL = 'https://ibb.co/tKNbzQ9';

    // Menggunakan sendPhoto dengan caption
    bot.sendPhoto(chatId, photoURL, { caption: welcomeMessage, parse_mode: 'Markdown' });
  });
};