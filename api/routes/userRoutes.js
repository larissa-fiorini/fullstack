const express = require('express')
const { getUsers, createUser, deleteUser, getUser, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth')

const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.post('/', authMiddleware, createUser);
router.delete('/:id', authMiddleware, deleteUser);
router.get('/:id', authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);

module.exports = router;