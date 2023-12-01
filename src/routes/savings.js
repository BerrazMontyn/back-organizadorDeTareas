const { Router } = require("express");
const { Saving } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  const { name, amount } = req.body;
  try {
    const savings = await Saving.create({
      name,
      amount,
    });

    return res.status(200).send(savings);
  } catch (error) {
    console.error("Error en post savings", error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
});

router.get("/", async (req, res) => {
    try {
      const savings = await Saving.findAll();
  
      return savings && savings.length
        ? res.status(200).json({
            ok: true,
            msg: "Mis ahorros",
            savings,
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
      let change = await Saving.update(datos, { where: { id } });
      return res.send(change);
    } catch (error) {
      console.log("Error en ruta put savings");
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Saving.destroy({
        where: { id },
      });
      res.send("Borrado exitosamente");
    } catch (error) {
      console.log("Error en ruta delete savings");
    }
  });

  module.exports = router;