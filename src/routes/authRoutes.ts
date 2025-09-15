const express = require('express');
// const User = require('../models/User')

import { AuthController } from '../controllers/AuthController'

const authRoutes = express.Router();
const authController = new AuthController();

authRoutes.post('/login', authController.login.bind(authController));


export { authRoutes }

