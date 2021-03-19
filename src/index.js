const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { request } = require('http');


path = require("path");

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("port", process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, "/")));

app.get('/glide.min.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..' , 'node_modules', '@glidejs', 'glide', 'dist', 'glide.min.js'));
});


app.post('/contact', (req, res) => {

  if (!req.body.captcha)
    return res.json({ success: false, msg: 'Wypełnij captchę.' });

  const secretKey = process.env.CAP;

  const verifyURL = `http://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  request(verifyURL, (e, r, b)=>{

    let bd = JSON.parse(b);

    if (bd.success !== undefined && !bd.success)
    return res.json({ success: false, msg: 'Weryfikacja captchy zakończona niepowodzeniem.'});
  });





  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SLOG,
      pass: process.env.SPAS
    }
  });

  const mailOpts = {
    from: 'Lizzie', 
    to: process.env.TARGET,
    subject: req.body.subject,
    text: `Od: ${req.body.name} (${req.body.email}). Wiadomość: ${req.body.message}`
  }

  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      return res.json({ success: false, msg: 'Błąd wysyłania.' });
    }
    else {
      return res.json({ success: true, msg: 'Wiadomość wysłana!' });
    }
  })
});

const server = app.listen(app.get('port'), function () {
    console.log('The server is running on http://localhost:' + app.get('port'));
  });