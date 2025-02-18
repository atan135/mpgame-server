const express = require('express')
var cookieParser = require('cookie-parser');

const logconfig = require('./config/log')
const log4js = require('log4js');
log4js.configure(logconfig)
const log = log4js.getLogger('system')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/mobile', express.static('public/mobile'));

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

const config = require('./config/config')
const apiRouter = require('./routes/api')

const port = config.port;

app.use('/api', apiRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    log.info(`app listening on port ${port}`)
})


function gracefulShutdown() {
  log.info('Received kill signal, shutting down gracefully.');
  log4js.shutdown();
  process.exit(0);
}