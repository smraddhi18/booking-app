require('dotenv').config();
const app       = require('./app');
const connectDB = require('./config/db');
const { PORT }  = require('./config');  

(async function start() {
  let server;
  try {
    await connectDB();

    server = app.listen(PORT, () => {
     console.log(`Server listening on http://localhost:${PORT}/api/v1`);
    });

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        console.log(`\n${sig} received – closing HTTP server…`);
        server.close(() => {
          console.log('HTTP server closed. Exiting process.');
          process.exit(0);
        });
      });
    });

  } catch (err) {
   console.log({ err }, 'Failed to start application');
    if (server) server.close(() => process.exit(1));
    else process.exit(1);
  }
})();
