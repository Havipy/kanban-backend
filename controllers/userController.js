import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import UserModel from '../models/User.js'
import secret from '../config.js'

export const registration = async (req, res) => {
	try {

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const doc = new UserModel({
			email: req.body.email,
			fullName: req.body.fullName,
			avatarUrl: req.body.avatarUrl,
			passwordHash: hash,
		})
		const user = await doc.save();
		const token = jwt.sign({
			_id: user._id,
		}, secret, {
			expiresIn: '30d',
		});
		const { passwordHash, ...userData } = user._doc
		res.json({ ...userData, token })
	}
	catch (e) {
		(e)
		res.status(500).json({
			messege: 'Не удалось зарегестрироваться',
		})
	}
};
export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });
		if (!user) {
			return res.status(404).json({
				messege: 'Неверный логин или пароль'
			})
		}
		const isValidPas = await bcrypt.compare(req.body.password, user._doc.passwordHash);
		if (!isValidPas) {
			return res.status(400).json({
				messege: 'Неверный логин или пароль'

			})
		}
		const token = jwt.sign({
			_id: user._id,

		}, 'secret123', {
			expiresIn: '30d',
		});
		const { passwordHash, ...userData } = user._doc
		res.json({ ...userData, token })
	}
	catch (e) {
		(e)
		res.status(500).json({
			messege: 'Не удалось авторизоваться',
		})
	}
};
export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findOne({ _id: req.userId }).lean()
		if (!user) {
			return res.status(404).json({
				messege: 'Неверный логин или пароль'

			})
		}
		(user)
		const { passwordHash, ...userData } = user;
		res.json({ ...userData })

	}
	catch (e) {
		(e)
	}
};