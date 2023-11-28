const server = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({ force: true })
  .then(() => {
    console.log('Database synchronized successfully');


    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });