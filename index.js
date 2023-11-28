const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Agregar un manejador de errores para sync
conn.sync({ force: true })
  .then(() => {
    console.log('Database synchronized successfully');

    // Tu código para iniciar el servidor aquí
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });
