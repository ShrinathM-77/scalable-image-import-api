const dbService = require('../services/dbService');

exports.getImages = async (req, res) => {
  try {
    const images = await dbService.getAllImages();
    res.json({ images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};
