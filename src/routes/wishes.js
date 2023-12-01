const { Router } = require("express");
const { Desire } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  try {
    const wishes = await Desire.create({
      name,
      price,
    });

    return res.status(200).send(wishes);
  } catch (error) {
    console.error("Error en post wishes", error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
});

router.get("/", async (req, res) => {
    try {
      const wishes = await Desire.findAll();
  
      return wishes && wishes.length
        ? res.status(200).json({
            ok: true,
            msg: "Lista de deseos",
            wishes,
          })
        : res.status(404).json({
            ok: false,
            msg: "No se encontraron datos",
          });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: "Error al obtener los datos",
      });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const datos = req.body;
    try {
      let change = await Desire.update(datos, { where: { id } });
      return res.send(change);
    } catch (error) {
      console.log("Error en ruta put wishes");
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Desire.destroy({
        where: { id },
      });
      res.send("Borrado exitosamente");
    } catch (error) {
      console.log("Error en ruta delete wishes");
    }
  });

  module.exports = router;