const { Router } = require("express");
const { Expense } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
    const { name, amount, image } = req.body;
    try {
        const expense = await Expense.create({
            name,
            amount,
            image,
        });

        return res.status(200).send(expense);
    } catch (error) {
        console.error("Error en post expenses", error);
        return res.status(500).send({ message: "Error en el servidor" });
    }
});

router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.findAll();

        return (expenses && expenses.length)
            ? res.status(200).json({
                ok: true,
                msg: 'Lista de gastos',
                expenses,
            })
            : res.status(404).json({
                ok: false,
                msg: 'No se encontraron gastos',
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener los gastos',
        });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                ok: false,
                msg: "Gasto no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "Gasto encontrado",
            expense,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error en la búsqueda del gasto",
        });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const datos = req.body;
    try {
      let change = await Expense.update(datos, { where: { id } });
      return res.send(change);
    } catch (error) {
      console.log("Error en ruta put expense");
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Expense.destroy({
        where: { id },
      });
      res.send("Borrado exitosamente");
    } catch (error) {
      console.log("Error en ruta delete expenses");
    }
  });


module.exports = router;
