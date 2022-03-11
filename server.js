const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const express = require("express");
const path = require('path');
const app = express();
const axios = require('axios');



app.use(
  express.static(path.resolve(__dirname, "./build"))
);
app.use(express.json());

app.post('/Otp-Verification', (req, res) => {
  console.log(req.body.otp);
  console.log('secretKey', req.body.secretKey);
  var token = speakeasy.totp({
    secret: req.body.secretKey,
    encoding: 'base32',
  });
  console.log('token', token);
  var verified = speakeasy.totp.verify({
    secret: req.body.secretKey,
    encoding: 'base32',
    token: req.body.otp,
  });
  console.log(verified);
  res.json({ verified });


})


app.get('/Otp-Registration', (req, res) => {
  var secret = speakeasy.generateSecret();
  var secretKey = secret.base32;

  qrcode.toDataURL(secret.otpauth_url, function (err, data) {
    if (data) {
      console.log(data)
      res.json({ data, secretKey });
    }
    else if (err) {
      console.log(err)
      res.json({ error: err });
      throw err;
    }

  });


})

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "./build/index.html")
  );
});





const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
