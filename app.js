const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Note = require('./models/note');
const notesRouter = require('./routes/notes');
const methodOverride = require('method-override');
app.use(express.static("public"));
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
console.log('yayyyy!');
app.get('/', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('index', { notes: notes });
});

mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', notesRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running..`);
});
