const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *   token:
 *     type: object
 *     properties:
 *       x-auth-token:
 *         type: string
 *   error:
 *     type: object
 *     properties:
 *       status:
 *         type: number
 *       errors:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             param:
 *               type: string
 *             message: 
 *               type: string
 *   response:
 *     type: object
 *     properties:
 *       status:
 *         type: number
 *       data:
 *         $ref: '#/definitions/User'
 *                 
 */

 /**
 * @swagger
 *
 * /users/me:
 *   get:
 *     tags: [users]
 *     description: Get logged user data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-auth-token
 *         description: User's JWT
 *         in:  header
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/token'
 *     responses:
 *       200:
 *         description: User data
 *         schema:
 *           $ref: '#/definitions/response'
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/error'
 */

router.get('/me', auth, async (req, res) => {
	res.status(200).json({
		status: 200,
		data: req.user
	});
});

module.exports = router;