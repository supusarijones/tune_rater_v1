const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Song = require('./src/models/Song');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedSongs = async () => {
  await Song.deleteMany();
  await Song.insertMany([
    {
      title: "Lost in the Echo",
      artist: "Linkin Park",
      genre: "Rock",
      thumbnail: "https://example.com/echo.jpg",
      ratingFields: [{ name: "Production" }, { name: "Melody" }, { name: "Lyrics" }, { name: "Beats" }]
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      genre: "Pop",
      thumbnail: "https://example.com/blinding.jpg",
      ratingFields: [{ name: "Vocals" }, { name: "Melody" }, { name: "Beats" }]
    }
  ]);
  console.log("Songs seeded");
  mongoose.disconnect();
};

seedSongs();
