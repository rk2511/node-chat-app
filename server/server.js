const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname,'../public');
var app = express();
app.use(express.static(publicPath));
console.log(publicPath);
app.listen(port, () => {
  console.log('server up on port 3000');
});
