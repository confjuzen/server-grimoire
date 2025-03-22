const sharp = require('sharp');
const path = require('path');
const { DOMAIN, IMAGES } = require("../config");
const fs = require('fs');

async function processImage (req, res, fileBuffer, bookId){
    if (!fs.existsSync(IMAGES)) fs.mkdirSync(IMAGES);
    const imgPath = path.join(IMAGES, `${bookId}.webp`);
    const image = sharp(fileBuffer);
    const metadata = await image.metadata();
    let sharpProcess = sharp(fileBuffer).webp({ quality: 90 });
    if (metadata.width / metadata.height > 206 / 260) {
      sharpProcess = sharpProcess.resize(412, 520, { fit: 'cover' });
    } else {
      sharpProcess = sharpProcess.resize(null, 520);
    }
    await sharpProcess.toFile(imgPath);
    return `${DOMAIN}images/${bookId}.webp`;
};

module.exports = processImage;