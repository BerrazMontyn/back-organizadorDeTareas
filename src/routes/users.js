const express = require('express');
const router = express.Router();
const { User } = require('../db');


router.post("/", async (req, res) => {
    const { firstName, lastName, email, password, birthday, image } = req.body;

    if (!firstName || !lastName || !email || !password || !birthday) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

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

router.get("/", async (req, res) => {
    try {
      const users = await User.findAll();
  
      if (users.length > 0) {
        res.status(200).json({
          ok: true,
          msg: 'Lista de usuarios',
          users,  // Corregir el nombre aquí
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: 'No se encontraron usuarios',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador',
      });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const users = await User.findByPk(id);
  
      if (!users) {
        return res.status(404).json({
          ok: false,
          msg: "Usuario no encontrado",
        });
      }
      return res.status(200).json({
        ok: true,
        msg: "Usuario encontrado",
        users,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: "Error en la búsqueda del usuario",
      });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const datos = req.body;
    try {
      let change = await User.update(datos, { where: { id } });
      return res.send(change);
    } catch (error) {
      console.log("Error en ruta put users");
    }
  });
  
module.exports = router;