const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const verifyToken = require('../middlewares/authMiddleware');
// const axios = require('axios'); 

/**
 * @swagger
 * tags:
 *   name: Artículos
 *   description: Operaciones relacionadas con artículos
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Obtener todos los artículos
 *     tags: [Artículos]
 *     responses:
 *       200:
 *         description: Lista de artículos
 */
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener artículos' });
  }
});

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Crear un nuevo artículo
 *     tags: [Artículos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - contenido
 *               - categoria
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artículo creado exitosamente
 *       401:
 *         description: No autorizado
 */
router.post('/', verifyToken, async (req, res) => {
  const { titulo, contenido, categoria } = req.body;

  try {
    // Crear artículo directamente 
    const newArticle = new Article({ titulo, contenido, categoria });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error al crear artículo:', error);
    res.status(500).json({ error: 'Error interno al crear artículo' });
  }
});

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Obtener un artículo por ID
 *     tags: [Artículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del artículo
 *     responses:
 *       200:
 *         description: Artículo encontrado
 *       404:
 *         description: Artículo no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Artículo no encontrado' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener artículo' });
  }
});

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Actualizar un artículo por ID
 *     tags: [Artículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del artículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artículo actualizado
 *       404:
 *         description: Artículo no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', verifyToken, async (req, res) => {
  const { titulo, contenido, categoria } = req.body;

  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { titulo, contenido, categoria },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Artículo no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar artículo' });
  }
});

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Eliminar un artículo por ID
 *     tags: [Artículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del artículo
 *     responses:
 *       200:
 *         description: Artículo eliminado correctamente
 *       404:
 *         description: Artículo no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Artículo no encontrado' });
    res.json({ message: 'Artículo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar artículo' });
  }
});

module.exports = router;

