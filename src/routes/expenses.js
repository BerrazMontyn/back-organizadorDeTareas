const { Router } = require("express");
const { Expense } = require("../db");



const router = Router();

router.post("/", async (req, res) => {
  const { name, amount} = req.body;
  try {
    const expense = await Expense.create({
      name,
      amount,
    });

    return res.status(200).send(expense);
  } catch (error) {
    console.error("Error en post expenses", error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
});

module.exports = router;
