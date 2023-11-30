const { Router } = require("express");

const expenses = require("./expenses");
const tasks = require("./tasks");

const router = Router();

// Configurar los routers

router.use("/expenses", expenses);
router.use("/tasks", tasks);

module.exports = router;
