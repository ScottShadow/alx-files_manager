import express from 'express';
import Appcontroller from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';
import AuthController from '../controllers/AuthController.js';
import redisClient from '../utils/redis.js';
const router = express.Router();

router.get('/status', (req, res) => {
  Appcontroller.getStatus(req, res);
});
router.get('/stats', (req, res) => {
  Appcontroller.getStats(req, res);
})
//my custom debug function
router.get('/getkeys', (req, res) => {
  Appcontroller.getKeys(req, res);
})
router.post('/users', (req, res) => {
  UsersController.postNew(req, res);
})

router.get('/connect', (req, res) => {
  AuthController.getConnect(req, res);
});

router.get('/disconnect', (req, res) => {
  AuthController.getDisconnect(req, res);
});

router.get('/users/me', (req, res) => {
  UsersController.getMe(req, res);
});

export default router
