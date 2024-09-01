import express from 'express';
import Appcontroller from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';
const router = express.Router();

router.get('/status', (req, res) => {
  Appcontroller.getStatus(req, res);
});
router.get('/stats', (req, res) => {
  Appcontroller.getStats(req, res);
})
router.post('/users', (req, res) => {
  UsersController.postNew(req, res);
})
export default router
