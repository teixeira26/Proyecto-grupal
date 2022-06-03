const {server, app} = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({ force: false}).then(() => {
  
  app.listen(3001, () => {

    console.log('%s listening at 3001');
  });
<<<<<<< HEAD
}).catch((error)=>console.log(error));


=======
}).catch((error)=>console.log(error));
>>>>>>> bc3a4deb5943d2e8479da64298dec59f389dfffc
