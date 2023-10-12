const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to your MongoDB database
mongoose.connect('https://solar-space-757476.postman.co/workspace/My-Workspace~5b623c91-b8d2-470e-860c-4d132ec1d033/folder/26673749-e9abc751-f382-46aa-9015-fa8cc9ac76cb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Card = mongoose.model('Card', {
  text: String,
  imageUrl: String,
  // Add other fields as needed
});

// Define API routes

// Get all cards
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// Create a new card
app.post('/api/cards', async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    const card = new Card({ text, imageUrl });
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new card' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
