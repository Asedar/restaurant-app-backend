const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {Menu} = require('../models/menu');
const { validateMenuRules, validate } = require('../middleware/validate.js');

router.get('/', async (req, res) => {
    const menu = await Menu.find();
	res.status(200).json({
		status: 200,
		data: menu
	});
});

router.post('/', auth, validateMenuRules(), validate, async (req, res) => {
    const menu = new Menu(req.body);
	await menu.save((err)=>{
		if(!err) {
			res.status(201).json({
				status: 201, 
				message: "MENU_SAVED"
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

router.patch('/:id', auth, async (req, res) => {
	const menu = await Menu.find(req.params.id);
	if (!menu) return res.status(400).json({
		status: 400, 
		errors: [
			{
				param: "menu",
				message:'WRONG_ID'
			}
		]
	});
	else {
		Menu.findByIdAndUpdate(req.params.id, req.body, (err) =>{
			if(!err) {
				res.status(200).json({
					status: 200, 
					message:"MENU_UPDATED"
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
	}
});

router.delete('/:id', auth, async (req, res) => {
	Menu.deleteOne({_id: req.params.id}, (err) =>{
		if(!err) {
			res.status(200).json({
				status: 200, 
				message:"DELETED"
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