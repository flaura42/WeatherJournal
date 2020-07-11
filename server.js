const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static('app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const projectData = {};

const port = 8000;
const server = app.listen(port, () => {
  console.log(`Running on localhost: ${port}`);
});

// GET request
app.get('/all', (req, res) => {
  res.send(projectData);
  console.log('response sent');
});

// POST request
app.post('/add', (req, res) => {
  const data = req.body;
  res.status(200).send({
    success: true,
    message: 'Data saved',
    data: data
  });
  Object.assign(projectData, data);
  console.log(projectData);
});
