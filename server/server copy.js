const uri = "mongodb+srv://t9852242:Ranjith123@cluster0.qomxbuy.mongodb.net/?retryWrites=true&w=majority";
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(cors());
const connectionURL = "mongodb+srv://t9852242:pHmGQzmI3Dckd2EH@cluster0.uw8tplr.mongodb.net/nodejs?retryWrites=true&w=majority";

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to the database');
  });
  
  const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    message: String,
  });
  
  const Contact = mongoose.model('Contact', ContactSchema);
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.post('/api/contact', async (req, res) => {
    const { name, email, mobile, message } = req.body;
  
    const newContact = new Contact({
      name,
      email,
      mobile,
      message,
    });
  
    try {
      await newContact.save();
      res.json({ message: 'Contact saved successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save contact' });
    }
  });
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });