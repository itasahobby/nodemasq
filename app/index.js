const express = require('express')
const dns = require('dns');
const app = express()
const port = 1337

app.get('/', (req, res) => {
    if (req.query.host) {
        dns.resolve(req.query.host, "A", (err, records) => {
            if (err) {
                res.send(err+"\n");
            } else {
                res.send(`Servers: ${dns.getServers()}\nRecords:${records}\n`);
            } 
        });
    } else {
        res.send('Domain resolver\n')
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
