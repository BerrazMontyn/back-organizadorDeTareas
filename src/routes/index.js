const { Router } = require("express");
const expenses = require("./expenses");
const tasks = require("./tasks");
const users= require("./users")
const wishes= require("./wishes")
const savings = require("./savings"); 

const router = Router();

// Configurar los routers

router.use("/expenses", expenses);
router.use("/tasks", tasks);
router.use("/users", users);
router.use("/wishes", wishes)
router.use("/savings", savings);

module.exports = router;
