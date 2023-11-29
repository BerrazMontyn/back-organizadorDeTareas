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

        if (!expenses || expenses.length === 0) {
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
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en get expenses',
        });
    }
});

router.get("/:id", async (req, res) => {

    const { id } = req.params;
    try {
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontró el gasto",
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Gasto encontrado",
            expense,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No se encontro el gasto indicado",
        });
    }
});


module.exports = router;
