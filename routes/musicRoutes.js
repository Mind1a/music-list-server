import express from "express";
import Music from "../models/Music.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    //      simgeris saxeli, pirovnebis saxeli

    // {
    // title: "axali simgera",
    // artist: "test",
    // genre: "pop",
    // duration: 90
    // }
    // axali simgera, test, pop,   90        false,
    const { title, artist, genre, duration, isFavorite } = req.body;

    const newMusic = new Music({
      title: title,
      artist: artist,
      genre: genre,
      duration: duration,
      isFavorite: isFavorite,
    });

    const saveMusic = await newMusic.save();

    res.status(201).json({
      message: "მუსიკა წარმატებით დაემატა",
      data: saveMusic,
    });
  } catch (error) {}
});

router.get("/", async (req, res) => {
  try {
    const musics = await Music.find();

    res.status(200).json({
      count: musics.length,
      data: musics,
    });
  } catch (error) {
    res.status(500).json({
      message: "შეცდომა სერვერზე",
      error: error.message,
    });
  }
});

export default router;

// localhost:5000/music GET
// localhost:5000/music POST
