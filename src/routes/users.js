const express = require('express');
const router = express.Router();
const { User } = require('../db'); 


router.post("/", async (req, res) => {
    const { firstName, lastName, email, password, birthday, image } = req.body;
  
    if (!firstName || !lastName || !email || !password || !birthday) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
  
    try {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        birthday,
        image,
      });
  
      return res.status(201).send(newUser);
    } catch (error) {
      console.log("Error al crear usuario:", error);
      return res.status(500).send({ message: "Error en el servidor al crear usuario" });
    }
  });

module.exports = router;