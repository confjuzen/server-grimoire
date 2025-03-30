const sharp = require('sharp');
const path = require('path');
const { DOMAIN, IMAGES, ROOT } = require("../config");
const fs = require('fs');
const Book = require("../schemas/book.js");

async function processImage ( fileBuffer, bookId){
  
  if (!fs.existsSync(IMAGES)) fs.mkdirSync(IMAGES);




  const book = await Book.findById(bookId);
  if (book && book.imageUrl) {
      // Remove DOMAIN from imageUrl to get the relative image path
      const imageName = book.imageUrl.replace(DOMAIN, ""); // e.g., "images/whatever.webp"
      const oldImagePath = path.join(ROOT, imageName);

      // Delete the old image if it exists
      if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Deleted old image: ${oldImagePath}`);
      }
  }
  
  const filename = `${bookId}_${Date.now()}.webp`;
  const imgPath = path.join(IMAGES, filename);



  const image = sharp(fileBuffer);


  const metadata = await image.metadata();

  let sharpProcess = sharp(fileBuffer).webp({ quality: 90 });

  if (metadata.width / metadata.height > 206 / 260) {
    sharpProcess = sharpProcess.resize(412, 520, { fit: 'cover' });
  } else {
    sharpProcess = sharpProcess.resize(null, 520);
  }
  await sharpProcess.toFile(imgPath);

  return `${DOMAIN}images/${filename}`;

};

module.exports = processImage;