const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 5622

const coworkingspaceAPI = require('./module/coworkingspace/app');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/coworkingspace/', coworkingspaceAPI);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})