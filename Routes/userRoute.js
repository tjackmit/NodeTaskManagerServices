import express from 'express';

import {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  softDeleteUserById,
  HardDeleteUserById,
} from '../Controllers/userControllers.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/user/new/', createUser);
router.get('/user/:userId', getUserById);
router.put('/user/update/:userId', updateUserById);
router.delete('/user/soft/delete/:userId', softDeleteUserById);
router.delete('/user/hard/delete/:userId', HardDeleteUserById);

export default router;
