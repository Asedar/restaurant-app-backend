const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/user');

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

router.post('/', async (req, res) => {
	let user = await User.findOne({
		email: req.body.email
	});
	if (user) return res.status(400).json({
		status: 400, 
		errors: [
			{
				param: "email",
				message:'EMAIL_TAKEN'
			}
		]
	});

	user = new User(req.body);
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save((err)=>{
		if(!err) {
			res.status(201).json({
				status: 201, 
				message: "USER_CREATED"
			});
		} else {
			res.status(503).json({
				status: 503, 
				errors: [
					{
						param: "system",
						message:'SYSTEM_ERROR'
					}
				]
			});
		}
	});

});

module.exports = router;