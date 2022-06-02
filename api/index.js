const {server, app} = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false}).then(() => {
  
  app.listen(3001, () => {

    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}).catch((error)=>console.log(error));
