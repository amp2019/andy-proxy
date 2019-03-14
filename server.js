require('newrelic');
const express = require('express');
const path = require('path');
//const morgan = require('morgan');
//const request = require('request');
//const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 9000;

const myProxy = proxy(['/api'], {
  target: 'http://localhost:8083',
  // target: 'http://172.31.30.165:8083', 172.31.49.111
  // target: 'http://172.31.49.111',
  changeOrigin: true,
  xfwd: true
});

app.use(myProxy);

//app.use(morgan('dev'));
//app.use(express.static(path.resolve(__dirname, 'public')));
//app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/loaderio-e07904ddf29d33fe204aa39f3c85bf70/', (req,res) => {
  res.send('loaderio-e07904ddf29d33fe204aa39f3c85bf70')
});

//BUT will the posts get to the right spot with arterillery - that's the right test. 
//optimization may be getting rid of the 307 and replacing with request.post
//app.get('/api', (req,res) => res.redirect('http://localhost:8083/api'))

// app.post('/api', (req,res) => {
//   console.log('proxy post hit')
//   request.post({
//       //maybe make below url relative instead of absolute
//       url: 'http://localhost:8083/api',
//       followAllRedirects: true,
//       headers: req.headers,
//       //form:JSON.stringify({"houseId":"17", "username":"Post Master General", "email":"hey@hey.com", "phone":"(484) 484-8844", "note":"FWD: I like the house. Can we talk?"})
//       body: '{houseId:"17", username:"Post Master General", email:"hey@hey.com", phone:"(484) 484-8844", note:"FWD: I like the house. Can we talk?"}'
//       //body: JSON.stringify(req.body)
//     }, 
//       (err, response) => {
//         if (err) {
//           return console.error('upload failed:', err);
//         }
//         //console.log('Upload successful!  Server responded with:', response);
//         res.send(response)

//       });
  
//   // res.redirect(307,'http://localhost:8083/api')
  
// })


app.get('/:houseId', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

app.listen(port, () => {
  console.log(`Proxy Server running at port ${port}`)
});