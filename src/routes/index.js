const { Router } = require('express');

 const expenses = require ('./expenses')


const router = Router();

// Configurar los routers

 router.use('/expenses', expenses);



module.exports = router;