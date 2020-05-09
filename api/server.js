const app = require('./app');

const port = process.env.API_PORT || 8080;

module.exports = app.listen(port, () => {
  console.log(`server strated on port ${port}`)
});

process.on('unhandledRejection', (reason, error) => {
  console.log('unhandledRejection: ', reason, error);
});

process.on('uncaughtException', (error) => {
  console.log('uncaughtException:', error);
});