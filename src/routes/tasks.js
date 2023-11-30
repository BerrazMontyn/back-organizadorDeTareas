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

//------------------------------------------------------------
//Ruta por id:

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: "No hay tarea disponible" });
    }
    return res.status(200).json({ msg: "Gasto encontrado", task });
  } catch (error) {
    console.log("Estoy rompiendo en GETFORID", error);
  }
});

//------------------------------------------------------------
//Ruta Put

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let edit = req.body;

    if (id) {
      let data = await Task.update(edit, { where: { id } });
      return res.status(200).send("Tarea editada con exito");
    } else {
      return res.status(400).send("No se pudo editar la Tarea");
    }
  } catch (error) {
    console.log("EL error esta en RutaPUT", error);
  }
});

//---------------------------------------------------------------------
//Ruta Delete

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Task.destroy({
      where: { id },
    });
    res.send("Borrado exitosamente");
  } catch (error) {
    console.log("Estoy rompiendo en RouterDelete", error);
  }
});

module.exports = router;
