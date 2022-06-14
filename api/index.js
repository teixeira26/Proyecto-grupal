const {server, app} = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({ force:false}).then(() => {
  
  app.listen(3001, () => {

    console.log('%s listening at 3001');
  });
}).catch((error)=>console.log(error));