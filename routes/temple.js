const routes = require('express').Router();
const temples = require('../controllers/temple.js');


// 🔍 Middleware to enforce API key validation
const apiKeyMiddleware = (req, res, next) => {
  //console.log("🔍 DEBUG: API key middleware triggered"); // Log when the middleware runs
  //console.log("🔍 Incoming headers:", req.headers); // Log the headers received

      const apiKey =
        req.headers["x-api-key"] ||
        req.headers["X-API-KEY"] ||
        req.headers["apikey"] ||
        req.headers["APIKEY"];

  if (apiKey !== "Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N") {
    //console.log("❌ DEBUG: Invalid API Key detected");
    return res.status(401).send("Invalid API Key");
  }

  //console.log("✅ DEBUG: API Key is valid, proceeding...");
  next();
};

// 🔥 Apply middleware to `/published`
routes.get("/published", apiKeyMiddleware, temples.findAllPublished);

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


/**
 * @swagger
 * /temples/{temple_id}:
 *   put:
 *     summary: Update a specific temple by ID
 *     parameters:               
 *       - in: path
 *         name: temple_id
 *         required: true
 *         description: ID of the temple to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:  
 *                 type: string
 *                 example: Salt Lake Temple
 *               location:
 *                 type: string
 *                 example: Salt Lake City, Utah
 *               dedicated:
 *                 type: string
 *                 example: 1972-02-09
 *     responses:
 *       200:
 *         description: Temple updated successfully
 */
routes.put('/:id', temples.update);

/**
 * @swagger
 * /temples/{temple_id}:
 *   delete:
 *     summary: Delete a specific temple by ID
 *     parameters:
 *       - in: path
 *         name: temple_id
 *         required: true
 *         description: ID of the temple to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Temple deleted successfully
 */
routes.delete('/:id', temples.delete);

// routes to delete all temples
/**
 * @swagger
 * /temples:
 *   delete:
 *     summary: Delete all temples
 *     responses:
 *       200:
 *         description: All temples deleted successfully
 */
routes.delete('/', temples.deleteAll);

// routes to find all published temples
/**
 * @swagger
 * /temples/published:
 *   get:
 *     summary: Retrieve a list of all published temples
 *     responses:
 *       200:
 *         description: A list of published temples
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
 *                   dedicated:
 *                     type: string
 *                     example: 1972-02-09
 */

module.exports = routes;
