const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(express.static('public'));  // assuming your HTML file is in a folder named 'public'

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/breachedaccount', async (req, res) => {
  const email = req.body.email;
  const url = `https://haveibeenpwned.com/api/v2/breachedaccount/${email}`;

  try {
    const response = await fetch(url, {
      headers: {
        'hibp-api-key': 'Your HaveIBeenPwned API Key',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data && data.length > 0) {
      res.json({ pwned: true });
    } else {
      res.json({ pwned: false });
    }
  } catch (error) {
    res.json({ error: 'There was a problem checking this email.' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
