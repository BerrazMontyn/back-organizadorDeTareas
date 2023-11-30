const { Router } = require("express");
const { Task } = require("../db");

const router = Router();

//-----------------------------------------------------------
//Ruta Get de Task.

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: "No se encontraron tareas" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.log("Rompo en ROUTER.GET", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//------------------------------------------------------------
//Ruta Post.

router.post("/", async (req, res) => {
  const { name, description, time, date } = req.body;
  try {
    const task = await Task.create({
      name,
      description,
      time,
      date,
    });
    return res.status(200).send(task);
  } catch (error) {
    console.log("Rompo en Routerpost", error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
});

module.exports = router;
