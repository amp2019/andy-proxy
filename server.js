const express = require('express');

const app = express()
const port = 8080

app.get('/', (req,res) => res.send('wazzzup'))


app.listen(port, ()=> console.log('serving on localhost port:' + port))