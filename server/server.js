const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(`${process.env.TWITTER_API_PATH}`,require('./routes'));

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}!`));