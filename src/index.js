const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const DOMAIN = "http://localhost:4000/";




const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);



const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";
const createJwtToken = (data) => jwt.sign(data, SECRET_KEY, { expiresIn: '600m' });
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: "Email already registered" });
  const hashedPw = await bcrypt.hash(password, 10);
  await new User({ email, password: hashedPw }).save();
  res.json({ message: "User created" });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ userId: user._id, token: createJwtToken({ sub: user._id }) });
});



app.get('/api/books/:bookId', async (req, res) => {
  if (req.params.bookId === "bestrating") return res.json(await Book.find().sort({ averageRating: -1 }).limit(3));
  const book = await Book.findById(req.params.bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

const calculateRating = async (bookId) => {
  const book = await Book.findById(bookId);
  if (!book) return;
  const total = book.ratings.reduce((sum, r) => sum + r.rating, 0);
  book.averageRating = book.ratings.length ? Math.round((total / book.ratings.length) * 10) / 10 : 0;
  await book.save();
};

const processImage = async (fileBuffer, bookId) => {
  const imgDir = path.join(__dirname, "images");
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);
  const imgPath = path.join(imgDir, `${bookId}.webp`);
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

app.post('/api/books', verifyToken, upload.single('image'), async (req, res) => {
    const bookData = JSON.parse(req.body.book);
    const book = await new Book({ ...bookData, userId: req.user.sub }).save();
    const bookId = book._id.toString();
   
    book.imageUrl = await processImage(req.file.buffer, bookId);

    await book.save();
    console.log("log book updated url",book);
    res.json({
      message: "Book Added",
    });
});

app.put('/api/books/:bookId', verifyToken, upload.single('image'), async (req, res) => {
  const bookData = JSON.parse(req.body.book);
  const book = await findById(req.params.bookId);
  book = bookData
  const bookId = book._id.toString();
 
  book.imageUrl = await processImage(req.file.buffer, bookId);

  await book.save();
  console.log("log book updated url",book);
  res.json({
    message: "Book Added",
  });
});

app.delete('/api/books/:bookId', verifyToken, async (req, res) => {
  const book = await Book.findById(req.params.bookId);
  if (!book) return res.status(404).json({ message: "no Book" });
  if (book.imageUrl) {
    const imgPath = path.join(__dirname, book.imageUrl.replace(DOMAIN, ''));
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
  await Book.deleteOne({ _id: book._id });
  res.json({ message: "Book deleted" });
});

app.post('/api/books/:bookId/rating', verifyToken, async (req, res) => {
  const book = await Book.findById(req.params.bookId);
  book.ratings.push({ userId: req.user.sub, rating: req.body.rating });
  await book.save();
  await calculateRating(book._id);
  const updatedBook = await Book.findById(book._id);
  res.json(updatedBook);
});

