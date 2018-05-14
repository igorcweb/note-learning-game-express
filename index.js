import express from 'express';
import path from 'path';

const app = express(),
  port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.listen(port, () => {
  console.log(`NOTE-GAME IS RUNNING ON localhost:${port}`);
});
