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
        const expenses = await Expense.findAll(); {
            where: { name: expenses }
        }
        if (!expenses) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron gastos',
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Lista de gastos',
            expenses,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en get expenses',
        });
    }
});

module.exports = router;
