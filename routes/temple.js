const routes = require('express').Router();
const temples = require('../controllers/temple.js');

/**
 * @swagger
 * /temples:
 *   get:
 *     summary: Retrieve a list of all temples
 *     responses:
 *       200:
 *         description: A list of temples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   temple_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Salt Lake Temple
 *                   location:
 *                     type: string
 *                     example: Salt Lake City, Utah
 */
routes.get('/', temples.findAll);

/**
 * @swagger
 * /temples/{temple_id}:
 *   get:
 *     summary: Retrieve details of a specific temple
 *     parameters:
 *       - in: path
 *         name: temple_id
 *         required: true
 *         description: ID of the temple to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the temple
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temple_id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Salt Lake Temple
 *                 location:
 *                   type: string
 *                   example: Salt Lake City, Utah
 */
routes.get('/:temple_id', temples.findOne);


/**
 * @swagger
 * /temples:
 *   post:
 *     summary: Add a new temple
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Provo Temple
 *               location:
 *                 type: string
 *                 example: Provo, Utah
 *               dedicated:
 *                 type: string
 *                 example: 1972-02-09
 *     responses:
 *       201:
 *         description: Temple created successfully
 */
routes.post('/', temples.create);

module.exports = routes;
