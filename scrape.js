const axios = require('axios');
const cheerio = require ('cheerio');
const fs = require('fs');

const url = 'https://www.jadwaltv.net/channel/indosiar';

function scrapeJadwalIndosiar() {
  axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const scheduleItems = [];

      $('tbody tr').each(function() {
        let time = $(this).find('td').first().text().trim();
        const show = $(this).find('td').last().text().trim();

        // Menghilangkan "WIB" dari waktu
        time = time.replace("WIB", "").trim();

        // Mengabaikan baris yang hanya berisi "Jam" dan "Acara"
        if (time !== "Jam" && show !== "Acara" && show !== "Jadwal TV selengkapnya di JadwalTV.Net - Jadwal INDOSIAR") {
          scheduleItems.push({ time, show });
        }
      });

      // Menyimpan hasil ke dalam file allSchedule.json
      fs.writeFileSync('magic5.json', JSON.stringify(scheduleItems, null, 2), 'utf-8');
      console.log('Data Datanya berhasil tersimpan di magic5.json ');
    })
    .catch(console.error);
}

module.exports = scrapeJadwalIndosiar;